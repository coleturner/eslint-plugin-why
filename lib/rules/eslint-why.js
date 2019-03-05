function hasWhyComment(comment, comments) {
  const commentIndex = comments.indexOf(comment);
  const previousComment = comments[commentIndex - 1];

  if (!previousComment) {
    return false;
  }

  if (!previousComment.value.trimStart().startsWith("eslint-why")) {
    return false;
  }

  if (comment.loc.start.line - previousComment.loc.end.line >= 3) {
    return false;
  }

  return true;
}

export default function(context) {
  const sourceCode = context.getSourceCode();

  return {
    Program() {
      const comments = sourceCode.getAllComments();

      for (const comment of comments) {
        if (comment.value.indexOf("eslint-disable") !== -1 && !hasWhyComment(comment, comments)) {
          console.log(comments);
          context.report({
            loc: {
              start: comment.loc.start,
              end: comment.loc.end
            },
            message: "Using eslint-disable requires a preceeding comment (within 3 lines) describing why..."
          });
        }
      }
    }
  };
}
