"use strict";

// CUT: CodeUnderTest ****************************
const query = (tmpl ) => node => node.querySelector(tmpl);
const book = query('.book')(document);
const curChptr_VRGrps = query('.ChptrReadGrps > .cur > .chptr > .VerseReadGrps')(book);
const curVRGrp = query('.cur')(curChptr_VRGrps);
const pstVRGrp = curVRGrp.previousElementSibling;
const futVRGrp = curVRGrp.nextElementSibling;
//************************************************
// RUN
Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(pstVRGrp);
Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(curVRGrp);
Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(futVRGrp);

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

//var direction = 1;
//Trace(update_curEl)(GET_Initial_curEl (), direction);

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
