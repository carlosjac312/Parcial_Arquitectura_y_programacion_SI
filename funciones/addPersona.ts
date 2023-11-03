import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const addPersona = async (req: Request, res: Response) => {
    try {
      const { DNI, nombre_y_apellidos, eMail, codigo_Postal, ISO } = req.body;
      if (!DNI || !nombre_y_apellidos || !eMail || !codigo_Postal || !ISO) {
        res.status(400).send("Faltan datos");
        return;
      }
  
      const alreadyExists = await PersonaModel.findOne({ DNI }).exec();
      if (alreadyExists) {
        res.status(400).send("Ya existe esta persona");
        return;
      }
  
      const newPersona = new PersonaModel({ DNI, nombre_y_apellidos, eMail, codigo_Postal, ISO });
      await newPersona.save();
  
      res.status(200).send({
        DNI: newPersona.DNI,
        nombre_y_apellidos: newPersona.nombre_y_apellidos,
        eMail: newPersona.eMail,
        codigo_Postal: newPersona.codigo_Postal,
        ISO: newPersona.ISO,
        id: newPersona._id.toString(),
      });
    } catch (error) {
      res.status(500).send(error.message);
      return;
    }
  };
  
  export default addPersona;