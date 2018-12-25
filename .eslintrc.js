let allowedMagicNumbers = [
	// common small numbers
	...[-2, -1, 0, 1, 2],
	// percentage
	100,
	// second, minutes, miliseconds
	...[60, 1000],
	// months
	12,
	// number base
	10,
	// the answer to life, the universe and everything
	42,
	// bytes related magic numbers
	...[32, 64, 128, 256, 512, 1024, 2048],
	// some http status codes we use
	...[200, 300, 302, 400, 403, 404, 409, 413, 500, 501, 502, 503]
];

module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"node": true,
		"commonjs": true,
		"es6": true,
		"jasmine": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"globals": {
		// global variable generated dynamically at build time
		"optymyzeEnvironment": true,
		// maplarge related global variables
		"ml": true,
		"L": true,
		// mobile hybrid, cordova
		"cordova": true,
		"device": true
	},
	"rules": {
		"array-bracket-spacing": ["error", "never"],
		"arrow-spacing": ["error", {"before": true, "after": true}],
		"block-scoped-var": ["warn"],
		"block-spacing": ["error", "always"],
		"brace-style": ["error", "1tbs", {"allowSingleLine": true}],
		"camelcase": ["error", {"properties": "always"}],
		"comma-spacing": ["error", {"before": false, "after": true}],
		"comma-style": ["error", "last"],
		"computed-property-spacing": ["error", "never"],
		"curly": ["error", "multi-line"],
		"dot-location": ["error", "property"],
		"eqeqeq": ["error"],
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"jsx-quotes": ["error", "prefer-double"],
		"key-spacing": ["error", {"beforeColon": false, "afterColon": true}],
		"keyword-spacing": ["error", {"before": true, "after": true, "overrides": {
			"catch": {"after": false},
			"if": {"after": false},
			"for": {"after": false},
			"function": {"after": false},
			"get": {"after": false},
			"set": {"after": false},
			"super": {"after": false},
			"switch": {"after": false},
			"while": {"after": false}
		}}],
		"linebreak-style": ["off", "unix"],
		"max-len": ["warn", {"code": 150, "tabWidth": 1, "ignoreUrls": true, "ignoreRegExpLiterals": true, "ignoreStrings": true, "ignoreTemplateLiterals": true, "ignoreComments": true}],
		"quotes": ["error", "single", "avoid-escape"],
		"no-caller": ["error"],
		"no-console": ["off"],
		"no-control-regex": ["off"],
		"no-empty-pattern": ["error"],
		"no-extra-bind": ["error"],
		"no-lone-blocks": ["error"],
		"no-lonely-if": ["warn"],
		"no-magic-numbers": ["warn", {"ignoreArrayIndexes": true, "ignore": allowedMagicNumbers}],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"no-multi-str": ["error"],
		"no-param-reassign": ["warn"],
		"no-return-assign": ["off"],
		"no-self-assign": ["error"],
		"no-self-compare": ["error"],
		"no-spaced-func": ["error"],
		"no-trailing-spaces": ["warn"],
		"no-unneeded-ternary": ["error"],
		"no-unused-vars": ["error", {"ignoreRestSiblings": true}],
		"no-useless-call": ["error"],
		"no-useless-concat": ["error"],
		"no-var": ["warn"],
		"no-whitespace-before-property": ["error"],
		"no-with": ["warn"],
		"object-curly-spacing": ["error", "never"],
		"object-shorthand": ["warn", "properties"],
		"prefer-rest-params": ["error"],
		"prefer-template": ["warn"],
		"react/display-name": ["off"],
		"react/jsx-curly-spacing": ["error", {"when": "never", "children": true}],
		"react/jsx-equals-spacing": ["error", "never"],
		"react/jsx-pascal-case": ["error", {"allowAllCaps": true}],
		"react/jsx-tag-spacing": ["error", {
			"closingSlash": "never",
			"beforeSelfClosing": "always",
			"afterOpening": "never",
			"beforeClosing": "never"
		}],
		"react/jsx-wrap-multilines": ["error", {
			"declaration": "parens-new-line",
			"assignment": "parens-new-line",
			"return": "parens-new-line",
			"arrow": "parens-new-line",
			"condition": "ignore",
			"logical": "ignore",
			"prop": "ignore"
		}],
		"react/no-direct-mutation-state": ["warn"],
		"react/no-multi-comp": ["warn", {"ignoreStateless": true}],
		"react/no-redundant-should-component-update": ["error"],
		"react/no-render-return-value": ["warn"],
		"react/no-unescaped-entities": ["off"],
		"react/no-unused-state": ["error"],
		"react/prop-types": ["off"],
		"react/sort-comp": ["warn"],
		"react/style-prop-object": ["error"],
		"react/void-dom-elements-no-children": ["error"],
		"semi": ["error", "always"],
		"semi-spacing": ["error", {"before": false, "after": true}],
		"space-before-blocks": ["error", "always"],
		"space-before-function-paren": ["error", "never"],
		"space-in-parens": ["error", "never"],
		"space-infix-ops": ["error"],
		"space-unary-ops": ["warn", { "words": true, "nonwords": false }],
		"template-curly-spacing": ["error", "never"],
		"valid-jsdoc": ["warn", {"requireParamDescription": false, "requireReturn": false, "requireReturnDescription": false}],
		"valid-typeof": ["warn"]
	},
	"overrides": [
		{
			"files": ["**/backend/**", "**/*-demo.js"],
			"rules": {
				"no-magic-numbers": "off"
			}
		},
		{
			"files": ["**/*_test.js"],
			"rules": {
				"no-magic-numbers": "off"
			}
		}
	]
};