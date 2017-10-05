/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'value',
    name: 'value',
    property: 'value'
  }, {
    type: 'number',
    label: 'size',
    name: 'size',
    property: 'size'
  }, {
    type: 'string',
    label: 'name',
    name: 'name',
    property: 'name'
  }, {
    type: 'checkbox',
    label: 'checked',
    name: 'checked',
    property: 'checked'
  }]
}

import Input from './input'

var { Component } = scene

export default class Radio extends Input {

  get nature() {
    return NATURE;
  }

  get tagName() {
    return 'input'
  }

  get inputType() {
    return 'radio'
  }

  createElement() {
    this.element = document.createElement('label')
    if(!this.element)
      return;

    var input = document.createElement('input');
    this.element.appendChild(input);
    
    var text = document.createTextNode(this.get('text'));
    this.element.appendChild(text);

    this.setElementProperties(this.element);
    
    if(this.parent.isHTMLElement && this.parent.isHTMLElement())
      this.parent.element.appendChild(this.element)
    else
      this.root.model_layer.overlay.appendChild(this.element);

    Component.reposition(this);

    this.oncreate_element && this.oncreate_element(this.element)    
  }

  setElementProperties(element) {
    var eText = this.element.querySelector('text')
    var eInput = this.element.querySelector('input')

    var {
      text,
      checked,
      value
    } = this.model

    if(eText) {
      eText.textContent = text
    }

    if(eInput) {
      if(checked)
        eInput.setAttribute('checked', 'checked');
      else
        eInput.removeAttribute('checked');

      eInput.setAttribute('value', value)
    }

    super.setElementProperties(eInput)
  }
}

scene.Component.register('input-radio', Radio);
