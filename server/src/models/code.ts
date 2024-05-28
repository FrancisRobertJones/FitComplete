import { Schema, model, Document } from "mongoose";

interface ICode extends Document {
  userId: string;
  code: string;
}

const CodeSchema = new Schema<ICode>({
  userId: {type: String, required: true},
  code: {type: String, required: true}
});

const Code = model<ICode>("Code", CodeSchema);

export default Code;
export { ICode };
