import { useState } from "react";
import Layout from "./component/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./component/NotFound/NotFound.jsx";
import Home from "./pages/Home/Home.jsx";
import "./App.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PostDetails from "./pages/PostDetails/PostDetails.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import ProtectedRouting from "./ProtectedRouting/ProtectedRouting.jsx";
import EditProfile from "./pages/EditProfile/EditProfile.jsx";

function App() {
  let Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <ProtectedRouting><Home /></ProtectedRouting> },
        { path: "PostDetails/:id", element: <PostDetails /> },
        { path: "EditProfile", element: <EditProfile /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={Routes} />,
        <Toaster />
      </UserContextProvider>
    </>
  );
}

export default App;
