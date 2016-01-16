"use strict";

// CUT: CodeUnderTest ****************************
var READ_curVRGrp = () => query('.cur')(curChptr_VRGrps);

//************************************************
const UPDATE_VRGrps = (book) => (direction) => {
    // for use in SET_ALL_verse_Styles
    var curChptr_VRGrps = query(
        '.ChptrReadGrps > .cur > .chptr > .VerseReadGrps')
    (book);

    // for use in this function
    var curVRGrp = READ_curVRGrp ();
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
    // the curChptr_VRGrps HAVAE BEEN UPDATED SO RESTYLE ALL Verses!!
    //TODO  destructure this !!!!!!!!!!!!!!
    SET_All_verse_Styles (StyleObj)([...curChptr_VRGrps.children]);
    //
    //NOT SURE NEEDED  it's the updated curVRGrp property
    return curVRGrp;  //NOT SURE NEEDED  it's the updated curVRGrp property
};
// TESTING
// **********************  CUT ***********************

var BindHandlers = function BindHandlers(book) {
    C_Both('IN  BindHandlers');
    //document.addEventListener("keydown", keysPressed, false);
    document.addEventListener("keyup", keyActions, false);
    function keyActions(e) {
        // read Last Chptr.
        if (e.keyCode == 37) {
            //e.stopPropagation();
            e.preventDefault();
            //C_Both("read Last Chptr");
        }
        // read Last verse.
        if (e.keyCode == 38) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Verse");
            UPDATE_VRGrps(book)(-1)
        }
        // read Next Chptr.
        if (e.keyCode == 39 || e.keyCode == 96) { // rt arrow || numpad 0
            //e.stopPropagation();
            e.preventDefault();
            //C_Both("read Next Chptr ");
            //book.read_nxtChptr();
        }
        // read Next verse.
        if (e.keyCode == 32 || e.keyCode == 40) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Verse");
            UPDATE_VRGrps(book)(1);
        }
    }
    C_Both('OUT BindHandlers');
};
