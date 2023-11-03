import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const deletePersona = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;//pide el dato
    const persona = await PersonaModel.findOneAndDelete({ DNI }).exec();
    if (!persona) {
      res.status(404).send("No se encontro la persona");
      return;
    }
    res.status(200).send("Persona borrada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePersona;