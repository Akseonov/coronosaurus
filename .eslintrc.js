module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2020,
	},
	extends: [
		'standard',
	],
	rules: {
		'no-console': 'off',
		indent: 'off',
		'indent-legacy': [
			'error', 'tab', {
				"SwitchCase": 1,
			},
		],
		"no-tabs": 0,
		semi: [ 'error', 'always' ],
		'comma-dangle': [ 'error', 'always-multiline' ],
		'space-before-function-paren': [ 'error', 'never' ],
		'space-in-parens': [ 'error', 'always' ],
		'no-multi-spaces': [
			'error', {
				exceptions: {
					VariableDeclarator: true,
					ImportDeclaration: true,
					ExportNamedDeclaration: true,
				},
			},
		],
		'eol-last': 'off',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
				maxEOF: 1,
				maxBOF: 0,
			},
		],
		curly: [ 'error', 'multi-line' ],
		quotes: 'off',
		'no-trailing-spaces': [
			'error', {
				ignoreComments: true,
				skipBlankLines: true,
			},
		],
		'arrow-parens': [ 'error', 'as-needed' ],
		'template-curly-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'object-curly-spacing': [ 'error', 'always' ],
		'lines-between-class-members': 'off',
		'no-new': 'off',
	},
};
