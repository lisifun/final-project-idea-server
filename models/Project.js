const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    lead: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String },
    members: [String],
    startDate: { type: Date, default: Date.now },
    targetDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);
