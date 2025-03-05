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
        element: <Home />,
        handle: {
          title: 'Accueil | Portfolio Développeur Web',
          description: 'Portfolio de développeur web spécialisé en React, Vue et UI/UX Design.'
        }
      },
      { 
        path: '/projects', 
        element: <Projects />,
        handle: {
          title: 'Projets | Portfolio Développeur Web',
          description: 'Découvrez mes projets récents en développement web et interface utilisateur.'
        } 
      },
      { 
        path: '/services', 
        element: <Services />,
        handle: {
          title: 'Services | Portfolio Développeur Web',
          description: 'Découvrez les services proposés en développement web, design UI/UX et optimisation SEO.'
        } 
      },
      { 
        path: '/about', 
        element: <About />,
        handle: {
          title: 'À Propos | Portfolio Développeur Web',
          description: 'Découvrez mon parcours, mes valeurs et contactez-moi pour discuter de vos projets.'
        } 
      }
    ],
  },
]);

const TitleUpdater = () => {
  const defaultTitle = 'Portfolio Développeur Web';
  
  React.useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content', 
      'Développeur Web Frontend spécialisé en React, Vue et UI/UX Design.'
    );
  }, []);

  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TitleUpdater />
    <RouterProvider router={router} />
  </React.StrictMode>
);