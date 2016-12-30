const postcss = require( 'postcss' );

module.exports = postcss.plugin( 'postcss-pseudo-element-cases', ( options ) => {

  options = options || {};

  const
    selectors = options.selectors || [
      'before',
      'after',
      'first-line',
      'first-letter',
      'selection',
      'spelling-error',
      'grammar-error',
      'backdrop',
      'marker',
      'placeholder',
      'shadow',
      'slotted',
      'content'
    ],
    caseOption = options['case'] || 'lower',
    replacements = new RegExp( '(?:|:):(' + selectors.join('|') + ')', 'gi' );

  return ( css ) => {
    css.walkRules( ( rule ) => {
      rule.selector = rule.selector.replace( replacements, ( match ) => {
        return caseOption === 'upper' ? match.toUpperCase() : match.toLowerCase();
      });
    });
  }
});
