import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './css/index.css'

// Routes
import Home from "./routes/home";
import MembersList from "./routes/members-list";
import NotFoundPage from './routes/not-found-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/members",
    element: <MembersList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
