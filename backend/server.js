import express from "express";
import dontenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
 
dontenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // to get the current directory name

app.use(cors({
    origin: 'https://product-store-frontend-h5hh.onrender.com',
    credentials: true, // allows us to accept cookies from the frontend
})); // allows us to accept requests from other domains

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));

    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
});


