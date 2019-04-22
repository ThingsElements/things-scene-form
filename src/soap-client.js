/*
 * Copyright � HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'action',
      name: 'action'
    },
    {
      type: 'string',
      label: 'soap-method',
      name: 'soapMethod'
    },
    {
      type: 'number',
      label: 'period',
      name: 'period'
    },
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'string',
      label: 'authorization',
      name: 'authorization'
    },
    {
      type: 'checkbox',
      label: 'with-credentials',
      name: 'withCredentials'
    },
    {
      type: 'checkbox',
      label: 'submit-on-load',
      name: 'submitOnLoad'
    },
    {
      type: 'checkbox',
      label: 'debug',
      name: 'debug'
    }
  ],
  'value-property': 'action'
}

import { Component, HTMLOverlayContainer } from '@hatiolab/things-scene'
import { xml2js } from 'xml-js'

export default class SoapClient extends HTMLOverlayContainer {
  dispose() {
    super.dispose()
    this._stopRepeater()
  }

  get tagName() {
    return 'form'
  }

  setElementProperties(client) {
    var { action = '', name = '', soapMethod } = this.state

    client.action = action
    client.soapMethod = soapMethod
    client.name = name
  }

  get action() {
    return this.state.action
  }

  set action(action) {
    this.setState('action', action)
    this._startRepeater()
  }

  get period() {
    return this.state.period * 1000
  }

  set period(period) {
    this.setState('period', period)
    this._startRepeater()
  }

  _startRepeater() {
    this._stopRepeater()

    if (!this.app.isViewMode) return

    if (this.period) {
      this._repeatInterval = setInterval(this._submit.bind(this), this.period)
    }
  }

  _stopRepeater() {
    if (this._repeatInterval) clearInterval(this._repeatInterval)
  }

  _onload(e) {
    var result = e.target.response
    try {
      result = xml2js(result, {
        compact: true
      })

      if(this.state.debug) {
        console.log('[SOAP-RESULT]', result)
      }
      
      this.setState('data', result)
    } catch (e) {
      console.error(e)
    }
  }

  oncreate_element(client) {
    if (!this.app.isViewMode) return

    var _ = e => {
      e.preventDefault()

      var action = client.action
      var soapMethod = client.soapMethod

      var xhr = new XMLHttpRequest()

      var params = [].filter
        .call(client.elements, el => {
          if (el.type == 'radio' || el.type == 'checkbox') return el.checked
          return true
        })
        .filter(el => {
          return !!el.name
        })
        .filter(el => {
          return !el.disabled
        })
        .map(el => {
          return `<${el.name}>${el.value}</${el.name}>`
        }).join('\n')

      xhr.onloadend = this._onload.bind(this)

      xhr.open('POST', action)

      xhr.setRequestHeader('Content-Type', 'text/xml')
      xhr.setRequestHeader('SOAPAction', `${soapMethod}#Method`)

      if (this.get('authorization')) xhr.setRequestHeader('Authorization', this.get('authorization'))
      if (this.get('withCredentials')) xhr.withCredentials = true


      let soapEnvelope = `
<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>
  <s:Header/>
  <s:Body>
    <m:Method xmlns:m='${soapMethod}' />
    ${params}
  </s:Body>
</s:Envelope>
`
      console.log('soapEnvelope', soapEnvelope)
      xhr.send(soapEnvelope)

      return false
    }

    client.onsubmit = _

    if (this.getState('submitOnLoad')) {
      setTimeout(this._submit.bind(this), 100)
    }

    this._startRepeater()
  }

  _submit() {
    this.element.dispatchEvent(
      new Event('submit', {
        cancelable: true
      })
    )
  }

  get nature() {
    return NATURE
  }
}

Component.register('soap-client', SoapClient)
