import { Request, Response } from 'express';
import { TDemoSchemaType } from '../../types/schema/demo.schema.types';
import demoService from './service';

const demoController = {
  getDemoPage: async (req: Request, res: Response) => {
    const result = await demoService.getDemoPage((req.body as TDemoSchemaType).fullName);
    res.status(result.statusCode).json(result.data);
  },
  postDemoPage: async (req: Request, res: Response) => {
    const result = await demoService.postDemoPage(req.body as TDemoSchemaType);
    res.status(result.statusCode).json(result.data);
  },
};

export default demoController;
