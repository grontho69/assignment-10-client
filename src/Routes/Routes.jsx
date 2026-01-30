import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";




import Login from "../Pages/Login";

import Register from "../Pages/Register";
import AllIssues from "../Pages/AllIssues";
import AddIssues from "../Pages/AddIssues";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
   
    children: [
      {
        index: true,
        element: <Home />,
        
      },
     
      {
        path: '/login',
        element: <Login />,
        
      },
     
      {
        path: '/register',
        element:<Register/>,
      },
      {
        path: '/issues',
        element: <AllIssues />,
        loader:()=> fetch('http://localhost:3000/issues')
      },
      {
        path: '/add-issue',
        element:<AddIssues/>
      }
      

    ]
}
  
]);
