import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utlis/connection.js";
import urlroutes from './Routes/urlRoute.js';
import adminrouter from "./Routes/adminRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));


// Connect DB
connectDB();

// Routes
app.use('/', urlroutes);
app.use('/admin',adminrouter);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


