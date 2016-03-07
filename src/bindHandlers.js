"use strict";

var BindHandlers = function BindHandlers(book)
{
    // KEY Events ************************

    //document.addEventListener("keydown", keysPressed, false);
    document.addEventListener("keyup", keyActions, false);
    function keyActions(e) {
        var V_Grp_NL;
        // read Last Chapter
        if (e.keyCode == 37) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Chptr");
            READ_Last(C_Grp_NL);
        }
        // read Last verse.
        if (e.keyCode == 38) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Last Verse");
            V_Grp_NL = GET_V_Grp_NL(book);
            READ_Last(V_Grp_NL);
        }
        // read Next Chptr.
        if (e.keyCode == 39 || e.keyCode == 96) { // rt arrow || numpad 0
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Chptr ");
            READ_Next(C_Grp_NL);
        }
            // read Next verse.
        if (e.keyCode == 32 || e.keyCode == 40) {
            //e.stopPropagation();
            e.preventDefault();
            C_Both("read Next Verse");
            V_Grp_NL = GET_V_Grp_NL(book);
            READ_Next(V_Grp_NL);
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
        //console.log('selectedRange:' + selectedRange.toString()); // TODO remove console.log
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
};