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

var { HTMLOverlayElement } = scene

export default class Input extends HTMLOverlayElement {

  get nature() {
    return NATURE;
  }

  get tagName() {
    return 'input'
  }

  get inputType() {
    return this.get('type').substr(6)
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

[
  'input-text',
  'input-password',
  'input-email',
  'input-search',
  'input-number',
  'input-range',
  'input-color',
  'input-file',
  'input-date',

  'input-submit',
  'input-reset'
].forEach(input => scene.Component.register(input, Input))
