var $$cb2p = require('../cb2p.js');
var $$QTest = require('qunit-color');


var oT = {
	a : 'oT.a',
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

var oB = {
	a : 'oB'
};

$$QTest.asyncTest('object method convert :', function (assert) {
	
	Promise.all([
	
		$$cb2p(oT, 'getData')(2).then(function (o) {
			assert.equal(o, 'ok oT.a 2', 'ok call ok oT.a 2');
		}).catch(function (err) {
			assert.ok(false, 'err call not to catch'); 
		})

		, $$cb2p(oT, 'getData')(22).then(function (o) {
			assert.ok(false, 'ok call not to then');
		}).catch(function (err) {
			assert.equal(err, 'err oT.a 22', 'err cass err oT.a 22');
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




$$QTest.asyncTest('function.p2cb :', function (assert) {


	var run = function () {
		$$cb2p(getData).p2cb(2, function (err, o) {
			if(err) {
				assert.ok(false, 'not to catch');
			}else{
				assert.equal(o, 'ok 2', 'ok 2');
			}
			$$QTest.start();
		});
	};



	$$cb2p(getData).p2cb(22, function (err, o) {
		if(err) {
			assert.equal(err, 'err 22', 'err 22');
		}else{
			assert.ok(false, 'not to then');
		}
		run();
	});


});


$$QTest.asyncTest('obj.method.p2cb :', function (assert) {



	var run = function () {
		$$cb2p(oT, 'getData').p2cb(2, function (err, o) {
			if(err) {
				assert.ok(false, 'not to catch');
			}else{
				assert.equal(o, 'ok oT.a 2', 'ok oT.a 2');
			}
			$$QTest.start();
		});
	};

	$$cb2p(oT, 'getData').p2cb(22, function (err, o) {
		if(err) {
			assert.equal(err, 'err oT.a 22', 'err oT.a 22');
		}else{
			assert.ok(false, 'not to then');
		}
		run();
	});


});


$$QTest.asyncTest('obj.method.setBackFun :', function (assert) {



	var run = function () {
	$$cb2p.setBackFunName('p2cb');
		$$cb2p(oT, 'getData').p2cb(2, function (err, o) {
			if(err) {
				assert.ok(false, 'not to catch');
			}else{
				assert.equal(o, 'ok oT.a 2', 'ok oT.a 2');
			}
			$$QTest.start();
		});
	};

	$$cb2p.setBackFunName('back');
	$$cb2p(oT, 'getData').back(22, function (err, o) {
		if(err) {
			assert.equal(err, 'err oT.a 22', 'err oT.a 22');
		}else{
			assert.ok(false, 'not to then');
		}
		run();
	});


});


$$QTest.load();


