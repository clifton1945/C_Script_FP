/**
 * h_SET_All_verse_Styles.js
 * Created by CLIF on 01/15/2016
 */
"use strict";

const Coll2Array = (coll) => [...coll];

/**
 * UPDATES  the global VerseObj FOR this vers elem.
 * @param vO:  the global VerseObj
 * @constructor
 */
const UPDATE_VerseObject = (vO) => (vers) => {
    vO.val = vers[0];
    vO.ndx = vers[1];
    vO.ary = vers[2];
    //C_Trace((o) => o.ndx)(vO);
    return vO
};

const SET_One_Verse_Style = (sO) => (...verse) => {
    let vO = UPDATE_VerseObject (VerseObj) (verse) ;
    // so now HAVE both styleObj && verseObj
    let wt = sO.calcWt(sO, vO);
    //C_Both(`wt:${wt}`);
    //AND FINISH with SET_verse_style_Attribute
    let v_style = vO.val.style;
    v_style.fontSize = `${wt * 100}%`;
    //v_style.textAlign = 'center';
    //C_Both(vO.toStr())
};

const GET_cur_crGrps_Ary = pipeline(
    ( str = '#cur_ChptrReadGrp  .VerseReadGrps > div') => str  // > str
    //,C_Trace((str) => `query str:${str}`)
    ,(str) => document.querySelectorAll(str) // > NodeList w/ 3 divs.
    ,Coll2Array
    //,C_TraceD((ary) => `GET_cur_crGrps_Ary>> ${ary.length} VerseReadGrps`)
);  // fn ()  returns a value, if CALLEDBY ()
//let ___cut = GET_cur_crGrps_Ary; // NOTE: () >> value
//let ___msg = "should look like an array with div.pst...cur...fut";
//let ___srt = ___cut.length === 3 && isArray(___cut);
//console.assert(___srt, ___msg);

/**
 * GET_VerseReadGrpsArr:  use hardcoded query RETURNS current chapter's 3 verseGroups
 *    AS an array.
 *    hard code because I ALWAYS want just the currrent Chapter.
 */
const GET_VerseReadGrpsArr = pipeline(
        ( str = '#cur_ChptrReadGrp  .VerseReadGrps > div') => str  // > str
        //,C_Trace((str) => `query str:${str}`)
        ,(str) => document.querySelectorAll(str) // > NodeList w/ 3 divs.
        ,Coll2Array
        //,C_Trace((ary) => `${ary.length} VerseReadGrps`)
);  // fn ()  returns a value, if CALLEDBY ()
const SET_One_verseGrp_Styles = (styleObj) => (vrGrp) => {
    let sO = styleObj[vrGrp.className];
    //BUILD callback fn: SET_Verse_Style for use in map(fn)(vrGrp.chkldren)
    ___cut = SET_One_Verse_Style(sO);           //REFACT use directly in f_map
    ___data = Coll2Array(vrGrp.children);       //REFACT use directly in f_map
    //C_It(`_this_StyleObj:${sO.name}`);
    //C_It(`_this_VerseReadGrp.len:${___data.length}`);
    f_map( ___cut ) ( ___data   );
};  // CALLEDBY ( global StyleObj)(VerseGrp) >> just the StyleObj data for this VersereadGroup

const SET_All_verse_Styles = (globalStyleObj) =>  (curVerseGrp) => {
    C_TraceD()(globalStyleObj);
    C_Trace((f)=>`fn:${f}`)(curVerseGrp);
    // calls each of 3 VerseReadGrps
    f_map(SET_One_verseGrp_Styles (globalStyleObj))( curVerseGrp);

};
