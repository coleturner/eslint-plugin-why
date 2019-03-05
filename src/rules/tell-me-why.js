const commentName = "eslint-why";

function tellMeWhy(context, comments, comment) {
  const config = context.options[0] || {};
  const maxLinesAway = config.maxLinesAway || 3;

  const loc = {
    start: comment.loc.start,
    end: comment.loc.end
  };

  const commentIndex = comments.indexOf(comment);
  const previousComment = comments[commentIndex - 1];

  const commentValueName =
    previousComment &&
    previousComment.value &&
    previousComment.value.replace(/^\s+/, "").substring(0, commentName.length);

  if (!commentValueName || commentValueName !== commentName) {
    return context.report({
      loc,
      message: "Expected an eslint-why comment before eslint-disable..."
    });
  }

  if (loc.start.line - previousComment.loc.end.line > maxLinesAway) {
    return context.report({
      loc,
      message:
        "eslint-why comment must be no more than {{maxLinesAway}} lines before eslint-disable...",
      data: { maxLinesAway }
    });
  }

  return true;
}

module.exports = {
  meta: {
    docs: {
      category: "Stylistic Issues",
      description: "Enforces using an eslint-why comment for disabling rules",
      recommended: true
    },

    schema: [
      {
        additionalProperties: false,
        properties: {
          maxLinesAway: {
            type: "integer",
            minimum: 1
          }
        },
        type: "object"
      }
    ]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program() {
        const comments = sourceCode.getAllComments();
        const config = context.options[0] || {};

        for (const comment of comments) {
          if (comment.value.indexOf("eslint-disable") !== -1) {
            tellMeWhy(context, comments, comment);
          }
        }
      }
    };
  }
};
