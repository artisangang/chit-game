const animations = {
	slide: function slide(component, config, reverse) {

		let directions = ['left', 'right', 'top', 'bottom'];

		let directionIndex = directions.indexOf(config.from || null);

		if (directionIndex < 0) {
			throw new Error('Invalid direction in slide animation for component ' + component.constructor.name);
		}

		if (typeof reverse != 'undefined') {

			component.elementRef.style.zIndex = 2;
			component.elementRef.classList.add('slide');			
			component.elementRef.classList.add( directions[directionIndex] );
			

			setTimeout(() => {			
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.remove('in');
				component.elementRef.classList.add('out');
			}, 0);

		} else {
			component.elementRef.style.zIndex = 4;
			component.elementRef.style.display = 'block';
			component.elementRef.classList.add('slide');
			component.elementRef.classList.add( directions[directionIndex] );		

			setTimeout(() => {			
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.add('in');
			}, 0);

		}

		

	},

	fade: function fade(component, config, reverse) {

		let directions = ['fade-in', 'fade-out'];

		let directionIndex = directions.indexOf(config.effect || null);

		if (directionIndex < 0) {
			throw new Error('Invalid effect in fade animation for component ' + component.constructor.name);
		}

		if (typeof reverse != 'undefined') {

			component.elementRef.style.zIndex = 2;
			component.elementRef.classList.add('fade');			
			component.elementRef.classList.add( directions[directionIndex] );
			

			setTimeout(() => {			
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.remove('in');
				component.elementRef.classList.add('out');
			}, 0);

		} else {

			component.elementRef.style.zIndex = 4;
			component.elementRef.style.display = 'block';
			component.elementRef.classList.add('fade');
			component.elementRef.classList.add( directions[directionIndex] );
			

			setTimeout(() => {			
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.add('in');
			}, 0);
		}

	}
};

function validateConfig(component, config) {
	if (typeof config.key == 'undefined') {
		throw new Error('Animation key is not defined for component ' + component.constructor.name);
	}

	if (typeof animations[config.key] == 'undefined') {
		throw new Error('Invalid animation key defined for component ' + component.constructor.name);
	}

	if (typeof component.elementRef == 'undefined' || !(component.elementRef instanceof Node)) {
		throw new Error('Invalid component or element reference is not provided for ' + component.constructor.name);
	}
}

function animate(component, config) {

	validateConfig(component, config);

	component.elementRef.style.display = 'none';

	component.elementRef.classList.add('animation');

	if (config.duration) {
		component.elementRef.style.transitionDuration = config.duration;
	}

	animations[config.key](component, config);

}

function  reverse(component, config) {

	validateConfig(component, config);	

	component.elementRef.classList.add('animation');

	if (config.duration) {
		component.elementRef.style.transitionDuration = config.duration;
	}

	animations[config.key](component, config, true);


	setTimeout(() => {
		component.elementRef.style.display = 'none';
	}, parseFloat(config.duration.replace( /[^\d\.]*/g, '')) * 1000);
	
}

export {animate,reverse};