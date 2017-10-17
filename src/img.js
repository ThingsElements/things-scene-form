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

var { HTMLOverlayElement } = scene

export default class Img extends HTMLOverlayElement {

  get value() {
    this.get('src')
  }

  set value(v) {
    this.set('src', v)
  }

  setElementProperties(img) {
    var {
      src = ''
    } = this.model

    if(img.src != src)
      img.src = src
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('img', Img);
