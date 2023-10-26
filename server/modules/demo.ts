import mongoose from 'mongoose';
import { TDemoSchemaType } from '../types/schema/demo.schema.types';

const { Schema } = mongoose;

const demoSchema = new Schema<TDemoSchemaType>({
  fullName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    validate: function (value: number) {
      return value > 0;
    },
    require: true,
  },
});

const DemoModel = mongoose.model<TDemoSchemaType>('Person', demoSchema, 'Person');

export default DemoModel;
