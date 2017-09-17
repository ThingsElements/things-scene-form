/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import MixinHTMLElement from './mixin-html-element'

var { Component, RectPath } = scene

export default class HTMLElement extends MixinHTMLElement(RectPath(Component)) {}
