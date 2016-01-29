/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";

// PASSES the 'requires    YEAH
import * as R from '../node_modules/ramda';
// CAN import TOO !!
import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve
C_It(testStr);

// NOW test interface WITH document
// OPPS  document IS NOT defined
// HOPEFULLY BECAUSE not loaded yet !!
// DOES IT WORK W/O the document reference ??
//var bookDiv = document.querySelector('.book');
//C_It(bookDiv.getElementsByTagName('id'));



//let ready = function ( fn ) {
//
//    // Sanity check
//    if ( typeof fn !== 'function' ) return;
//
//    // If document is already loaded, run method
//    if ( document.readyState === 'complete'  ) {
//        return fn();
//    }
//
//    // Otherwise, wait until document is loaded
//    // The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. The state indicates that the DOMContentLoaded event has been fired.
//    document.addEventListener( 'interactive', fn, false );
//
//    // Alternative: The document and all sub-resources have finished loading. The state indicates that the load event has been fired.
//    // document.addEventListener( 'complete', fn, false );
//};

//ready(function() {
//    console.log('I AM ready!!');
//});
var a= R.add(11); //> 3 Adds first 2 numbers, not n numbers.
C_It(a(9)); //> 20);
console.assert(a(9)===20);

var x = R.prop('x', { id: 'foo', x: 333 }); // returns 333
