import mongoose, { Schema, Document } from 'mongoose';

export interface IAuth extends Document {
  email: string;
  password: string;
  date: Date;
}

const AuthSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required:true },
  date:{type: Date, default: new Date()}
});

export default mongoose.model<IAuth>('Auth', AuthSchema);