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
    name: 'text'
  }],
  'value-property': 'text'
}

import Input from './input'

export default class InputSubmit extends Input {

  get nature() {
    return NATURE;
  }

  setElementProperties(element) {
    super.setElementProperties(element)
  }
}

scene.Component.register('input-button', InputSubmit);
scene.Component.register('input-submit', InputSubmit);
scene.Component.register('input-reset', InputSubmit);
