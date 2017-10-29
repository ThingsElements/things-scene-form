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
  }, {
    type: 'number',
    label: 'min',
    name: 'min',
    property: 'min'
  }, {
    type: 'number',
    label: 'max',
    name: 'max',
    property: 'max'
  }, {
    type: 'number',
    label: 'step',
    name: 'step',
    property: 'step'
  }],
  'value-property': 'value'
}

import Input from './input'

var { HTMLOverlayElement } = scene

export default class InputNumber extends Input {

  get nature() {
    return NATURE;
  }

  setElementProperties(element) {
    var {
      min = 0,
      max = 100,
      step = 1
    } = this.model

    super.setElementProperties(element)

    element.min = min
    element.max = max
    element.step = step
  }
}

scene.Component.register('input-number', InputNumber);
scene.Component.register('input-range', InputNumber);
