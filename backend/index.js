import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import AuthRoute from "./routes/AuthRoute.js"
import UserRoute from "./routes/UserRoute.js"
import LamaranRoute from "./routes/LamaranRoute.js"

import db from "./config/Database.js";

// Membuat session agar ketika server direstart, user tidak perlu melakukan login ulang
import SequelizeStore from "connect-session-sequelize";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// (async () => {
//     await db.sync();
// })();

// mendefinisikan session
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// middleware
app.use(cors({
    // agar frontend dapat mengirim request dan cookie
    credentials: true,

    //domain yang dapat mengakses API
    origin: 'http://localhost:3000' // kita menggunakan frontend berupa reactjs(default port react: 3000)
}));

// agar dapat menerima data dalam format json
app.use(express.json());
app.use(UserRoute);
app.use(LamaranRoute);
app.use(AuthRoute);

// memasukkan session ke table
// store.sync();

// menggunakan port berdasarkan APP_PORT pada env
app.listen(process.env.APP_PORT, () => {
    // yang akan tampil ketika server dijalankan(nodemon index)
    console.log("Server up and running...");
});