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
    name: 'name'
  }, {
    type: 'string',
    label: 'value',
    name: 'value'
  }, {
    type: 'string',
    label: 'placeholder',
    name: 'placeholder'
  }, {
    type: 'checkbox',
    label: 'readonly',
    name: 'readonly'
  }, {
    type: 'checkbox',
    label: 'disabled',
    name: 'disabled'
  }, {
    type: 'checkbox',
    label: 'copy-value-to-data',
    name: 'copyValueToData'
  }, {
    type: 'number',
    label: 'max-length',
    name: 'maxlength'
  }],
  'value-property': 'value'
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
    var {
      name = '',
      placeholder = '',
      disabled,
      readonly,
      maxlength
    } = this.model

    element.type = this.inputType
    element.name = name
    element.placeholder = placeholder
    element.disabled = disabled
    element.readonly = readonly
    element.maxlength = maxlength
  }

  onchange(after, before) {
    super.onchange(after, before)

    if (after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
      if(this.get('copyValueToData'))
        this.data = after.value
    }
  }
}

[
  'input-text',
  'input-password',
  'input-email',
  'input-search'
].forEach(input => scene.Component.register(input, Input))
