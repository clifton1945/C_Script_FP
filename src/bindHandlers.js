"use strict";
//import {TST_StyleObj} from '..//src//modules-compiled';
//************************************************
const UPDATE_ReadGrps = (cur_ReadGrp) => (direction) => {
    // for use in this function
    var curReadGrp = cur_ReadGrp;
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
    //
    //
    //  IS THIS THE BEST PLACE FORTHIS CALL??
    //  PASSING THE
    SET_All_Verse_Styles(StyleObj);
    //
    //NOT SURE NEEDED  it's the updated curReadGrp property
    return curReadGrp;  //NOT SURE NEEDED  it's the updated curReadGrp property
};
var BindHandlers = function BindHandlers(book) {
    // KEY Events ************************

    //document.addEventListener("keydown", keysPressed, false);
    document.addEventListener("keyup", keyActions, false);
    function keyActions(e) {
        //
        // NOTE: Below, these ARE CURRENT ReadGrps  GROUPS:
        // NEEDED because I use it's Siblings in UPDATING all threeGrps
        var curChptr_CRGrps = query(
            '.ChptrReadGrps > .cur')(book);
        var curChptr_VRGrps = query(
            ' .chptr > .VerseReadGrps > .cur')(curChptr_CRGrps);
        //
        //  I need t odecide if hereis where I set
    // read Last Chptr.
        if (e.keyCode == 37) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Chptr");
            UPDATE_ReadGrps(curChptr_CRGrps)(-1)
        }
        // read Last verse.
        if (e.keyCode == 38) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Verse");
            UPDATE_ReadGrps(curChptr_VRGrps)(-1)
        }
        // read Next Chptr.
        if (e.keyCode == 39 || e.keyCode == 96) { // rt arrow || numpad 0
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Chptr ");
            UPDATE_ReadGrps(curChptr_CRGrps)(1)
        }
            // read Next verse.
        if (e.keyCode == 32 || e.keyCode == 40) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Verse");
            UPDATE_ReadGrps(curChptr_VRGrps)(1);
        }
    }
    // click Events **********************
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
    //C_Both('OUT BindHandlers');
};
//const main = function main (bookEl) {
//    //C_Both(`TST_StyleObj${TST_StyleObj.cur}`); // WITHOUT  the import from objects-co.. thid breakd
//};
//main();