const rules = require("./rules");

module.exports = {
  rules,
  configs: {
    warning: {
      plugins: ["why"],
      rules: {
        "why/tell-me-why": 1
      }
    },
    error: {
      plugins: ["why"],
      rules: {
        "why/tell-me-why": 2
      }
    },
    all: {
      plugins: ["why"],
      rules
    }
  }
};
