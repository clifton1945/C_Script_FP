/**
 * Created by CLIF on 4/11/2016.
 */
var _ = require('ramda');
var accounting = require('accounting');

// Example Data
var CARS = [{
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true,
}, {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
}, {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
}, {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false,
}, {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
}, {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
}];

var c_it = function (x) {
    return console.log(x)
};
var trace = _.curry(function (tag, x) {
    console.log(tag, x);
    return x;
});

var toUpperCase = function (x) {
    return x.toUpperCase();
};
var exclaim = function (x) {
    return x + '!';
};
var shout = _.compose(exclaim, toUpperCase);

c_it(shout("send in the clowns"));
// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
var isLastInStock = _.compose(_.prop('in_stock'), _.last);
c_it('#1 ' + isLastInStock(CARS));
// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
var nameOfFirstCar = _.compose(_.prop("name"), _.head);
c_it('#2 ' + nameOfFirstCar(CARS));
// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
var _average = function (xs) {
    return _.reduce(_.add, 0, xs) / xs.length;
}; // <- leave be
//var averageDollarValue = function(cars) {
//    var dollar_values = _.map(function(c) {
//    return c.dollar_value;
//}, cars);
//return _average(dollar_values);

var dollar_values = _.map(_.prop('dollar_value'));
var averageDollarValue = _.compose(
    _average,
    //trace('after dollar_values'),
    dollar_values);
c_it('#3 ' + averageDollarValue(CARS));

/**
 *              Exercise 4:
 *              ============
 *Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names: e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].
 */
var _name = _.prop('name');
var _lowerCase = _.toLower;
var _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
var sanitizeNames = _.map(_.compose(
        _underscore, _lowerCase, _name
    )
); // map(_compose( _underscore, _toLower, _name))
c_it('#4 ' + sanitizeNames(CARS));

/**
 *              Bonus 1:
 * ============
 * Refactor availablePrices with compose.
 * @param cars
 * @returns {string}
 */
var availablePrices = function (cars) {
    var availablePrices = function (cars) {
        var available_cars = _.filter(_.prop('in_stock'), cars);
        return available_cars.map(function (x) {
            return accounting.formatMoney(x.dollar_value);
        }).join(', ');
    };
};
c_it('Bonus 1: theirs:> ' + availablePrices(CARS));

// NOW MY Code
var _available_cars = _.filter(_.prop('in_stock'));

var _dollars_formatted = function _dollars_formatted(x) {
    return accounting.formatMoney(x)
};
var _dollar_value = _.prop('dollar_value');
var _availableDollars = _.compose(
    _dollars_formatted,
    trace('after _dollar_value'),
    _dollar_value
);
var _spacer = _.join(', ');
var _availableCosts = _.compose(
    _spacer,
    _.map(_availableDollars),
    _available_cars
);
c_it('bonus 1: mine:> ' + _availableCosts(CARS));