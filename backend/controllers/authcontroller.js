const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { getRedisClient } = require("../config/redis");

// ─── Token helpers ────────────────────────────────────────────────────────────

const signAccessToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
  });

const signRefreshToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d",
  });

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// ─── Register ─────────────────────────────────────────────────────────────────

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Store hashed refresh token in Redis (TTL = 7 days)
    const redis = getRedisClient();
    await redis.setEx(
      `refresh:${user._id}:${hashToken(refreshToken)}`,
      60 * 60 * 24 * 7,
      "valid"
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      user: user.toPublicProfile(),
    });
  } catch (err) {
    next(err);
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    const redis = getRedisClient();
    await redis.setEx(
      `refresh:${user._id}:${hashToken(refreshToken)}`,
      60 * 60 * 24 * 7,
      "valid"
    );

    user.lastSeen = Date.now();
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: user.toPublicProfile(),
    });
  } catch (err) {
    next(err);
  }
};

// ─── Refresh Access Token ─────────────────────────────────────────────────────

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const redis = getRedisClient();
    const key = `refresh:${payload.sub}:${hashToken(token)}`;
    const valid = await redis.get(key);

    if (!valid) {
      // Possible token reuse attack — invalidate all sessions
      await redis.del(`refresh:${payload.sub}:*`);
      return res.status(401).json({ message: "Refresh token reuse detected" });
    }

    // Rotate: delete old, issue new
    await redis.del(key);
    const newRefresh = signRefreshToken(payload.sub);
    await redis.setEx(
      `refresh:${payload.sub}:${hashToken(newRefresh)}`,
      60 * 60 * 24 * 7,
      "valid"
    );

    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: signAccessToken(payload.sub) });
  } catch (err) {
    next(err);
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const payload = jwt.decode(token);
      if (payload?.sub) {
        const redis = getRedisClient();
        await redis.del(`refresh:${payload.sub}:${hashToken(token)}`);
      }
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};