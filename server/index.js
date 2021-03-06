import express from "express";
import dbConfig from "./config/db";
import middlewareConfig from "./config/middleware";
import { SongRoutes, ArtistRoutes, UserRoutes } from "./modules";

const app = express();

// Database
dbConfig();

// Middleware
middlewareConfig(app);

app.use("/api", [SongRoutes, ArtistRoutes, UserRoutes]);

const PORT = process.env.PORT || 4000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening on port: ${PORT} boss`);
  }
});
