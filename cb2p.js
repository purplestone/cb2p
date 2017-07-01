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
module.exports = (function () {
	var sBackFunName = 'p2cb';
	var _fun = function (obj, fn) {
		var _fn = obj;
		if (fn) {
			_fn = fn;
			if(typeof fn !== 'function') {
				_fn = obj[fn];
			}
		}else{
			obj = null;
		}

		var fR = function () {
			var args = [].slice.call(arguments, 0), oThis = obj || this;
			return new Promise(function (resolve , reject) {

				var aP = args.concat([function (err, o) {
					if(err) {
						reject(err);
					}else{
						resolve(o);
					}
				}]);

				return _fn.apply(oThis, aP);
			});
		};


		fR[sBackFunName] = function () {
 			_fn.apply(obj || this, arguments);
		};
		return fR;
	};

	_fun.setBackFunName = function (s) {
		sBackFunName = s;
	};


	return _fun;
}());
