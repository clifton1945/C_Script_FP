/**
 * Created by CLIF on 4/9/2016.
 */
'use strict';

/**
 *              a_versStyl_MUTATOR::
 *      Object.
 * cbfn for each verse div
 *
 */
var a_versStyl_MUTATOR = R.curry(  // just always curry all my functions
    function a_versStyl_MUTATOR(elem, ndx, coll) {
        var elem_opacity = {opacity: ".5"};
        var elem_fontSize = {fontSize: "50%"};
        Object.assign(elem.style, elem_fontSize)
    });

