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
    type: 'date',
    label: 'value',
    name: 'value',
    property: 'value'
  }, {
    type: 'date',
    label: 'min',
    name: 'min',
    property: 'min'
  }, {
    type: 'date',
    label: 'max',
    name: 'max',
    property: 'max'
  }],
  'value-property': 'value'
}

import Input from './input'

export default class InputDate extends Input {

  get nature() {
    return NATURE;
  }

  setElementProperties(element) {
    super.setElementProperties(element)

    var {
      min,
      max
    } = this.state

    element.min = min
    element.max = max
  }
}

scene.Component.register('input-date', InputDate);
