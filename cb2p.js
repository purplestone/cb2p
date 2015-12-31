/**
	https://github.com/purplestone/cb2p

	$$cb2p(getData)('req arg').then(function (o) {
	...
	$$cb2p(oT, 'getData')('req arg').then(function (o) {
		console.log(o);
	}, function (err) {
		console.log(err);
	});

*/

'use strict';
module.exports = function (f, ff) {return function () {var args = [].slice.call(arguments, 0), oThis = this;return new Promise(function (resolve , reject) {

	var aP = args.concat([function (err, o) {
		if(err) {
			reject(err);
		}else{
			resolve(o);
		}
	}]);


	if(ff) {
		oThis = f;
		if(typeof ff === 'function') {
			f = ff;
		}else{
			f = f[ff];
		}
	}
	f.apply(oThis, aP);
	
	
});};};

