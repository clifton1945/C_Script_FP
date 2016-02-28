/**
 * set_verse_styles.js  was h_SET_All_verse_Styles/js
 * Created by CLIF on 01//2016
 */
"use strict";
// ***** GLOBAL FOR THIS file
var TRACE_C_GrpStateCnt = C_GrpStateCnt;

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

// returns after each verse has it's style updated.
//  using
const SET_1_Verse_Style =
    function SET_1_Verse_Style(styleObj, verse) {
        let vO = UPDATE_VerseObject(VerseObj)(verse);
        // styleObj now HAVE both styleObj && verseObj
        let wt = styleObj.calcWt(styleObj, vO);
        //C_Both(`wt:${wt}`);
        //AND FINISH with SET_verse_style_Attribute
        let v_style = vO.val.style;
        v_style.fontSize = `${wt * 100}%`;
        //v_style.textAlign = 'center';
        //C_Both(vO.toStr())
    };
// returns style for all n verse in this Grp.
const SET_1_VerseGrp_Styles =
    function SET_1_verseGrp_Styles(styleObj, vrGrp) {
        let TRACE_sObj = R.prop('name', styleObj);
        TRACE_Both(`    SET_One_VerseGrp_Styles: thisVrsGrp:${TRACE_sObj}`);
        R.map(SET_1_Verse_Style(styleObj, vrGrp));  // returns style for all n verse in this Grp.
    };
// returns all verses with updated styles.
const SET_All_Verse_Styles =
    function SET_All_Verse_Styles(vGrpsNL) {
        var fn = function fn(val, ndx, arr) {
            // children IS one VGrp HTMLCollection of Verses.
            var children = R.prop('children', val); // could have used arr[ndx]
            TRACE_Both('thisVGrp HTMLCollection HAS ' + R.prop('length', children) + ' children');
            // styleObj IS the Styles ASSOCIATED WITH this verse Grp children
            var styleObj = TST_StyleObj[ndx]; // now styles of One div.class
            SET_1_VerseGrp_Styles(styleObj, children);
        };
        TRACE_C_GrpStateCnt('SET_All_Verse_Styles', vGrpsNL); // TRACE exp 3 div.class
        R.mapObjIndexed(fn, vGrpsNL);
    };