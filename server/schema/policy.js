const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
