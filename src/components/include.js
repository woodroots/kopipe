const includeJs = {
	install(Vue, options) {
		options.forEach(function(elem,i){
			var script = document.createElement('script');
			script.src = elem;
			document.body.appendChild(script);
			
		});
	}
}
export default includeJs;
