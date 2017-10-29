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
  }],
  'value-property': 'value'
}

import Input from './input'

var { HTMLOverlayElement } = scene

export default class InputSubmit extends Input {

  get nature() {
    return NATURE;
  }

  setElementProperties(element) {
    super.setElementProperties(element)
  }
}

scene.Component.register('input-submit', InputSubmit);
scene.Component.register('input-reset', InputSubmit);
