/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [],
  'value-property': 'value'
}

import { Component, HTMLOverlayContainer, warn } from '@hatiolab/things-scene'
export default class RadioGroup extends HTMLOverlayContainer {
  get nature() {
    return NATURE
  }

  setElementProperties(element) {
    element.onchange = () => {
      this.changeChecked(element)
    }
  }

  changeChecked(element) {
    if (this.element.querySelector('input') && this.element.querySelector('input').type == 'radio') {
      var allRadioList = this.element.querySelectorAll('input')
      var specificList = Array.prototype.slice.call(allRadioList).filter(e => e.name == this.element.id)
      if (specificList.length) {
        var checkedValue = specificList.filter(e => e.checked == true)
        this.set('data', checkedValue[0].value)
      }
    }
  }
}

Component.register('radio-group', RadioGroup)
