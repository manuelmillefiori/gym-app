import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './css/index.css';

// Routes
import Home from "./routes/home";
import Members from "./routes/members";
import MemberDetails from "./routes/member-details";
import NewMember from "./routes/new-member";
import EditMember from "./routes/edit-member";
import Courses from "./routes/courses";
import CourseDetails from "./routes/course-details";
import NewCourse from "./routes/new-course";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 Not Found Page</div>,
    children: [
      {
        // Visualize members
        path: "/members",
        element: <Members />,
      },
      {
        // Member details
        path: "/members/:id",
        element: <MemberDetails />,
      },
      {
        // New member
        path: "/members/new",
        element: <NewMember />,
      },
      {
        // Edit member
        path: "/members/:id/edit",
        element: <EditMember />,
      },
      {
        // Visualize courses
        path: "/courses",
        element: <Courses />,
      },
      {
        // Course details
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        // New course
        path: "/courses/new",
        element: <NewCourse />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>,
)
