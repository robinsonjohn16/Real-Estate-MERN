import { config } from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

config({ path: "./.env" });

connectDB()
   .then(() => {
      app.on("error", (error) => {
         console.log("Error", error);
         throw error;
      });
      app.listen(process.env.PORT || 80);
      console.log(`http://localhost:${process.env.PORT}`);
   })
   .catch((err) => console.log("DataBase Connected Issue!", err));
