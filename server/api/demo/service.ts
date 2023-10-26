import { Error } from 'mongoose';
import { EHttpStatus } from '../../common/statusCode';
import AppError from '../../constant/error';
import DemoModel from '../../modules/demo';
import { TServiceResponseType } from '../../types/general.types';
import { TDemoSchemaType } from '../../types/schema/demo.schema.types';

const demoService = {
  getDemoPage: async (fullName: TDemoSchemaType['fullName']): Promise<TServiceResponseType<TDemoSchemaType[]>> => {
    try {
      const result = await DemoModel.find({ fullName });
      return {
        data: result.map((item) => ({ fullName: item.fullName, age: item.age })),
        statusCode: EHttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof Error) throw new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, error.message);
      return {
        data: [],
        statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  },
  postDemoPage: async (reqBody: TDemoSchemaType): Promise<TServiceResponseType> => {
    try {
      await DemoModel.create(reqBody);
      return {
        data: null,
        statusCode: EHttpStatus.OK,
      };
    } catch (error) {
      return {
        data: null,
        statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  },
};

export default demoService;
