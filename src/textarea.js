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
  }]
}

import HTMLElement from './html-element'

export default class TextArea extends HTMLElement {

  get nature() {
    return NATURE;
  }

  createElement() {
    super.createElement();

    this.element.value = this.get('value') || ''
    this.element.onchange = e => {
      this.set('value', this.element.value);
    }
  }

  setElementProperties(element) {
    var {
      name = ''
    } = this.model.htmlConfig || {}

    this.element.name = name
  }

  onchange(after, before) {
    super.onchange(after, before)
    
    if (after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
    }
  }
}

scene.Component.register('textarea', TextArea);
