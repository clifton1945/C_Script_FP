"use strict";

const READ_A_Verse = ( key) => {
    C_Both('in READ_A_Verse.'); // default
    Trace((key)=>`key:${key.toString()} in READ_A_Verse.`)(key); // default
};
const curElem = document.querySelector('#cur_VerseReadGrp'); // exp the first verse in the cur chptr && curVerseGrp
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

const book = (document.querySelector('.book'));
var BindHandlers = function BindHandlers(book) {
    //C_Both('IN  BindHandlers');
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
            //C_Both("read Last Verse");
            READ_A_Verse(-1);
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
            //C_Both("read Next Verse");
            READ_A_Verse(1);
        }
    }
    //C_Both('OUT BindHandlers');
};
