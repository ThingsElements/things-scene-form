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
    name: 'value'
  }, {
    type: 'number',
    label: 'size',
    name: 'size'
  }, {
    type: 'string',
    label: 'name',
    name: 'name'
  }, {
    type: 'checkbox',
    label: 'submit-on-change',
    name: 'submitOnChange'
  }, {
    type: 'checkbox',
    label: 'copy-value-to-data',
    name: 'copyValueToData'
  }, {
    type: 'options',
    label: 'options',
    name: 'options'
  }],
  'value-property': 'value'
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene';

export default class Select extends HTMLOverlayElement {

  get nature() {
    return NATURE;
  }

  buildOptions() {
    var {
      options = []
    } = this.state

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

    var element = this.element

    element.value = this.get('value') || ''

    element.onchange = e => {
      this.set('value', element.value);
      if(this.get('submitOnChange') && element.form)
        element.form.dispatchEvent(new Event('submit'));
    }
  }

  setElementProperties(element) {
    var {
      size,
      name
    } = this.state

    element.size = size
    element.name = name
  }

  onchange(after, before) {
    super.onchange(after, before)

    if(after.hasOwnProperty('value') && this.element) {
      this.element.value = after.value;
      if(this.get('copyValueToData'))
        this.data = after.value
      if(this.get('submitOnChange') && this.element.form)
        this.element.form.dispatchEvent(new Event('submit'));
    }

    if(after.hasOwnProperty('options'))
      this.buildOptions()
  }

  get options() {
    return this.getState('options');
  }

  set options(options) {
    this.setState('options', options);
  }
}

Component.register('select', Select);
