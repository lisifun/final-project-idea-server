const { model, Schema } = require("mongoose");

const githubSchema = {
  // pullRequest: { type: Schema.Types.Mixed },
  state: { type: String },
  description: { type: String },
  sentTicketId: { type: String },
};

module.exports = model("Github", githubSchema);
