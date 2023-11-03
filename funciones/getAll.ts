import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const getAll = async (req: Request, res: Response) => {
  try {
    const persona = await PersonaModel.find().exec();
    res.status(200).send(persona);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getAll;