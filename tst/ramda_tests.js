/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";
// 160130  1TAT WILL USE Ramda ON existing Code to LEARN it.
//     will work in html: <script src="../node_modules/ramda/dist/ramda.min.js"></script>
//
// WILL WORK W/ HTML WITHOUT import , DECIDED NOT TO USE ALTERNATIVE  test.js WITH/ import. CAN NOT COMBINE
// PASSES the 'requires    YEAH
//import * as R from '../node_modules/ramda';
// CAN import TOO !!
//import { testStr, C_It } from '..//src//modules-compiled.js'; // WORKS but throws Inspection 'can't resolve
//C_It(testStr);
// NOW test interface WITH document
// OPPS  document IS NOT defined
// HOPEFULLY BECAUSE not loaded yet !!
// DOES IT WORK W/O the document reference ??
//var bookDiv = document.querySelector('.book');
//C_It(bookDiv.getElementsByTagName('id'));


var a= R.add(11); //> Adds first 2 numbers, not n numbers.
console.log(`R.add(11)(9)>>${a(9)}`); //> 20);
console.assert(a(9)===20);

//var x = R.prop('x', { id: 'foo', x: 333 }); // returns 333
