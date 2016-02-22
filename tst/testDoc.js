"use strict";


var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);

// *** TESTS FOR Verse Styles
// start at the end with FP

// *** TESTING just testDoc.html Events
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);