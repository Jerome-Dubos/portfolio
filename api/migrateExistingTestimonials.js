const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('./models/Testimonial');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

// Témoignages existants à migrer
const existingTestimonials = [
    {
        name: "Alice Dupont",
        position: "CEO - StartUpTech",
        rating: 5,
        text: "Travailler avec ce développeur a été une expérience exceptionnelle. Sa capacité à comprendre nos besoins et à les transformer en solutions techniques élégantes est impressionnante.",
        isApproved: true
    },
    {
        name: "Marc Lefevre",
        position: "Freelance Designer",
        rating: 5,
        text: "J'ai collaboré sur plusieurs projets avec ce développeur, et je suis toujours aussi impressionné par son travail. Sa maîtrise technique et sa créativité font de lui un partenaire idéal.",
        isApproved: true
    },
    {
        name: "Sophie Lambert",
        position: "Fondatrice - ShopOnline",
        rating: 5,
        text: "Notre site e-commerce avait besoin d'une refonte complète, et ce développeur a réussi à transformer notre vision en réalité. Notre taux de conversion a augmenté de 40% !",
        isApproved: true
    }
];

const migrateTestimonials = async () => {
    try {
        // Vérifier si des témoignages existent déjà
        const count = await Testimonial.countDocuments();

        if (count > 0) {
            console.log(`${count} témoignages existent déjà dans la base de données.`);
            console.log('Voulez-vous quand même importer les témoignages existants ? (y/n)');

            // Attendre l'entrée de l'utilisateur
            process.stdin.once('data', async (data) => {
                if (data.toString().trim().toLowerCase() === 'y') {
                    await importTestimonials();
                } else {
                    console.log('Importation annulée.');
                    process.exit();
                }
            });
        } else {
            await importTestimonials();
        }
    } catch (error) {
        console.error(`Erreur: ${error.message}`);
        process.exit(1);
    }
};

const importTestimonials = async () => {
    try {
        // Insérer les témoignages
        const result = await Testimonial.insertMany(existingTestimonials);

        console.log(`${result.length} témoignages ont été importés avec succès.`);
        console.log('Témoignages importés :');
        result.forEach((testimonial, index) => {
            console.log(`${index + 1}. ${testimonial.name} - ${testimonial.position}`);
        });

        process.exit();
    } catch (error) {
        console.error(`Erreur lors de l'importation: ${error.message}`);
        process.exit(1);
    }
};

migrateTestimonials();