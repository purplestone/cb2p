# cb2p #########

Convert node-style callback function to Promise APIs style.

## Getting Started #########
Install the module: ``npm i cb2p``

## Examples #########

```javascript

var $$cb2p = require('cb2p');

$$cb2p(require('fs').readdir)('./').then(function () {
	console.log(arguments);
}).catch(function () {
	console.log(arguments);
});

```

call object method:
```javascript
var oTest = {
	a : 'eg',
	getData : function (id, cb) {
		var that = this;
		var iTimeout = setTimeout(function() {
			cb(0, 'ok ' + that.a + ' ' + id);
		}, 100);
	}
};

$$cb2p(oTest, 'getData')(3).then(function () {
	console.log(arguments);
});

$$cb2p(oTest, oTest.getData)(3).then(function () {
	console.log(arguments);
});

$$cb2p(oTest.getData).call(oTest, 3).then(function () {
	console.log(arguments);
});

```



## License #########
Licensed under the MIT license.