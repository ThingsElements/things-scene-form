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
    type: 'string',
    label: 'name',
    name: 'name',
    property: 'name'
  }, {
    type: 'string',
    label: 'placeholder',
    name: 'placeholder',
    property: 'placeholder'
  }, {
    type: 'checkbox',
    label: 'copy-value-to-data',
    name: 'copyValueToData'
  }, {
    type: 'number',
    label: 'max-length',
    name: 'max-length',
    property: 'maxlength'
  }],
  'value-property': 'value'
}

var { HTMLOverlayElement } = scene

export default class TextArea extends HTMLOverlayElement {

  get nature() {
    return NATURE;
  }

  createElement() {
    super.createElement();

    this.element.style.resize = 'none'

    this.element.value = this.get('value') || ''
    this.element.onchange = e => {
      this.set('value', this.element.value);
      if(this.get('copyValueToData'))
        this.data = after.value
    }
  }

  setElementProperties(element) {
    var {
      name = '',
      placeholder = '',
      maxLength
    } = this.state

    this.element.name = name
    if(maxLength)
      this.element.maxlength = maxlength
    else
      delete this.element.maxlength

    this.element.placeholder = placeholder
  }

  onchange(after, before) {
    super.onchange(after, before)

    if (after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
    }
  }
}

scene.Component.register('textarea', TextArea);
