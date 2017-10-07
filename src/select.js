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
  }, {
    type: 'number',
    label: 'size',
    name: 'size',
    property: 'size'
  }, {
    type: 'string',
    label: 'name',
    name: 'name',
    property: 'name'
  }, {
    type: 'options',
    label: 'options',
    name: 'options',
    property: 'options'
  }]
}

var { HTMLOverlayElement } = scene

export default class Select extends HTMLOverlayElement {

  get nature() {
    return NATURE;
  }

  buildOptions() {
    var {
      options = []
    } = this.model

    if(!options instanceof Array)
      options = []
      
    this.element.textContent = ''

    options = options.map(option => {
      return typeof(option) == 'string' ?
        {value: option, text: option}
        : option
    })

    options.forEach(option => {
      var el = document.createElement('option')
      el.value = option.value
      el.text = option.text
      this.element.appendChild(el)
    })
  }

  createElement() {
    super.createElement();

    this.buildOptions()

    this.element.value = this.get('value') || ''
    this.element.onchange = e => {
      this.set('value', this.element.value);
    }
  }

  setElementProperties(element) {
    var {
      size,
      name
    } = this.model

    element.size = size
    element.name = name
  }

  onchange(after, before) {
    super.onchange(after, before)

    if(after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
    }

    if(after.hasOwnProperty('options'))
      this.buildOptions()
  }
}

scene.Component.register('select', Select);
