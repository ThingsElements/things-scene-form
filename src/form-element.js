import reposition from './reposition'

export function createForm(component) {
  var {
    action,
    name,
    method
  } = component.model;

  var form = document.createElement('form');
  
  form.onchange = function (e) {
  }
  
  component._element = form;
 
  reposition(component);

  component.root.model_layer.overlay.appendChild(form);
}

export function disposeForm(component) {
  var form = component._element
  
  if (!form)
    return

  component.root.model_layer.removeChild(form);
}