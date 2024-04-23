import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Home from './routes/Home/Index.jsx'
import ConfigReceita from './routes/ConfigReceita/Index.jsx'
import Receita from './routes/Receita/index.jsx'
import Erro from './routes/Erro/Index.jsx'
import Login from './routes/Login/Login.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <Erro/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/receita",
    element: <Receita/>
  },
  {
    path: "/configreceita",
    element: <ConfigReceita/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);