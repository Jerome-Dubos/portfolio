import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Services from './pages/Services/Services';
import Testimonials from './pages/Testimonials/Testimonials';
import Contact from './pages/Contact/Contact';
import Error from './components/Error/Error';

// Routes de l'application
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
        path: '/about', 
        element: <About />,
        handle: {
          title: 'À propos | Portfolio Développeur Web',
          description: 'Découvrez mon parcours et mes compétences en développement web.'
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
          description: 'Services de développement web, création de sites et optimisation de performance.'
        } 
      },
      { 
        path: '/testimonials', 
        element: <Testimonials />,
        handle: {
          title: 'Témoignages | Portfolio Développeur Web',
          description: 'Découvrez ce que mes clients disent de mon travail et de mon professionnalisme.'
        } 
      },
      { 
        path: '/contact', 
        element: <Contact />,
        handle: {
          title: 'Contact | Portfolio Développeur Web',
          description: 'Contactez-moi pour discuter de votre projet web ou pour toute information.'
        } 
      }
    ],
  },
]);

// Composant pour mettre à jour le titre de la page
const TitleUpdater = () => {
  const defaultTitle = 'Portfolio Développeur Web';
  
  React.useEffect(() => {
    // Mettre à jour les balises meta lors du premier chargement
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