import module from  './module.js';
import component from  './component.js';
import {boot,render,activate} from  './bootstrap.js';
import animate from  './animate.js';

import './engine.scss';

export {component,module,boot,render,animate,activate};

/*
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
// requires and returns html files in the views directory
var modules = requireAll(require.context("./views", true, /^\.html$/));
modules.forEach(function(htmlTemplate){ 
   // code to add each template to document.body
}
*/