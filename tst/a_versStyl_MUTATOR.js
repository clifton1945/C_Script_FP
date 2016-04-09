/**
 * Created by CLIF on 4/9/2016.
 */
'use strict';

var the_versStyl_CONSTANTS = {
    properties:{
        opacity: "1"
        , fontSize: "100%"

    },
    fut: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .95
        , backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    cur: {
        name: 'cur',
        smlWt: 1.0,
        lrgWt: 1.0
        //, backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        name: 'pst'
        , smlWt: 0.4
        , lrgWt: 0.95
        , backgroundColor: "rgba(145, 248, 29, 0.29)"
    }
};

/**
 *              a_versStyl_MUTATOR::
 *      Object.
 * cbfn for each verse div
 *
 */
var a_versStyl_MUTATOR = R.curry(  // just always curry all my functions
    function a_versStyl_MUTATOR(stylCons, elem, ndx, coll) {
        var elem_opacity = {opacity: ".75"};
        var elem_fontSize = {fontSize: "75%"};
        Object.assign(elem.style, elem_fontSize, elem_opacity)
    });

