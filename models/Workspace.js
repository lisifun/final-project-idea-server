const { model, Schema } = require("mongoose");

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true },
    workspaceURL: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    members: [
      {
        memberName: { type: String },
        memberEmail: { type: String },
      },
    ],
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true }
);

module.exports = model("Workspace", workspaceSchema);
