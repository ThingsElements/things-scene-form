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
    type: 'color',
    label: 'value',
    name: 'text'
  }],
  'value-property': 'text'
}

import Input from './input'

export default class InputColor extends Input {

  get nature() {
    return NATURE;
  }

  setElementProperties(element) {
    super.setElementProperties(element)
  }
}

scene.Component.register('input-color', InputColor);
