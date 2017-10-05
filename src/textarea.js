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
    type: 'number',
    label: 'max-length',
    name: 'max-length',
    property: 'maxLength'
  }]
}

// cols/rows(?), wrap(hard, soft), readonly, disabled, maxlength

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
    }
  }

  setElementProperties(element) {
    var {
      name = '',
      maxLength
    } = this.model

    this.element.name = name
    if(maxLength)
      this.element.maxlength = maxLength
    else
      delete this.element.maxlength
  }

  onchange(after, before) {
    super.onchange(after, before)
    
    if (after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
    }
  }
}

scene.Component.register('textarea', TextArea);
