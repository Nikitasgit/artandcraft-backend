import mongoose from "mongoose";
import Category from "../src/models/Category";
import Supplier from "../src/models/Supplier";
import Material from "../src/models/Material";
import { env } from "../src/config/env";

const { MONGO_URI } = env;

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    await Category.deleteMany({});
    await Supplier.deleteMany({});
    await Material.deleteMany({});

    const categories = await Category.create([
      { name: "armoire" },
      { name: "étagère" },
    ]);

    console.log("Catégories créées:", categories.length);

    const suppliers = await Supplier.create([
      { name: "BBois", email: "contact@bbois.fr", phone: "01 23 45 67 89" },
      { name: "MetaLo", email: "contact@metalo.fr", phone: "01 98 76 54 32" },
      {
        name: "pPlastique",
        email: "contact@pplastique.fr",
        phone: "01 11 22 33 44",
      },
    ]);

    console.log("Fournisseurs créés:", suppliers.length);

    const materials = await Material.create([
      {
        name: "frêne",
        description: "Bois de frêne naturel et durable",
        keywords: ["bois", "naturel", "durable"],
        supplier: suppliers[0]._id,
      },
      {
        name: "chêne",
        description: "Bois de chêne noble et résistant",
        keywords: ["bois", "noble", "résistant"],
        supplier: suppliers[0]._id,
      },
      {
        name: "noyer",
        description: "Bois de noyer précieux et élégant",
        keywords: ["bois", "précieux", "élégant"],
        supplier: suppliers[0]._id,
      },
      {
        name: "acier",
        description: "Acier robuste et dur",
        keywords: ["acier", "robuste", "dur"],
        supplier: suppliers[1]._id,
      },
      {
        name: "inox",
        description: "Acier inoxydable moderne",
        keywords: ["métal", "inoxydable", "moderne"],
        supplier: suppliers[1]._id,
      },
      {
        name: "aluminium",
        description: "Aluminium léger et contemporain",
        keywords: ["métal", "léger", "contemporain"],
        supplier: suppliers[1]._id,
      },
      {
        name: "plastique",
        description: "Plastique ABS résistant et économique",
        keywords: ["plastique", "résistant", "économique"],
        supplier: suppliers[2]._id,
      },
    ]);

    console.log("Matériaux créés:", materials.length);

    console.log("Données ajoutées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout des données:", error);
    console.error("Définissez la variable d'environnement MONGO_URI");
    process.exit(1);
  }
}

seedData();
