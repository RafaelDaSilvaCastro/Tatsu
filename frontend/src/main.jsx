import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Private from './routes/Private/Private.jsx';
import Home from './routes/Home/Index.jsx'
import ConfigReceita from './routes/ConfigReceita/ConfigReceita.jsx'
import Recipe from './routes/Receita/Recipe.jsx'
import Erro from './routes/Erro/Index.jsx'
import Login from './routes/Login/Login.jsx';
import Register from './routes/Register/Register.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Erro />,
  },
  {
    path: "/Register",
    element: <Register />,
    errorElement: <Erro />,
  },  
  {
    path: "/Home",
    element: <Private > <Home /> </Private>,
  },
  {
    path: "/receita",
    element: <Private><Recipe /></Private>
  },
  {
    path: "/configreceita",
    element: <Private><ConfigReceita /></Private>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);