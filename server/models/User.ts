import mongoose, { Document, Schema } from "mongoose";

// Define the interface for your User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define the schema using the interface
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
