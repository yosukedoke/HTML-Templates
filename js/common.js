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

// Setting routing functions.
(function(global){
	// Common initialization
	dispatcher(".", function(){
		$(function(){
			/*
			$('#container').css({
				'opacity':'1'
			});
			*/
			
			/* Case of useing meca.js
			// ロールオーバー
			$('.btn').meca('hover');
			// 外部リンク
			$('a.external').meca('external');
			// pngfix
			$('.pngfix').meca('pngfix');
			// pngfix（背景画像）
			$('.bgpng').meca('bgpngfix');
			// 高さ揃え
			$('.heightAlign').meca('heightAlign');
			// IE6でposition fixed
			$('.fixed').meca('positionFixed');
			// スムーズスクロール
			$('a[href^="#"]').meca('smoothScroll');
			// OSのクラス追加
			$('body').meca('addOsClass');
			// IEで画像のlabel押せるようにする
			$('label img').meca('labelClickable');
			// active
			$('.hasActive').meca('active');
			//placeholder
			$('input[placeholder], textarea[placeholder]').meca('placeholder');
			//*/
		});
	});
	/*
	dispatcher("^/$", function(){
		$LAB.script('/js/main.js');
	});
	dispatcher("^/hoge/$", function(){
		$LAB.script('/js/hoge.js');
	});
	dispatcher("^/hoge/(.+)", function(match){
	//	DomainName.data.id = match;
		$LAB.script('/js/hoge.js');
	});
	*/
	dispatcher(location.pathname);
})(this);


