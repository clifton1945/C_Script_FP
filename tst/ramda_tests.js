/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";
var R = require('ramda');
// from functions.js
const C_It = (txt) => console.log(txt);
// R.isEmpty()
C_It(`R.isEmpty([]))-> ${R.isEmpty([])}`);


//var a= R.add(11); //> Adds first 2 numbers, not n numbers.
//C_Both(`R.add(11)(9)>>${a(9)}`); //  >> 20);
//console.assert(a(9)===20);
