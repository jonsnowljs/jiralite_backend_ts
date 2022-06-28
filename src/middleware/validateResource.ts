// Validate the request against the schema if they match

import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      console.log('validating');
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors) ;
    }
  };

export default validateResource;
