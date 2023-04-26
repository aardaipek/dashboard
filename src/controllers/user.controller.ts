import { Request, Response, NextFunction } from "express";
import logs from "../config/log";

const NAMESPACE = "User Controller";

const createUser = (req: Request, res: Response, next: NextFunction) => {};

const getUser = (req: Request, res: Response, next: NextFunction) => {};

export default { createUser, getUser };
