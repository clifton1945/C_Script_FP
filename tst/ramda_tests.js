/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";

var a= R.add(11); //> Adds first 2 numbers, not n numbers.
C_Both(`R.add(11)(9)>>${a(9)}`); //  >> 20);
console.assert(a(9)===20);

