/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

var { DEFAULT } = scene

function scaleAndRotationToTop(component) {
  var rotation = 0, scale_x = 1, scale_y = 1;
  var parent = component;

  while(parent) {
    rotation += parent.get('rotation') || 0;
    let { x, y } = parent.get('scale') || { x: 1, y: 1 };
    scale_x *= x || 1;
    scale_y *= y || 1;

    parent = parent.parent
  }

  return { rotation, scale_x, scale_y };
}

const SCALE_DEFAULT = {x: 1, y: 1}
const TRANSLATE_DEFAULT = {x: 0, y: 0}

export default function reposition(component) {
  var {
    rotation = 0,
    scale = SCALE_DEFAULT,
    translate = TRANSLATE_DEFAULT,

    bold = DEFAULT.BOLD,
    italic = DEFAULT.ITALIC,

    fontFamily = DEFAULT.FONT_FAMILY,
    fontColor = DEFAULT.FONT_COLOR,

    textAlign = DEFAULT.TEXT_ALIGN,

    paddingTop = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0,

    fontSize = DEFAULT.FONT_SIZE,
    fillStyle,
    lineWidth = 10,
    strokeStyle = '#999',
    lineDash = 'solid'
  } = component.model;

  var {
    left,
    top,
    width,
    height
  } = component.bounds

  // element의 기본 속성을 설정한다.
  var style = component.element.style;

  // var border_x = 3;
  // var border_y = 3;
  
  style.fontFamily = fontFamily
  style.fontSize = fontSize + 'px';
  style.position = 'absolute';
  style.left = left + 'px';
  style.top = top + 'px';
  style.width = (width - lineWidth * 2 - paddingLeft - paddingRight) + 'px';
  style.height = (height - lineWidth * 2 - paddingTop - paddingBottom) + 'px';
  style.outline = 'none';
  style.paddingTop = paddingTop + 'px';
  style.paddingRight = paddingRight + 'px';
  style.paddingBottom = paddingBottom + 'px';
  style.paddingLeft = paddingLeft + 'px';
  style.border = lineWidth + 'px';
  style.borderColor = strokeStyle;
  style.borderStyle = lineDash;
  // style.margin = '0px';
  // style.border = 0;
  style.backgroundColor = fillStyle;
  style.display = 'inline-block';

  style.color = fontColor;

  if(bold)
    style.fontWeight = 'bold';
  if(italic)
    style.fontStyle = 'italic';

  switch(textAlign) {
    case 'right':
    case 'end':
      style.textAlign = 'right';
      break;

    case 'justify':
      style.textAlign = 'justify';
      break;

    case 'left':
    case 'start':
      style.textAlign = 'left';
      break;

    case 'center':
    default:
      style.textAlign = 'center';
      break;
  }

  // var transform = `rotate(${rotation}rad) translate(-${pLineWidth}, -${pLineWidth}) scale(${scale.x}, ${scale.y})`;
  var transform = `rotate(${rotation}rad) scale(${scale.x}, ${scale.y})`;
  
  ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(prefix => {
    style[prefix + 'transform'] = transform;
  })
}