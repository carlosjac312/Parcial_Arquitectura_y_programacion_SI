import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const updatePersona = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const { nombre_y_apellidos, eMail, codigo_Postal, ISO } = req.body;
    if (!nombre_y_apellidos || !eMail || !codigo_Postal || !ISO) {
        res.status(400).send("Faltan datos");
        return;
      }

    const updatedPersona = await PersonaModel.findOneAndUpdate(
      { DNI },
      { nombre_y_apellidos, eMail, codigo_Postal, ISO },
      { new: true }
    ).exec();

    if (!updatedPersona) {
      res.status(404).send("Person not found");
      return;
    }

    res.status(200).send({
        nombre_y_apellidos: updatedPersona.nombre_y_apellidos,
        eMail: updatedPersona.eMail,
        codigo_Postal: updatedPersona.codigo_Postal,
        ISO: updatedPersona.ISO,
        id: updatedPersona._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
export default updatePersona;