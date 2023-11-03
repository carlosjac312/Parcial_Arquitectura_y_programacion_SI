import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addPersona from "./funciones/addPersona.ts";
import getPersona from "./funciones/getPersona.ts";
import getAll from "./funciones/getAll.ts";
import updatePersona from "./funciones/updatePersona.ts";
import deletePersona from "./funciones/deletePersona.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/api/contactos", getAll)
  .get("/api/contactos/:DNI", getPersona)
  .post("/api/contactos", addPersona)
  .put("/api/contactos/:DNI", updatePersona)
  .delete("/api/contactos/:DNI", deletePersona)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
