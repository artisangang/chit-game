import {animate} from './animations.js';

var _initComponents = {};
var _activeComponent;

function boot(com) {

	
	document.addEventListener('DOMContentLoaded', function () {

		let appEle = document.getElementsByTagName('app')[0];

		if (appEle) {
			
			activate(com.module.boot, appEle, true);
		}

	}, false);

}

function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function activate(component, root, replace) {


	let componentRef = htmlToElement(component.meta.template);

	let componentObject = new component(componentRef);

	component.instance = componentObject;

	// set element reference
	componentObject.elementRef = componentRef;

	// set current component as active component
	_activeComponent = component;	

	// cal init component
	componentObject.init();	
	

	if (replace) {
		root.innerHTML = '';
	} 

	componentRef.classList.add('component');

	if (componentObject.animation) {
		animate(componentObject, componentObject.animation.in || componentObject.animation );	
		root.appendChild( componentRef );			

	} 	
	
	root.appendChild( componentRef );
	
	
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