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
    name: 'src'
  }, {
    type: 'checkbox',
    label: 'started',
    name: 'started'
  }],
  'value-property': 'src'
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene';

export default class Video extends HTMLOverlayElement {

  setElementProperties(video) {
    var {
      src = '',
      started
    } = this.state

    if(video.src != src)
      video.src = src

    if(started) {
      video.play();
    } else {
      video.pause();
    }
  }

  get src() {
    return this.getState('src')
  }

  set src(src) {
    this.setState('src', src)
  }

  get started() {
    return this.getState('started')
  }

  set started(started) {
    this.setState('started', started)
  }

  get nature() {
    return NATURE;
  }
}

Component.register('video', Video);
