/**
 * set_verse_styles.js  was h_SET_All_verse_Styles/js
 * Created by CLIF on 01//2016
 */
"use strict";
// ***** GLOBAL FOR THIS file
var TRACE_C_Both = C_Both;
var TRACE_C_GrpStateCnt = C_GrpStateCnt

/**
 * UPDATES  the global VerseObj FOR this vers elem.
 * @param vO:  the global VerseObj
 * @constructor
 */
const UPDATE_VerseObject = (vO) => (vers) => {
    vO.val = vers[0];
    vO.ndx = vers[1];
    vO.ary = vers[2];
    return vO
};

const SET_1_Verse_Style = function SET_1_Verse_Style (stylObj, verse) {
    return -1
    let vO = UPDATE_VerseObject(VerseObj)(verse);
    // stylObj now HAVE both styleObj && verseObj
    let wt = stylObj.calcWt(stylObj, vO);
    //C_Both(`wt:${wt}`);
    //AND FINISH with SET_verse_style_Attribute
    let v_style = vO.val.style;
    v_style.fontSize = `${wt * 100}%`;
    //v_style.textAlign = 'center';
    //C_Both(vO.toStr())
};
const SET_1_VerseGrp_Styles =
    // TODO THE ESSENCE OF THIS fn is the Map just DO THIS in the set_all
    function SET_One_verseGrp_Styles(styleObj, vrGrp) {
        var TRACE_sObj = R.prop('name', styleObj);
        TRACE_C_Both(`    SET_One_VerseGrp_Styles: thisVrsGrp:${TRACE_sObj(vrGrp)}`);
        R.map(SET_1_Verse_Style(styleObj, vrGrp));
    };
const SET_All_Verse_Styles = function SET_All_Verse_Styles(vGrpsNL) {
    var fn = function fn(val, ndx, arr) {
        // children IS one VGrp HTMLCollection of Verses.
        var children = R.prop('children', val); // could have used arr[ndx]
        TRACE_C_Both('thisVGrp HTMLCollection HAS ' + R.prop('length', children) + ' children');
        // styleObj IS the Styles ASSOCIATED WITH this verse Grp children
        var styleObj = TST_StyleObj[ndx]; // now styles of One div.class
        SET_1_VerseGrp_Styles(styleObj, children);
    };
    TRACE_C_GrpStateCnt('SET_All_Verse_Styles', vGrpsNL); // TRACE exp 3 div.class
    R.mapObjIndexed(fn, vGrpsNL);
};
