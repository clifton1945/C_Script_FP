"use strict";
//var R = require('ramda-maybe');
//import { testStr } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 *      ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tstCode(true);
}
/**
 *          GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js
var MSG = '';
/**
 *          testCode::
 * @param tst
 */
var tstCode = function (tst = false) {
    /**
     *          TESTING Functions
     * _qSelectAll :: String -> Node -> NodeList
     * Note: NodeList is array-like so you can run ramda list functions on it.
     */
    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
    var _a_clasNL = function _clasNL(divClasStr) {
        return _qSelectAll(divClasStr)(document)
    };

    var align = JSON.parse(`{"textAlign":"center"}`);
    var _fontSize = (ndx)=>_a_styl_frmtOBJ("fontSize");
    var _opacity = (ndx)=> _a_styl_frmtOBJ("opacity"); // curried> can take arg either way.

    //var _WEIGHT_aStyl = R.curry((ndx, _aStyl) => _aStyl(ndx));
    //var _WEIGHT_someStyles = (ndx, lst) => R.map(_WEIGHT_aStyl(ndx), lst);
    //var weightedStylesLST = [_fontSize, _opacity];
    //var weightedStyles = _WEIGHT_someStyles(weightedStylesLST);

    var unweightedStyles = [align];
    var stylesLST = R.mergeAll(unweightedStyles, []);

    /**
     *           CODE UNDER TEST
     * @type {string}
     */
    var _MUTATE_aClas = R.curry(function MUTATE_anElem(stylesLST, elem, ndx, coll) {
            // once inside this function, use ndx to WEIGHT some styles
            //_WEIGHT_someStyles(weightedStylesLST);
            // STYLE each Verse
            _setStyle(stylesLST, elem);
            MSG += `..(i[${ndx}] ${elem.style.fontSize}, ${elem.style.opacity})`;
        }
    );


    if (tst) {
        MSG = 'MUTATE_aVersStyle > ';
        /**
         *              the MAIN .map(callBackFunc:: MUTATE_anElem(stylObj)->(elem, ndx, coll)-> MUTATED elem.style.
         * @param styl_obj
         * @returns {Function}
         */
        var _y = (elem,ndx,coll) =>  { MSG += `..(i[${ndx}] ${elem.style.fontSize}, ${elem.style.opacity})`};

        const a_stylOBJ = (name, valu)=>{JSON.parse(`"${name}:"${valu}"`)};

        var STYL_aClas = (cBF, arr) => R_forEachIndexed(cBF, arr);
        var _STYL_aClas = R.curry(STYL_aClas);

        var tstNL = _a_clasNL(fut_queryStr);
        _STYL_aClas(_y)(tstNL);

        C_Both(MSG);
        var noop = '';
    }
};
main();

