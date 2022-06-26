import { NextFunction, Request, Response } from "express";

const getBookHandler = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  console.log(req.name);
  // @ts-ignore
  return res.send(req.name);
};

export {getBookHandler}