import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";




import Login from "../Pages/Login";

import Register from "../Pages/Register";
import AllIssues from "../Pages/AllIssues";
import AddIssues from "../Pages/AddIssues";
import IssueDetails from "../Pages/IssueDetails";
import MyIssues from "../Pages/MyIssues";
import MyContribution from "../Pages/MyContribution";
import PrivateRouts from "../Private/PrivateRouts";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
   
    children: [
      {
        index: true,
        element: <Home />,
        loader:()=> fetch('http://localhost:3000/recent-issues')
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
        path: 'all-issues',
         element: (
          
           <PrivateRouts>
              <AllIssues/>
           </PrivateRouts>
          
        ),
        loader:()=> fetch('http://localhost:3000/issues')
      },
      {
        path: '/add-issue',
        element: (
          <PrivateRouts>
            <AddIssues/>
          </PrivateRouts>
        ),
      },
      {
        path: '/issue-details/:id',
        element: (
          <PrivateRouts>
            <IssueDetails/>
          </PrivateRouts>
        ),
       
  },
      {
        path: '/my-issues',
         element: (
          <PrivateRouts>
            <MyIssues/>
          </PrivateRouts>
        ),
         loader:()=> fetch('http://localhost:3000/issues')
      },
      {
        path: '/my-contribution',
         element: (
          <PrivateRouts>
            <MyContribution/>
          </PrivateRouts>
        ),
      }
      
      

    ]
}
  
]);
