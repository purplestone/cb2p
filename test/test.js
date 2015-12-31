
var $$cb2p = require('../cb2p.js');
var $$QTest = require('qunit-color');


var oT = {
	a : 'o.a',
	getData : function (id, cb) {
		var that = this;
		var iTimeout = setTimeout(function() {
			if(id > 3) {
				cb('err ' + that.a + ' ' + id);
			}else{
				cb(0, 'ok ' + that.a + ' ' + id);
			}
		}, 100);
	}
};
var getData = function (id, cb) {
	var iTimeout = setTimeout(function() {
		if(id > 3) {
			cb('err ' + id);
		}else{
			cb(0, 'ok ' + id);
		}
	}, 100);
};


$$QTest.asyncTest('object method convert :', function (assert) {
	
	Promise.all([
	
		$$cb2p(oT, 'getData')(2).then(function (o) {
			assert.equal(o, 'ok o.a 2', 'ok call ok o.a 2');
		}).catch(function (err) {
			assert.ok(false, 'err call not to catch'); 
		})

		, $$cb2p(oT, 'getData')(22).then(function (o) {
			assert.ok(false, 'ok call not to then');
		}).catch(function (err) {
			assert.equal(err, 'err o.a 22', 'err cass err o.a 22');
		})
	
	]).then(function () {
		$$QTest.start();
	});

});


$$QTest.asyncTest('function convert :', function (assert) {

	Promise.all([

		$$cb2p(getData)(2).then(function (o) {
			assert.equal(o, 'ok 2', 'ok 2');
		}).catch(function (err) {
			assert.ok(false, 'not to catch');
		})

		, $$cb2p(getData)(22).then(function (o) {
			assert.ok(false, 'not to then');
		}).catch(function (err) {
			assert.equal(err, 'err 22', 'err 22');
		})

	]).then(function () {
		$$QTest.start();
	});

});


$$QTest.asyncTest('input this object convert :', function (assert) {
	var oB = {
		a : 'oB'
	};
	Promise.all([

		$$cb2p(oB, oT.getData)(2).then(function (o) {
			assert.equal(o, 'ok oB 2', 'ok oB 2');
		}).catch(function (err) {
			assert.ok(false, 'not to catch');
		})

		, $$cb2p(oB, oT.getData)(22).then(function (o) {
			assert.ok(false, 'not to then');
		}).catch(function (err) {
			assert.equal(err, 'err oB 22', 'err oB 22');
		})


	]).then(function () {
		$$QTest.start();
	});

});

$$QTest.asyncTest('call/apply object convert :', function (assert) {
	var oB = {
		a : 'oB'
	};
	Promise.all([

		$$cb2p(oT.getData).apply(oB, [2]).then(function (o) {
			assert.equal(o, 'ok oB 2', 'ok oB 2');
		}).catch(function (err) {
			assert.ok(false, 'not to catch');
		})

		, $$cb2p(oT.getData).call(oB, 22).then(function (o) {
			assert.ok(false, 'not to then');
		}).catch(function (err) {
			assert.equal(err, 'err oB 22', 'err oB 22');
		})


	]).then(function () {
		$$QTest.start();
	});

});

$$QTest.load();


