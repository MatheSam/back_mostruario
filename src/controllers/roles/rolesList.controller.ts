import { Request, Response } from "express";
import rolesListService from "../../services/roles/roleList.service";

const rolesListController = (
  req: Request,
  res: Response
): any => {
  try {
    const roles = rolesListService();
    return res.status(200).send(roles);

  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        "error": err.name,
        "message": err.message
      })
    }
  }
}

export default rolesListController;