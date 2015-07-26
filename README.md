# Intercept

`INTERCEPT` is a module that allows you to register event callbacks to be fired on elements that match provided selectors as they are added to the DOM.

**jQuery is a dependency for this module.**

`INTERCEPT.regester` is the method you use to register your callbacks. The first time this method is called, a `MutationObserver` object is created and is instructed to observe `document.body` for changes. This means that you can not call this method until `document.body` exists. For this reason, it is recommened that you place your calls in jQuery's `$(document).ready()` callback.

------

####**`Intercept.register`** Parameters:
  The method takes a single parameter, which is an object that acts as a list of options. 
  
  - **`selector [String]`** :
   - Required, no default value.
   - String used as jQuery selector. All elements matching this selector will be passed as a parameter to the provided `callback` function one at a time. 
   
  - **`callback [Function]`** :
   - Required, no default value.
   - Function callback. Receives a single element as a parameter. Called one time for every element that is inserted into the DOM and matches `selector`. Under default behavior, all existing elements that match the provided selector will be passed in as well. To avoid this, set `new_only` to true.
   
  - **`new_only [Boolean]`** :
   - Optional, default: `false`.
   - If this parameter is not explicitly set to true, then at the time of invocation, all elements which are already inserted into the DOM that match `selector` will be passed as individual parameters to `callback`. In the author's experience, this is usually the desired behavior. 

-----

####Examples:

```javascript
  $(document).ready(function () {
	
	INTERCEPT.register({ 
		selector: '*',
		callback: function(element) {
			console.log(element); 
		}
	});
	
});
```
In the above example, every child of `document.body` and all of their descendents will be logged to console. Any new nodes that are inserted during runtime will also be logged to console. 

```javascript
  $(document).ready(function () {
	
	INTERCEPT.register({ 
		selector: '.my-class',
		callback: function(element) {
			console.log(element); 
		},
		new_only: true
	});
	
});
```

In the above example, elements that are added to the DOM at run time and match the `.my-class` selector will be logged to console. Any instances of `my-class` that existed prior to the invocation of this method will not be logged, because `new_only` is set to true. 
