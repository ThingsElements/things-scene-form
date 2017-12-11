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
  }],
  'value-property': 'value'
}

var { HTMLOverlayElement } = scene

export default class Button extends HTMLOverlayElement {

  get tagName() {
    return 'button'
  }

  get nature() {
    return NATURE;
  }

  setElementProperties(button) {
    var {
      value
    } = this.state

    this.element.textContent = this.value
  }
}

scene.Component.register('button', Button);
