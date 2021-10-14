module.exports = {
	root: true,
	extends: [
		'stylelint-config-recommended-scss',
	],
	plugins: [
		'stylelint-scss',
		'stylelint-declaration-block-no-ignored-properties',
	],
	rules: {
		'indentation': 4,
		'declaration-block-no-redundant-longhand-properties': [ true, { ignoreShorthands: [] } ],
		'no-missing-end-of-source-newline': null,
		'media-feature-parentheses-space-inside': null,
		'selector-list-comma-newline-after': 'always-multi-line',
		'rule-empty-line-before': [ 'always', { except: [ 'first-nested', 'after-single-line-comment' ] } ],
		'at-rule-empty-line-before': [
			'always',
			{
				except: [ 'first-nested' ],
				ignore: [ 'after-comment' ],
				ignoreAtRules: [ 'import', 'else', 'include', 'return' ],
			},
		],
		'max-nesting-depth': [
			3, {
				ignore: [ 'blockless-at-rules', 'pseudo-classes' ],
				ignoreAtRules: [ 'include' ],
			},
		],
		'string-quotes': null,
		'plugin/declaration-block-no-ignored-properties': true,
		'no-descending-specificity': null,
	},
};
