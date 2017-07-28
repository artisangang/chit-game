import {animate,reverse} from './animations.js';

var _initComponents = {};
var _activeComponent;

function boot(com) {

	
	document.addEventListener('DOMContentLoaded', function () {
					
		activate(com.module.boot, true);		

	}, false);

}

function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function activate(component, replace) {



	let root = document.getElementsByTagName('app')[0];

	if (!root) {
		throw new Error('Root (<app>) is missing.');
	}


	let componentRef = htmlToElement(component.meta.template);

	let componentObject = new component(componentRef);

	component.instance = componentObject;

	// set element reference
	componentObject.elementRef = componentRef;

	// set params
	if (typeof replace == 'object' ) {
		componentObject.params = replace;
		componentObject.param = function (key) {
			return this.params[key];
		}
	}

		

	// cal init component
	componentObject.init();	
	

	if (typeof replace == 'boolean' && replace == true) {
		root.innerHTML = '';
	} 

	componentRef.classList.add('component');

	if (componentObject.animation) {

		let timeout = 0;

		if (_activeComponent) {

			let duration = _activeComponent.instance.animation.out.duration || _activeComponent.instance.animation.in.duration || _activeComponent.instance.animation.duration || 250;

			// component out
			reverse(_activeComponent.instance, _activeComponent.instance.animation.out || _activeComponent.instance.animation.in || _activeComponent.instance.animation );
			timeout = Number( parseFloat(duration.replace( /[^\d\.]*/g, '')) ) * 1000;
		}

		setTimeout( () => {
			// component in
			animate(componentObject, componentObject.animation.in || componentObject.animation );	
		
		}, timeout );
		

	} 	
	
	root.appendChild( componentRef );

	// set current component as active component
	_activeComponent = component;	
	
	componentObject.rendered();

}

function stacked(component) {

}

function destroy(root, component) {

	let componentObject = component.instance;

	if (componentObject.animation) {
		
		animate(componentObject, componentObject.animation.in || componentObject.animation );	
		root.appendChild( componentRef );			

	} 
	setTimeout(() => { 
		root.removeChild(componentObject.elementRef);
		componentObject.destroy();
	}, Number(componentObject.animation.out.duration || componentObject.animation.duration) * 1000 );
	
	
}


export {boot,activate, destroy, stacked};