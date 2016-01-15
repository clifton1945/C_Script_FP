"use strict";

const READ_A_Verse = ( key) => {
    C_TraceD();
};
const book = (document.querySelector('.book'));
var BindHandlers = function BindHandlers(book) {
    C_Both('IN  BindHandlers');
    //document.addEventListener("keydown", keysPressed, false);
    document.addEventListener("keyup", keyActions, false);
    function keyActions(e) {
        // read Last Chptr.
        if (e.keyCode == 37) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Chptr");
        }
        // read Last verse.
        if (e.keyCode == 38) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Verse");
            READ_A_Verse(-1);
        }
        // read Next Chptr.
        if (e.keyCode == 39 || e.keyCode == 96) { // rt arrow || numpad 0
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Chptr ");
            //book.read_nxtChptr();
        }
        // read Next verse.
        if (e.keyCode == 32 || e.keyCode == 40) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Verse");
            READ_A_Verse(1);
        }
    }
    C_Both('OUT BindHandlers');
};
