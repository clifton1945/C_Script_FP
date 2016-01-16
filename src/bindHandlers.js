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
const update_curReadGrp = function (curReadGrp, direction) {
    "use strict";
    var pstReadGrp = curReadGrp.previousReadGrpementSibling;
    var futReadGrp = curReadGrp.nextReadGrpementSibling;
    if (direction > 0) {
        if (futReadGrp.childReadGrpementCount != 0) {
            curReadGrp.appendChild(futReadGrp.firstReadGrpementChild);
            pstReadGrp.appendChild(curReadGrp.firstReadGrpementChild);
        }
    } else if (direction < 0) {
        if (pstReadGrp.childReadGrpementCount != 0) {
            curReadGrp.insertBefore(pstReadGrp.lastReadGrpementChild, curReadGrp.firstReadGrpementChild);
            futReadGrp.insertBefore(curReadGrp.lastReadGrpementChild, futReadGrp.firstReadGrpementChild);
        }
    }
    return curReadGrp;  //NEEDED  it's the updated curReadGrp property
};
// **********************  CUT ***********************
const query = (tmpl ) => node => node.querySelector(tmpl);
const GET_book = query('.book')(document);
const GET_curChapter = query('.ChptrReadGrps > .cur')(GET_book());



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
