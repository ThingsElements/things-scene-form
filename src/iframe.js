/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'src',
    name: 'src',
    property: 'src'
  }],
  'value-property': 'src'
}

var { HTMLOverlayElement } = scene

export default class IFrame extends HTMLOverlayElement {

  setElementProperties(iframe) {
    var {
      src = ''
    } = this.state

    if(iframe.src != src)
      iframe.src = src
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('iframe', IFrame);
