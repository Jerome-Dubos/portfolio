const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Projects');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const initialProjects = [
  {
    title: "Page d'accueil d'une agence de voyage",
    category: "HTML & CSS",
    tags: ["HTML", "CSS", "Responsive"],
    description: "Création d'une page d'accueil pour une agence de voyage avec un design moderne et responsive.",
    image: "/projects/booki.webp",
    demoLink: "https://oc-projet-3.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/OC-projet-3.git",
    featured: false,
    order: 0
  },
  {
    title: "Animations CSS pour site mobile",
    category: "HTML & CSS",
    tags: ["CSS", "Animations", "Mobile"],
    description: "Amélioration de l'interface utilisateur d'un site mobile avec des animations CSS pour une meilleure expérience utilisateur.",
    image: "/projects/ohmyfood.webp",
    demoLink: "https://oc-projet-4.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/OC-Projet-4.git",
    featured: false,
    order: 1
  },
  {
    title: "Premiers pas en JavaScript",
    category: "JavaScript",
    tags: ["JavaScript", "Bases", "DOM"],
    description: "Apprentissage des fondamentaux de JavaScript à travers la création de petites applications interactives.",
    image: "/projects/printit.webp",
    demoLink: "https://oc-projet-5.vercel.app/",
    githubLink: "https://github.com/Jerome-Dubos/OC-projet-5.git",
    featured: false,
    order: 2
  },
  {
    title: "Poké-Quiz",
    category: "JavaScript",
    tags: ["JavaScript", "Bases", "DOM"],
    description: "Apprentissage des fondamentaux de JavaScript à travers la création d'un quiz autour des pokémons.",
    image: "/projects/pokequiz.webp",
    demoLink: "https://poke-quiz-taupe.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/Poke-Quiz.git",
    featured: false,
    order: 3
  },
  {
    title: "Page web dynamique avec JavaScript",
    category: "JavaScript",
    tags: ["JavaScript", "API", "Asynchrone"],
    description: "Développement d'une page web dynamique utilisant JavaScript pour interagir avec une API externe.",
    image: "/projects/sophiebluel.webp",
    demoLink: "https://oc-projet-6-liart.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/OC-Projet-6.git",
    featured: false,
    order: 4
  },
  {
    title: "Application web de location immobilière",
    category: "React",
    tags: ["React", "API", "Responsive"],
    description: "Création d'une application de recherche et de visualisation de biens immobiliers avec React et une API REST.",
    image: "/projects/kasa.webp",
    demoLink: "https://kasa-lyart-three.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/kasa.git",
    featured: true,
    order: 5
  },
  {
    title: "Optimisation SEO d'un site de photographe",
    category: "SEO & Performances",
    tags: ["SEO", "Performance", "Accessibilité"],
    description: "Optimisation du référencement et des performances d'un site vitrine pour un photographe professionnel.",
    image: "/projects/carducci.webp",
    demoLink: "https://oc-projet-8.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/OC-Projet-8.git",
    featured: false,
    order: 6
  },
  {
    title: "Création d'une carte de saint-valentin",
    category: "React",
    tags: ["React", "Création"],
    description: "Création d'une carte de saint-valentin en react pour une surprise originale",
    image: "/projects/valentine.webp",
    demoLink: "https://saint-valentin-card.vercel.app",
    githubLink: "https://github.com/Jerome-Dubos/saint-valentin-card.git",
    featured: false,
    order: 7
  },
  {
    title: "Chez les doudous",
    category: "React",
    tags: ["React", "Refonte", "Vitrine"],
    description: "Refonte du site vitrine d'un traiteur local, Chez les Doudous.",
    image: "/projects/doudous.webp",
    demoLink: "https://chez-les-doudous-henna.vercel.app",
    githubLink: "",
    featured: true,
    order: 8
  }
];

const importProjects = async () => {
  try {
    const projectsCount = await Project.countDocuments();
    
    if (projectsCount > 0) {
      console.log(`Il y a déjà ${projectsCount} projets dans la base de données.`);
      console.log('Voulez-vous quand même importer les projets initiaux ? (y/n)');
      
      process.stdin.once('data', async (data) => {
        const answer = data.toString().trim().toLowerCase();
        
        if (answer === 'y') {
          await processImport();
        } else {
          console.log('Importation annulée.');
          process.exit(0);
        }
      });
    } else {
      await processImport();
    }
  } catch (error) {
    console.error('Erreur lors de l\'importation des projets:', error);
    process.exit(1);
  }
};

const processImport = async () => {
  try {
    await Project.deleteMany({});
    console.log('Projets existants supprimés.');
    
    const insertedProjects = await Project.insertMany(initialProjects);
    
    console.log(`${insertedProjects.length} projets ont été importés avec succès:`);
    insertedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} (${project.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'importation des projets:', error);
    process.exit(1);
  }
};

importProjects();