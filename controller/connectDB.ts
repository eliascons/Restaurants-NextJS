import mongoose from "mongoose";

declare var process: {
  env: {
    MONGODB_URI: string;
  };
};

const connectMongo = async () => {
  const db = await mongoose.connect(process.env.MONGODB_URI);
};

export default connectMongo;
