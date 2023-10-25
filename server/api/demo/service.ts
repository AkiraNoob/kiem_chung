import { EHttpStatus } from '../../common/statusCode';
import { TServiceResponseType } from '../../types/general.types';

const demoService = {
  getDemoPage: async (): Promise<TServiceResponseType<{ data: { data: string } }>> => {
    return {
      data: { data: 'First Requets' },
      statusCode: EHttpStatus.OK,
    };
  },
};

export default demoService;
