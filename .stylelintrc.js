module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
    "stylelint-config-recess-order"
  ],
  plugins: [
    'stylelint-scss',
    "stylelint-prettier"
  ],
  rules: {
    "prettier/prettier": [
      true,
      {
        "printWidth": 100,
        "tabWidth": 2,
        "useTabs": false,
        "singleQuote": false,
        "trailingComma": "all",
        "bracketSpacing": false
      }
    ],
    "rule-empty-line-before": [
      "always",
      {
        "except": [
          "after-single-line-comment",
          "first-nested"
        ],
        "ignore": [
          "after-comment",
          "first-nested"
        ]
      }
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        "except": [
           "first-nested",
           "blockless-after-blockless"
         ],
         "ignore": [
           "after-comment"
         ],
         "ignoreAtRules": [
           "else"
         ]
      }
    ],
    "value-keyword-case": null,
    "color-hex-case": "lower",
    "number-leading-zero": null,
    "value-no-vendor-prefix": null,
    "property-no-vendor-prefix": null,
    "declaration-block-no-shorthand-property-overrides": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "block-no-empty": null,
    "at-rule-blacklist": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/selector-no-union-class-name": true,
  },
}