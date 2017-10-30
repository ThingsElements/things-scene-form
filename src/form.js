/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'select',
    label: 'method',
    name: 'method',
    property: {
      options: [{
        display: 'GET',
        value: 'GET'
      }, {
        display: 'POST',
        value: 'POST'
      }]
    }
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
  }, {
    type: 'select',
    label: 'format',
    name: 'format',
    property: {
      options: [{
        display: 'JSON',
        value: 'JSON'
      }, {
        display: 'TEXT',
        value: 'TEXT'
      }]
    }
  }, {
    type: 'checkbox',
    label: 'with-credentials',
    name: 'withCredentials',
    property: 'withCredentials'
  }, {
    type: 'checkbox',
    label: 'submit-on-load',
    name: 'submitOnLoad',
    property: 'submitOnLoad'
  }],
  'value-property': 'action'
}

var { HTMLOverlayContainer } = scene

export default class Form extends HTMLOverlayContainer {

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

  get action() {
    return this.get('action')
  }

  set action(action) {
    this.set('action', action)
  }

  _onload(e) {
    var result = e.target.response
    try {
      this.data = this.get('format') == 'JSON' ?
      JSON.parse(result) : result
    } catch(e) {
      console.error(e)
    }
  }

  oncreate_element(form) {
    if(!this.app.isViewMode)
      return

    var _ = e => {

      var url = form.action;
      var xhr = new XMLHttpRequest();

      var params = [].filter.call(form.elements, function (el) {
        if(el.type == 'radio' || el.type == 'checkbox')
          return el.checked;
        return true
      })
      .filter(function (el) { return !!el.name; })
      .filter(function (el) { return !el.disabled; })
      .map(function (el) {
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
      }).join('&');

      xhr.onloadend = this._onload.bind(this)

      if(form.method == 'get')
        xhr.open(form.method, url + '?' + params);
      else
        xhr.open(form.method, url);

      xhr.setRequestHeader("Content-Type", ['x-www-form-urlencoded' , 'json'].map(type => {
        return 'application/' + type
      }).concat('text/plain').join(';'));

      if(this.get('authorization'))
        xhr.setRequestHeader('Authorization', this.get('authorization'));

      if(this.get('withCredentials'))
        xhr.withCredentials = true;

      if(form.method == 'get')
        xhr.send();
      else
        xhr.send(params);

      e.preventDefault();

      return false;
    }

    form.onsubmit = _

    if(this.get('submitOnLoad')) {
      setTimeout(() => form.dispatchEvent(new Event('submit')), 100)
    }
  }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('form', Form);
