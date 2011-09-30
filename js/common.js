(function(global){
	var dispatcher = global.dispatcher || (global.dispatcher = function dispatcher(path, func) {
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
	
});