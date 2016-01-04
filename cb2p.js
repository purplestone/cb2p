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
module.exports = function (obj, fn) {
	var fR = function () {
		var args = [].slice.call(arguments, 0), oThis = this;
		return new Promise(function (resolve , reject) {

			var aP = args.concat([function (err, o) {
				if(err) {
					reject(err);
				}else{
					resolve(o);
				}
			}]);


			if(fn) {
				oThis = obj;
				if(typeof fn !== 'function') {
					fn = obj[fn];
				}
			}else{
				fn = obj;
			}
			return fn.apply(oThis, aP);
		});
	};


	fR.p2cb = function () {
		var fOrg = fn;
		if(fn) {
			var oThis = obj;
			if(typeof fn !== 'function') {
				fOrg = obj[fn];
			}
		}else{
			fOrg = obj;
		}

		return fOrg.apply(oThis, arguments);
	};
	return fR;
};

