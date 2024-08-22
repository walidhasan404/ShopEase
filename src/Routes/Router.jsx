import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Profile from "../Components/Profile/Profile";

const Router = createBrowserRouter ([
        {
          path: "/",
          element: <Main/>,
          children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            },
          ]
        },
      ]);

export default Router;