import { Request, Response } from 'express';
import demoService from './service';

const demoController = {
  getDemoPage: async (req: Request, res: Response) => {
    const result = await demoService.getDemoPage();
    res.status(result.statusCode).json(result.data);
  },
};

export default demoController;
