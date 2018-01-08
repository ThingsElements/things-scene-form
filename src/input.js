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
    type: 'number',
    label: 'max-length',
    name: 'maxlength'
  }],
  'value-property': 'value'
}

var { HTMLOverlayElement, error } = scene

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

    /* element.property => component.property */
    this.element.onchange = e => {
      this.setState('value', this.element.value);
    }
  }

  /* component.property => element.property */
  setElementProperties(element) {
    var {
      name = '',
      placeholder = '',
      disabled,
      readonly,
      maxlength,
      value
    } = this.state

    try {
      element.type = this.inputType
      element.name = name
      element.placeholder = placeholder
      element.disabled = disabled
      element.readonly = readonly
      element.maxlength = maxlength
      element.value = value
    } catch(e) {
      error(e)
    }

    this.data = this.value
  }
}

[
  'input',
  'input-text',
  'input-password',
  'input-email',
  'input-search',
  'input-time',
  'input-datetime-local',
  'input-month',
  'input-week'
].forEach(input => scene.Component.register(input, Input))
