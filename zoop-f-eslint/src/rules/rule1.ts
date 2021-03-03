import { CallExpression } from "estree";
import { Rule } from "eslint";

export const rule: Rule.RuleModule = {
  create: (context) => {
    // Search for a call expresion dispatch that has a child node that is a CallExpression setCart
    return {
      "CallExpression:has([callee.name='document.getElementById']) > CallExpression:has([callee.name='test'])": (
        node: CallExpression
      ) => {
        context.report({
          message: `Don't use document.getElementById("test") please, your software may explode.`,
          node: node,
        });
      },
    };
  },
};
