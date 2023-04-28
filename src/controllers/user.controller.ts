import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import db from "../database/database";

const NAMESPACE = "User Controller";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `getUser called`);
  const { mail } = req.body;
  const result = await db.query("select * from users where email = $1", [mail]);

  if (result.rowCount <= 0) {
    return res.status(400).json({
      isSuccess: false,
      result: [],
    });
  }

  return res.status(200).json({
    isSuccess: true,
    message: "Success",
    result: result,
  });
};

export default { createUser, getUser };
