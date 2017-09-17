import reposition from './reposition'

function createInputElement(component) {
  var {
      type = 'text'
    } = component.model.inputConfig || {};

  var element = document.createElement('input');

  element.type = type;

  return element;
}

export function createInput(component) {
  var {
      value = ''
    } = component.model;

  var input = createInputElement(component);

  input.value = value;
  input.onchange = function (e) {
    component.set('value', input.value);
  }
  
  component._element = input;
 
  reposition(component);

  component.root.model_layer.overlay.appendChild(input);
}

export function disposeInput(component) {
  var input = component._element
  
  if (!input)
    return

  component.root.model_layer.removeChild(input);
}