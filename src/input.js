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
  }]
}

import HTMLElement from './html-element'

export default class Input extends HTMLElement {

  get nature() {
    return NATURE;
  }

  createElement() {
    super.createElement();

    this.element.value = this.get('value') || '';
    this.element.onchange = e => {
      this.set('value', this.element.value);
    }
  }

  setElementProperties() {
    var {
      type
    } = this.model.htmlConfig

    this.element.type = type
  }

  onchange(after, before) {
    if (after.hasOwnProperty('value') && this._element) {
      this._element.value = after.value;
    }
  }
}

scene.Component.register('input', Input);
