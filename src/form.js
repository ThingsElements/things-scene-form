/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'method',
    name: 'method',
    property: 'method'
  },{
    type: 'string',
    label: 'action',
    name: 'action',
    property: 'action'
  },{
    type: 'string',
    label: 'name',
    name: 'name',
    property: 'name'
  }]
}

import reposition from './reposition'
import { createForm, disposeForm } from './form-element'
var { Container } = scene

export default class Form extends Container {

  ready() {
    // ready callback이 컨테이너를 바꿀 때마다 호출되서 계속 form을 생성하는 문제가 있음.
    createForm(this);
  }

  _draw(ctx) {
    reposition(this);
  }

  dispose() {
    disposeForm(this);
    super.dispose()
  }

  get hasTextProperty() {
    return false
  }

  get controls() { }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('form', Form);
