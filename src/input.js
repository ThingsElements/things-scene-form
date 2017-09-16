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

import reposition from './reposition'
import { createInput, disposeInput } from './input-element'

var { Component, RectPath } = scene

export default class Input extends RectPath(Component) {

  ready() {
    createInput(this);
  }

  _draw(ctx) {
    reposition(this);
  }

  dispose() {
    disposeInput(this);
    super.dispose()
  }

  get hasTextProperty() {
    return false
  }

  get controls() { }

  get nature() {
    return NATURE;
  }

  onchange(after, before) {
    if (after.hasOwnProperty('value')) {
      this._input.value = after.value
    }
  }
}

scene.Component.register('input', Input);
