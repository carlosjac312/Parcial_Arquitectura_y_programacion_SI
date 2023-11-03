import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const getPersona = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const persona = await PersonaModel.findOne({ DNI }).exec();
    if (!persona) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).send({
        DNI: persona.DNI,
        nombre_y_apellidos: persona.nombre_y_apellidos,
        eMail: persona.eMail,
        codigo_Postal: persona.codigo_Postal,
        ISO: persona.ISO,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPersona;