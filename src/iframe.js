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
  }]
}

var { HTMLOverlayContainer } = scene

export default class IFrame extends HTMLOverlayContainer {

  setElementProperties(iframe) {
    var {
      src = ''
    } = this.model

    iframe.src = src
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('iframe', IFrame);
