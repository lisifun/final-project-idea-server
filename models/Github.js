const { model, Schema } = require("mongoose");

const githubSchema = {
  state: { type: String },
  description: { type: String },
  sentTicketId: { type: String },
};

module.exports = model("Github", githubSchema);
