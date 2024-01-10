const { model, Schema } = require("mongoose");

const ticketScema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String },
    priority: { type: String },
    members: [String],
    label: { type: String },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    deadline: { type: Date },
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketScema);
