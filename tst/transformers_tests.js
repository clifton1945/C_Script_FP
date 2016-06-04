/**
 * transformers_tests.js
 * for use _RESTYLE_all_trgts()   in simpleTests.js
 * Created by CLIF on 6/4/2016.
 */


/**
 *                  transformers:
 * @type {{fontSize, opacity: *, textAlign: (void|XML|string|*)}}
 */
// let _stepER, _fontSizER;
// _stepER = R.replace(50);//TODO clunky, this requires me to know the stepSize: default value NG
// _fontSizER = R.replace('40%');//GIVEN: init==80% transformer Fn  S: valu ->

var transformers = {// NOTE: USING .replace For string!
    stepSize: R.multiply(1.5), //-> 75
    // fontSize: _fontSizER('60%'), // -> 180% GIVEN initCSD == 80%
    opacity: R.multiply(2),
    textAlign: R.replace('right', 'center')// works FOR any rClss WITH initial 'center'
};