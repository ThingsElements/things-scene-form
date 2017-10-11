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
    type: 'checkbox',
    label: 'multiple',
    name: 'multiple',
    property: 'multiple'
  }]
}

import Input from './input'

var { HTMLOverlayElement } = scene

export default class InputFile extends Input {

  get nature() {
    return NATURE;
  }

  setElementProperties(element) {
    super.setElementProperties(element)
    element.multiple = !!this.get('multiple')
  }
}

scene.Component.register('input-file', InputFile);
