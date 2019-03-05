const rules = require("./rules");

module.exports = {
  rules,
  configs: {
    recommended: {
      plugins: ["why"],
      rules: {
        "why/tell-me-why": 1
      }
    },
    all: {
      plugins: ["why"],
      rules
    }
  }
};
