INTERCEPT = (function () {	
	var selectors = {},
			observer,
			register;

	function register(spec) {
		if(typeof observer === 'undefined') init();
		var selector = spec.selector;

		if (!spec.new_only) {
			$(spec.selector).each(function(i, element) {
				spec.callback(element);
			});
		}
	  selectors[selector] = spec; 
	}

	function toArray(collection) {
		return Array.prototype.slice.call(collection);
	}

	function init() {
		observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				toArray(mutation.addedNodes).forEach(function(node) {
					Object.keys(selectors).forEach(function(selector) {
						var callback = selectors[selector].callback;
						if ($(node).is(selector) && callback) {
							callback(node);
						}	
					});
				});
			});
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}


	return Object.freeze({
		register: register,
		observer: observer
	});
}());
