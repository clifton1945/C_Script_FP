/**
 * transformers_tests.js
 * for use _RESTYLE_all_trgts()   in simpleTests.js
 * Created by CLIF on 6/4/2016.
 */


/**
 *                  transformers:
 * @type {{fontSize, opacity: *, textAlign: (void|XML|string|*)}}
 *
 * 
 */
// let _stepER, _fontSizER;
let _stepER = R.replace(50);
/**
 *          _fontSizER:: Str->Str->Str
 * @type {void|XML|string|*}
 * NOTE: using a broad regex like - /\d+/im - transforms All fontstyles
 * NOTE: using a specific Str like - 40 - transforms in this case just the clss:cur
 */
// let _fontSizER = R.replace(/\d+/im);//any one or more digits, transformer Fn  S: valu ->
let _fontSizER = R.replace('40');//any one or more digits, transformer Fn  S: valu ->

let transformers = {// NOTE: USING .replace For string!
    stepSize: R.multiply(1.5), //-> 75
    fontSize: _fontSizER(200), // Str -> Str
    opacity: R.multiply(3),
    textAlign: R.replace('right', 'center')// works FOR any rClss WITH initial 'center'
};
//
//
// _EVOLVE_clss_CSD = R.evolve(transformers); //  {k:v} ->{k:v}