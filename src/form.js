/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
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

  setElementProperties(form) {
    var {
      action = '',
      method = 'POST',
      name = ''
    } = this.model.htmlConfig

    form.action = action
    form.method = method
    form.name = name
  }

  onload(e) {
    console.log(e.target.response)
  }

  oncreate_element(form) {
    var _ = e => {
      e.preventDefault();

      var url = form.action;
      var xhr = new XMLHttpRequest();
      
      xhr.withCredentials = true;

      var params = [].filter.call(form.elements, function (el) {
        return true;
        // return typeof(el.checked) === 'undefined' || el.checked;
      })
      .filter(function (el) { return !!el.name; }) //Nameless elements die.
      .filter(function (el) { return !el.disabled; }) //Disabled elements die.
      .map(function (el) {
        //Map each field into a name=value string, make sure to properly escape!
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
      }).join('&'); //Then join all the strings by &

      xhr.open(form.method, url);

      var contentTypes = ['x-form-urlencoded', 'json'].map(type => {
        return 'application/' + type
      }).join(';')
      xhr.setRequestHeader("Content-type", contentTypes);

      xhr.onloadend = this.onload.bind(this)
      xhr.send(params);
    }

    ['submit'].forEach(e => {
      form.addEventListener(e, _)
    })
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('form', Form);
