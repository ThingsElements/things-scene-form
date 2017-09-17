/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

var { DEFAULT } = scene

function scaleAndRotationToTop(component) {
  var rotation = 0, scale_x = 1, scale_y = 1;
  var parent = component;

  while (parent) {
    rotation += parent.get('rotation') || 0;
    let { x, y } = parent.get('scale') || { x: 1, y: 1 };
    scale_x *= x || 1;
    scale_y *= y || 1;

    parent = parent.parent
  }

  return { rotation, scale_x, scale_y };
}

export default function reposition(component) {
  var {
    rotation = 0,
    bold = DEFAULT.BOLD,
    italic = DEFAULT.ITALIC,
    textWrap = DEFAULT.TEXT_WRAP,

    fontFamily = DEFAULT.FONT_FAMILY,
    fontColor = DEFAULT.FONT_COLOR,

    textAlign = DEFAULT.TEXT_ALIGN,
    textBaseline = DEFAULT.TEXT_BASELINE,

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

  // 1. 캔바스 위에서의 에디터 위치를 가져온다.
  var point = component.transcoordS2C(left, top, component.parent);

  // 2. 캔바스 기준으로 컴포넌트의 스케일과 회전각을 구한다.
  var { rotation, scale_x, scale_y } = scaleAndRotationToTop(component);

  // 3. document element들도 스케일이 적용될 수 있도록, 각 값이 스케일을 곱한다.
  fontSize *= Math.min(scale_x, scale_y);
  left *= scale_x;
  top *= scale_y;
  width *= scale_x;
  height *= scale_y;

  paddingTop *= scale_y;
  paddingBottom *= scale_y;
  paddingLeft *= scale_x;
  paddingRight *= scale_x;

  var elementWidth = width - paddingLeft - paddingRight;
  var elementHeight = height - paddingTop - paddingBottom;

  // 4. element의 기본 속성을 설정한다.
  var element = component._element;
  var gap = 4; // margin * 2 + 4, 4 means border width * 2

  element.style.fontFamily = fontFamily
  element.style.fontSize = fontSize + 'px';
  element.style.position = 'absolute';
  element.style.left = point.x + paddingLeft + 'px';
  element.style.top = point.y + paddingTop + 'px';
  element.style.width = elementWidth + 'px';
  element.style.height = (elementHeight - gap) + 'px';
  element.style.outline = 'none';
  // element.style.margin = '0px';
  // element.style.border = 0;
  element.style.backgroundColor = backgroundColor;
  element.style.display = 'inline-block';

  element.style.color = fontColor;

  element.style.width = (elementWidth - gap) + 'px';

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

  var rotate = `rotate(${rotation}rad)`;
  ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(prefix => {
    element.style[prefix + 'transform'] = rotate;
    element.style[prefix + 'transform-origin'] = '0 0';
  })
}