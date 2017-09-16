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

  // -1. 컴포넌트의 원래 textHidden값을 보관한다.
  var textHidden = component.textHidden;
  component.textHidden = true;

  // 0. input 엘리먼트를 생성한다.
  var input = createInputElement(component);
  var span = document.createElement('span');

  component._input = input;
  component._span = span;

  input.value = value;

  reposition(component);

  var targetElement = component.root.target_element;
  span.appendChild(input);
  targetElement.appendChild(span);

  input.onchange = function (e) {
    component.set('value', input.value);
  }
}

export function disposeInput(component) {
  var span = component._span

  if (!span)
    return

  var targetElement = component.root.target_element;
  targetElement.removeChild(span);
}