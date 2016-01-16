"use strict";

// CUT: CodeUnderTest ****************************
//const query = (tmpl ) => node => node.querySelector(tmpl);
//const book = query('.book')(document);
//const curChptr_VRGrps = query('.ChptrVRGrps > .cur > .chptr > .VerseVRGrps')(book);
//const curVRGrp = query('.cur')(curChptr_VRGrps);
//const pstVRGrp = curVRGrp.previousElementSibling;
//const futVRGrp = curVRGrp.nextElementSibling;
//************************************************
const UPDATE_VRGrps = function (curVRGrp, direction) {
    var pstVRGrp = curVRGrp.previousElementSibling;
    var futVRGrp = curVRGrp.nextElementSibling;
    if (direction > 0) {
        if (futVRGrp.childElementCount != 0) {
            curVRGrp.appendChild(futVRGrp.firstElementChild);
            pstVRGrp.appendChild(curVRGrp.firstElementChild);
        }
    } else if (direction < 0) {
        if (pstVRGrp.childElementCount != 0) {
            curVRGrp.insertBefore(pstVRGrp.lastElementChild, curVRGrp.firstElementChild);
            futVRGrp.insertBefore(curVRGrp.lastElementChild, futVRGrp.firstElementChild);
        }
    }
    return curVRGrp;  //NEEDED  it's the updated curVRGrp property
};
// TESTING
//Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(pstVRGrp);
//Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(curVRGrp);
//Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(futVRGrp);
////UPDATE_VRGrps(curVRGrp, 1);
//Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(pstVRGrp);
//Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(curVRGrp);
//Trace((o)=>`o: ${o.firstElementChild.innerHTML}`)(futVRGrp);


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
