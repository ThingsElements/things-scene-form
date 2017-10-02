/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'legend',
    name: 'legend',
    property: 'legend'
  }]
}

var { HTMLOverlayContainer } = scene

export default class FieldSet extends HTMLOverlayContainer {

  setElementProperties(fieldset) {
    var {
      legend = '',
    } = this.model

    // fieldset.legend = legend
  }

  oncreate_element(form) {
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('fieldset', FieldSet);
