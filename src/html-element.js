/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import MixinHTMLElement from './mixin-html-element'
import reposition from './reposition'

var { Component, RectPath } = scene

export default class HTMLElement extends MixinHTMLElement(RectPath(Component)) {
      
    _draw(ctx) {
        reposition(this);
    }
}
