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
import AdminPage from './admin/AdminPage'; // Importez la page d'administration

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
  // Ajoutez une route séparée pour l'administration (sans le NavBar et Footer)
  {
    path: '/admin',
    element: <AdminPage />,
    errorElement: <Error />,
  },
], {
  basename: '/',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);