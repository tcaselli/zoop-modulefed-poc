import { RuleTester } from "eslint";
import { rule } from "./rule1";

// Specify parser
const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("rule1", rule, {
  valid: [
    {
      code: "some_replacement",
    },
  ],
  invalid: [
    {
      code:"document.getElementById('test')",
      errors: [{ message: "Don't use document.getElementById('test')" }],
    },
  ],
});
