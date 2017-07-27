const animations = {
	slide: function slide(component, config) {

		let directions = ['left', 'right', 'top', 'bottom'];

		let directionIndex = directions.indexOf(config.from || null);

		if (directionIndex < 0) {
			throw new Error('Invalid direction in slide animation for component ' + component.constructor.name);
		}

		component.elementRef.classList.add('slide');
		component.elementRef.classList.add( directions[directionIndex] );
		component.elementRef.style.display = 'block';

		setTimeout(() => {			
			//void component.elementRef.offsetWidth;
			component.elementRef.classList.add('in');
		}, 0);

	},

	fade: function fade(component, config) {

		let directions = ['fade-in', 'fade-out'];

		let directionIndex = directions.indexOf(config.effect || null);

		if (directionIndex < 0) {
			throw new Error('Invalid effect in fade animation for component ' + component.constructor.name);
		}

		component.elementRef.classList.add('fade');
		component.elementRef.classList.add( directions[directionIndex] );
		component.elementRef.style.display = 'block';

		setTimeout(() => {			
			//void component.elementRef.offsetWidth;
			component.elementRef.classList.add('in');
		}, 0);

	}
};

function animate(component, config) {

	if (typeof config.key == 'undefined') {
		throw new Error('Animation key is not defined for component ' + component.constructor.name);
	}

	if (typeof animations[config.key] == 'undefined') {
		throw new Error('Invalid animation key defined for component ' + component.constructor.name);
	}

	if (typeof component.elementRef == 'undefined' || !(component.elementRef instanceof Node)) {
		throw new Error('Invalid component or element reference is not provided for ' + component.constructor.name);
	}

	component.elementRef.style.display = 'none';

	component.elementRef.classList.add('animation');

	if (config.duration) {
		component.elementRef.style.transitionDuration = config.duration;
	}

	animations[config.key](component, config);

}

export {animate};