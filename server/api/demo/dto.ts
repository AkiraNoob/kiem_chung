import { ObjectSchema, number, object, string } from 'yup';
import { TDemoSchemaType } from '../../types/schema/demo.schema.types';

const createDemoDTO: ObjectSchema<TDemoSchemaType> = object({
  fullName: string().required(),
  age: number().min(0).required(),
});

export { createDemoDTO };
