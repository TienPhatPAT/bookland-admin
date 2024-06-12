/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /\[([A-Z]+)\]\[([A-Z]+)\]\[([A-Z0-9_-]+)\] - ([A-Z])+.*/,
      headerCorrespondence: ["prefix", "type", "ticket"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const VALID_COMMIT_PREFIX = ["FE"];
          const VALID_COMMIT_TYPES = ["FEATURE", "HOTFIX", "BUGFIX", "TASK"];
          const { prefix, type, ticket } = parsed;
          if (!prefix || !type || !ticket)
            return [
              false,
              "Invalid commit message format. It should follow the pattern: [PREFIX][TYPE][TICKET] - Description",
            ];
          if (!VALID_COMMIT_PREFIX.includes(prefix))
            return [false, `Commit prefix should be: ${VALID_COMMIT_PREFIX.join(", ")}`];
          if (!VALID_COMMIT_TYPES.includes(type))
            return [false, `Commit type should be: ${VALID_COMMIT_TYPES.join(", ")}`];
          if (!ticket) return [false, `Commit ticket is required`];
          return [true];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
  },
};
