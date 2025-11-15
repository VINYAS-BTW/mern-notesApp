import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ContentPage from "./pages/ContentPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    
     <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/create" element={<CreatePage></CreatePage>}></Route>
      <Route path="/login/:id" element={<ContentPage></ContentPage>}></Route>
     
      
    </Routes>
    </>
  );
};

export default App;
