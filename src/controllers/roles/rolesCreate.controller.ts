import { Request, Response } from "express";
import rolesCreateService from "../../services/roles/rolesCreate.service";

const rolesCreateController = (
  req: Request,
  res: Response
): any => {
  try {
    const {name} = req.body;
    const role = rolesCreateService({name});

    return res.status(201).send(role);
    
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        "message": err.message
      })
    }
  }
}

export default rolesCreateController