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
  }, {
    type: 'string',
    label: 'action',
    name: 'action',
    property: 'action'
  }, {
    type: 'string',
    label: 'name',
    name: 'name',
    property: 'name'
  }]
}

import MixinHTMLElement from './mixin-html-element'

var { Container } = scene

export default class Form extends MixinHTMLElement(Container) {

  setElementProperties() {
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('form', Form);
