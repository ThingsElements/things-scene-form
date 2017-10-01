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
  }, {
    type: 'string',
    label: 'authorization',
    name: 'authorization',
    property: 'authorization'
  }, {
    type: 'string',
    label: 'accessor',
    name: 'accessor',
    property: 'accessor'
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
    } = this.model

    form.action = action
    form.method = method
    form.name = name
  }

  onload(e) {
    var result = JSON.parse(e.target.response)

    
    Object.keys(result).forEach(id => {
      console.log(id, result[id])
      this.data = 
      this.root.variable(id, result[id])
    })
  }

  oncreate_element(form) {
    var _ = e => {
      e.preventDefault();

      var url = form.action;
      var xhr = new XMLHttpRequest();
      
      xhr.withCredentials = true;

      var params = [].filter.call(form.elements, function (el) {
        return typeof(el.checked) === 'undefined' || el.checked;
      })
      .filter(function (el) { return !!el.name; })
      .filter(function (el) { return !el.disabled; })
      .map(function (el) {
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
      }).join('&');

      if(form.method == 'get')
        xhr.open(form.method, url + '?' + params);
      else
        xhr.open(form.method, url);
      
      xhr.setRequestHeader("Content-Type", ['x-form-urlencoded', 'json'].map(type => {
        return 'application/' + type
      }).join(';'));

      if(this.get('authorization'))
        xhr.setRequestHeader('Authorization', this.get('authorization'));

      xhr.onloadend = this.onload.bind(this)
      
      if(form.method == 'get')
        xhr.send();
      else
        xhr.send(params);
    }

    form.addEventListener('submit', _)
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('form', Form);
