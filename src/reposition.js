/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

var { DEFAULT } = scene

function scaleAndRotationToTop(component) {
  var rotation = 0, scale = 1;
  var parent = component;

  while (parent) {
    rotation += parent.get('rotation') || 0;
    let { x, y } = parent.get('scale') || { x: 1, y: 1 };
    scale *= Math.max(x, y) || 1;

    parent = parent.parent
  }

  return { rotation, scale };
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

    fontSize = DEFAULT.FONT_SIZE
  } = component.model;

  var {
    left,
    top,
    width,
    height
  } = component.bounds

  // 1. 캔바스 위에서의 에디터 위치를 가져온다.
  var point = component.transcoordS2C(left, top);

  // 2. 캔바스 기준으로 컴포넌트의 스케일과 회전각을 구한다.
  var { rotation, scale } = scaleAndRotationToTop(component);

  // 3. document element들도 스케일이 적용될 수 있도록, 각 값이 스케일을 곱한다.
  fontSize *= scale;
  left *= scale;
  top *= scale;
  width *= scale;
  height *= scale;

  paddingTop *= scale;
  paddingBottom *= scale;
  paddingLeft *= scale;
  paddingRight *= scale;

  var inputWidth = width - paddingLeft - paddingRight;
  var spanWidth = inputWidth;
  var spanHeight = height - paddingTop - paddingBottom;

  // 4. 컴포넌트의 위치와 패딩 정보를 span에 반영한다.
  var span = component._span;

  span.style.position = 'absolute';
  span.style.width = spanWidth + 'px';
  span.style.marginLeft = point.x + Math.min(paddingLeft, 0) + 'px';
  span.style.marginTop = point.y + Math.min(paddingTop, 0) + 'px';
  span.style.height = spanHeight + 'px';
  span.style.paddingLeft = Math.max(paddingLeft, 0) + 'px';
  span.style.paddingRight = paddingRight + 'px';
  span.style.paddingTop = Math.max(paddingTop, 0) + 'px';
  span.style.paddingBottom = paddingBottom + 'px';

  // 5. input의 기본 속성을 설정한다.
  var input = component._input;
  var gap = 14; // margin * 2 + 6

  input.style.fontFamily = fontFamily
  input.style.fontSize = fontSize + 'px';
  input.style.position = 'relative';
  input.style.lineHeight = (height - gap) + 'px';
  input.style.overflow = 'hidden';
  input.style.margin = '4px';
  // input.style.resize = 'horizontal';
  input.style.outline = 'none';
  // input.style.outline = 'dotted'; // For debugging
  // input.style.border = 0;
  // input.style.backgroundColor = 'transparent';
  // input.style.backgroundColor = '#999222'; // For debugging
  input.style.display = 'inline-block';

  input.style.color = fontColor;

  input.style.width = (inputWidth - gap) + 'px';

  if (bold)
    input.style.fontWeight = 'bold';
  if (italic)
    input.style.fontStyle = 'italic';

  switch (textAlign) {
    case 'right':
    case 'end':
      input.style.textAlign = 'right';
      break;

    case 'justify':
    case 'left':
    case 'start':
      input.style.textAlign = 'left';
      break;

    case 'center':
    default:
      input.style.textAlign = 'center';
      break;
  }

  var rotate = `rotate(${rotation}rad)`;
  ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(prefix => {
    span.style[prefix + 'transform'] = rotate;
    span.style[prefix + 'transform-origin'] = '0 0';
  })
}