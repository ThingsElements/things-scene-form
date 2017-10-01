/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'name',
    name: 'name',
    property: 'name'
  }, {
    type: 'string',
    label: 'value',
    name: 'value',
    property: 'value'
  }]
}

import HTMLElement from './html-element'

export default class Input extends HTMLElement {

  get nature() {
    return NATURE;
  }

  get inputType() {
    return this.get('inputType') || 'text'
  }

  createElement() {
    super.createElement();

    this.element.value = this.get('value') || '';
    this.element.onchange = e => {
      this.set('value', this.element.value);
    }
  }

  setElementProperties(element) {
    element.type = this.inputType
    element.name = this.get('name')
  }

  onchange(after, before) {
    super.onchange(after, before)
    
    if (after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
    }
  }
}

scene.Component.register('input', Input);
