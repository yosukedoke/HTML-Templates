(function(global){
	/** Browser Check Patttern **/
	/*
	$.browser.webkit; //(as of jQuery 1.4)
	$.browser.safari; //(deprecated)
	$.browser.opera;
	$.browser.msie;
	$.browser.mozilla;
	
	$.browser.ipad = navigator.platform == 'iPad';
	*/
	
	/** Debug mode check Pattern **/
	var DomainName = global.DomainName || (global.DomainName = {});
	DomainName.env = location.host.indexOf('example.com') >= 0 ? 'prod' : 'dev';
	
	/** Debug Pattern **/
	(function(){
		if ($.browser.ipad) return;
		if (!global.console) global.console = {};
		var names = [
			"log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
			"group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"
		];
		for (var i = 0, n; n = names[i]; i++) {
			if (typeof(global.console[n]) != 'function') {
				global.console[n] = function() {};
			}
		}
	})();
	global.debug || (global.debug = {
		log: function(label) {
			if (DomainName.env == 'prod') return;
			var args = Array.prototype.slice.call(arguments, 1);
			if (!/String/.test(Object.prototype.toString.call(label))) {
				args.unshift(label);
				label = 'DomainName DEBUG';
			}
			if ($.browser.ipad) {
				console.log(label+ ': ' + args.join(','));
			}
			else {
				args.unshift("[" + label + "]");
				if ($.browser.msie) {
					console.log(args);
				}
				else {
					console.log.apply(console, args);
				}
			}
		}
	});
	
	/** Routing Pattern **/
	global.dispatcher || (global.dispatcher = function dispatcher(path, func) {
	  dispatcher.path_func = dispatcher.path_func || []
	  if (func) return dispatcher.path_func.push([path, func]);
	  for(var i = 0, l = dispatcher.path_func.length; i < l; ++i) {
		var func = dispatcher.path_func[i];
		var match = path.match(func[0]);
		match && func[1](match);
	  };
	});
	
	//dispatcher(location.pathname);
})(this);

// Common initialization when dom ready
$(function(){
	$('#container').css({
		'opacity':'1'
	});
});