import { Schema, model, Document } from "mongoose";

interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  status: string;
  level: number;
}

const VideoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  status: { type: String, required: true },
  level: { type: Number, required: true },
});

const Video = model<IVideo>("Video", VideoSchema);

export default Video;
export { IVideo };
