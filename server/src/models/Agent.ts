import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IAgent {
  email: string;
  name: string;
  photo?: string;
  password: string;
  role: string;
}

interface IAgentDocument extends IAgent, Document {
  comparePassword: (password: string) => boolean;
}
const AgentSchema = new Schema<IAgentDocument>({
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (props: { value: string }): string =>
        `${props.value} is not valid email!`,
    },
  },
  name: {
    type: String,
    maxlength: 50,
    minlength: 3,
    trim: true,
    required: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["agent", "admin"],
    default: "agent",
  },
});

AgentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AgentSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default model("Agent", AgentSchema);
