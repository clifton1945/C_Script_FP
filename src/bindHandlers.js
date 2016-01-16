"use strict";
/**
 * update_curEl needs to
 *  GET_All_curChptr_verses // = document.querySelectorAll('#cur_ChptrReadGrp .VerseReadGrps .vers');
 *  ,Coll2Ary
 *  ,GET_curChptr_curVerse // const _curEl = document.querySelector('#cur_VerseReadGrp .vers');
 *  ,FIND_ndx_of_curVer_IN_verses
 *  ,SET_curVers_TO_VersesNdx
 * @param curEl
 * @param direction
 * @returns {*}
 */

const  GET_Initial_Verses_NL = () =>  document.querySelectorAll(
    '#cur_ChptrReadGrp .VerseReadGrps .vers'
);
const update_curEl = function (curEl, direction) {
    "use strict";
    var pstEl = curEl.previousElementSibling;
    var futEl = curEl.nextElementSibling;
    if (direction > 0) {
        if (futEl.childElementCount != 0) {
            curEl.appendChild(futEl.firstElementChild);
            pstEl.appendChild(curEl.firstElementChild);
        }
    } else if (direction < 0) {
        if (pstEl.childElementCount != 0) {
            curEl.insertBefore(pstEl.lastElementChild, curEl.firstElementChild);
            futEl.insertBefore(curEl.lastElementChild, futEl.firstElementChild);
        }
    }
    return curEl;  //NEEDED  it's the updated curEl property
};

const READ_A_Verse = ( key) => {
    let k = Trace((k)=>`key:${k.toString()} in READ_A_Verse.`)(key); // default
    const curElem = document.querySelector('#cur_VerseReadGrp div'); // exp the first verse in the cur chptr && curVerseGrp
    Trace((o)=>`obj:${o}`)(curElem.innerHTML);
    //update_curEl(curElem, key);
    //Trace((o)=>`obj:${o}`)(curElem.innerHTML);
};

// TEST ********** update_curEl
var GET_Initial_curEl = pipeline(
    GET_Initial_Verses_NL
    ,(coll) => [...coll]
    ,Trace((a)=>a.length)
    ,(a) => a[1]  // hardcoded currentVerse
);
var direction = 1;
Trace(update_curEl)(GET_Initial_curEl (), direction);

//var BindHandlers = function BindHandlers(book) {
//    //C_Both('IN  BindHandlers');
//    //document.addEventListener("keydown", keysPressed, false);
//    document.addEventListener("keyup", keyActions, false);
//    function keyActions(e) {
//        // read Last Chptr.
//        if (e.keyCode == 37) {
//            //e.stopPropagation();
//            e.preventDefault();
//            //C_Both("read Last Chptr");
//        }
//        // read Last verse.
//        if (e.keyCode == 38) {
//            //e.stopPropagation();
//            e.preventDefault();
//            //C_Both("read Last Verse");
//            READ_A_Verse(-1);
//        }
//        // read Next Chptr.
//        if (e.keyCode == 39 || e.keyCode == 96) { // rt arrow || numpad 0
//            //e.stopPropagation();
//            e.preventDefault();
//            //C_Both("read Next Chptr ");
//            //book.read_nxtChptr();
//        }
//        // read Next verse.
//        if (e.keyCode == 32 || e.keyCode == 40) {
//            //e.stopPropagation();
//            e.preventDefault();
//            //C_Both("read Next Verse");
//            READ_A_Verse(1);
//        }
//    }
//    //C_Both('OUT BindHandlers');
//};
