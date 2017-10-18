/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'href',
    name: 'href',
    property: 'href'
  }]
}

var { HTMLOverlayContainer } = scene

export default class Link extends HTMLOverlayContainer {

  get value() {
    this.get('href')
  }

  set value(v) {
    this.set('href', v)
  }

  setElementProperties(link) {
    var {
      href = ''
    } = this.model

    if(link.href != href)
      link.href = href

    if(this.components.length == 0)
      this.element.textContent = this.text || href
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('link', Link);
