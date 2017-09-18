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
    backgroundColor
  } = component.model;

  var {
    left,
    top,
    width,
    height
  } = component.bounds

  // element의 기본 속성을 설정한다.
  var element = component.element;

  var border_x = 3;
  var border_y = 3;
  
  element.style.fontFamily = fontFamily
  element.style.fontSize = fontSize + 'px';
  element.style.position = 'absolute';
  element.style.left = left + 'px';
  element.style.top = top + 'px';
  element.style.width = (width - border_x * 2) + 'px';
  element.style.height = (height - border_y * 2) + 'px';
  element.style.outline = 'none';
  // element.style.margin = '0px';
  // element.style.border = 0;
  element.style.backgroundColor = backgroundColor;
  element.style.display = 'inline-block';

  element.style.color = fontColor;

  if(bold)
    element.style.fontWeight = 'bold';
  if(italic)
    element.style.fontStyle = 'italic';

  switch(textAlign) {
    case 'right':
    case 'end':
      element.style.textAlign = 'right';
      break;

    case 'justify':
    case 'left':
    case 'start':
      element.style.textAlign = 'left';
      break;

    case 'center':
    default:
      element.style.textAlign = 'center';
      break;
  }

  var transform = `rotate(${rotation}rad) scale(${scale.x}, ${scale.y})`;
  
  ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(prefix => {
    element.style[prefix + 'transform'] = transform;
  })
}