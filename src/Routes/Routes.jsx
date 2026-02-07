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
        loader:()=> fetch('https://eco-report-server.vercel.app/recent-issues')
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
        loader:()=> fetch('https://eco-report-server.vercel.app/issues')
      },

      {
        path: 'all-issues',
         element: (
          
           <PrivateRouts>
              <AllIssues/>
           </PrivateRouts>
          
        ),
        loader:()=> fetch('https://eco-report-server.vercel.app/issues')
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
         loader:()=> fetch('https://eco-report-server.vercel.app/issues')
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
