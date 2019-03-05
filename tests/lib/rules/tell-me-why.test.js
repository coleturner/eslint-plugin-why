/**
 * @fileoverview Enforces that eslint disable comments have a reason why
 * @author Cole Turner
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require("../../../src/rules/tell-me-why");
const RuleTester = require("eslint").RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module"
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("boolean-prop-naming", rule, {
  valid: [
    {
      // Has a reason why (line)
      code: `
        // eslint-why some people just like to watch the world burn
        // eslint-disable-next-line semi
        someCodeHere()
    `
    },
    {
      // Has a reason why (block)
      code: `
        /*
            eslint-why
            some people just like to watch the world burn
        */
        // eslint-disable-next-line semi
        someCodeHere()
    `
    },
    {
      // Reason why is two lines away
      code: `
        // eslint-why some people just like to watch the world burn

        // eslint-disable-next-line semi
        someCodeHere()
    `,
      options: [
        {
          maxLinesAway: 3
        }
      ]
    },
    {
      // maxLinesAway configurable
      code: `
    // eslint-why some people just like to watch the world burn




    
    // eslint-disable-next-line semi
    someCodeHere()
    `,
      options: [
        {
          maxLinesAway: 10
        }
      ]
    }
  ],
  invalid: [
    {
      // comment must start with eslint-why
      code: `
      // it has to start with eslint-why
      // eslint-disable-next-line semi
      someCodeHere()
    `,
      options: [
        {
          maxLinesAway: 3
        }
      ],
      errors: [
        {
          message: "Expected an eslint-why comment before eslint-disable"
        }
      ]
    },
    {
      // comment is too far away
      code: `
      // eslint-why cause I said so

      // eslint-disable-next-line semi
      someCodeHere()
    `,
      options: [
        {
          maxLinesAway: 1
        }
      ],
      errors: [
        {
          message:
            "eslint-why comment must be no more than 1 lines before eslint-disable"
        }
      ]
    }
  ]
});
