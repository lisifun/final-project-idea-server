const { model, Schema } = require("mongoose");

const ticketScema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String },
    priority: { type: String },
    label: { type: String },
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
    assignee: { type: String },
    comments: [
      {
        comment: { type: String },
        createdAt: { type: Date },
        createdBy: {
          username: { type: String, required: true },
          photo: { type: String, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketScema);
