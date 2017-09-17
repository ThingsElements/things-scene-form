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
    // ready callback이 컨테이너를 바꿀 때마다 호출되서 계속 input을 생성하는 문제가 있음.
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
