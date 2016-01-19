"use strict";

// CUT: CodeUnderTest ****************************
var READ_cur_RGrp = () => query('.cur')(curChptr_VRGrps);

//************************************************
const UPDATE_VRGrps = (cur_ReadGrp) => (direction) => {
    // for use in SET_ALL_verse_Styles
    //var curChptr_VRGrps = query(
    //    '.ChptrReadGrps > .cur > .chptr > .VerseReadGrps')
    //(book);

    // for use in this function
    var curReadGrp = READ_cur_RGrp();
    var pstVRGrp = curReadGrp.previousElementSibling;
    var futVRGrp = curReadGrp.nextElementSibling;
    if (direction > 0) {
        if (futVRGrp.childElementCount != 0) {
            curReadGrp.appendChild(futVRGrp.firstElementChild);
            pstVRGrp.appendChild(curReadGrp.firstElementChild);
        }
    } else if (direction < 0) {
        if (pstVRGrp.childElementCount != 0) {
            curReadGrp.insertBefore(pstVRGrp.lastElementChild, curReadGrp.firstElementChild);
            futVRGrp.insertBefore(curReadGrp.lastElementChild, futVRGrp.firstElementChild);
        }
    }
    // the curChptr_VRGrps HAVAE BEEN UPDATED SO RESTYLE ALL Verses!!
    //TODO  destructure this !!!!!!!!!!!!!!
    SET_All_verse_Styles(StyleObj)([...curChptr_VRGrps.children]);
    //
    //NOT SURE NEEDED  it's the updated curReadGrp property
    return curReadGrp;  //NOT SURE NEEDED  it's the updated curReadGrp property
};
// TESTING
// **********************  CUT ***********************

var BindHandlers = function BindHandlers(book) {
    //C_Both('IN  BindHandlers');


    //document.addEventListener("keydown", keysPressed, false);
    document.addEventListener("keyup", keyActions, false);
    function keyActions(e) {
        var curChptr_CRGrps = query(
            '.ChptrReadGrps')(book);
        var curChptr_VRGrps = query(
            '.cur > .chptr > .VerseReadGrps')
        (curChptr_CRGrps);
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
            UPDATE_VRGrps(curChptr_VRGrps)(-1)
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
            UPDATE_VRGrps(curChptr_VRGrps)(1);
        }
    }
    // click event

    //timer = setInterval(getSelectedRange, 150);
    //});
    //var timer = null;
    var selectedRange = null;
    var getSelectedRange = function () {
        try {
            if (window.getSelection) {
                selectedRange = window.getSelection().getRangeAt(0);
            } else {
                selectedRange = document.getSelection().getRangeAt(0);
            }
        } catch (err) {
        }
        console.log('selectedRange:' + selectedRange.toString()); // TODO remove console.log
    };
    // add event listener to table
    let b = document.querySelector('.book');
    b.addEventListener("click",
        () => {
            getSelectedRange();
            let el = document.querySelector('#result');
            el.textContent= selectedRange.toString();
            console.log(`textContent:${el.textContent}`);
        },false
    );
    C_Both('OUT BindHandlers');
};
