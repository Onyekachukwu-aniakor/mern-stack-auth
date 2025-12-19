import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "https://backend-bj7u.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();

app.use('/api/auth',authRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT,(req,res)=>{
    connectDB();
    console.log(`server running on port ${PORT} `)
});


  