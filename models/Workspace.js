const { model, Schema } = require("mongoose");

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true },
    workspaceURL: { type: String, default: "ticketflow.app/" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Workspace", workspaceSchema);
