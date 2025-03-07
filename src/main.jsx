import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Error from './components/Error/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { 
        index: true, 
        element: <Home />
      },
      { 
        path: '/projects', 
        element: <Projects />
      },
      { 
        path: '/services', 
        element: <Services />
      },
      { 
        path: '/about', 
        element: <Error />
      }
    ],
  },
], {
  // Ajout d'options pour améliorer le comportement de navigation
  basename: '/',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);