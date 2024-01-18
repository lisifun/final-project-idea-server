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
      },
    ],
    createdBy: {
      username: { type: String },
      photo: { type: String },
      fullname: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketScema);
