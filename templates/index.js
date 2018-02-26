
var inputs01 = ['text', 'password', 'email', 'search', 'number', 'color', 'range', 'file', 'date'].map(function (type) {
  return {
    type: 'input-' + type,
    model: {
      type: 'input-' + type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      paddingLeft: type == 'search' ? 0 : 7,
      paddingRight: type == 'search' ? 0 : 7,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)',
      lineWidth: type == 'file' ? 0 : 1,
      lineDash: 'solid',
      textAlign: 'left'
    }
  }
});

var inputs02 = ['submit', 'reset'].map(function (type) {
  return {
    type: 'input-' + type,
    model: {
      type: 'input-' + type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)'
    }
  }
});

var button = ['button'].map(function (type) {
  return {
    type: type,
    model: {
      type: type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      textAlign: 'center'
    }
  }
});

var textibles = ['input-radio', 'input-checkbox'].map(function (type) {
  return {
    type: type,
    model: {
      type: type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      text: 'noname',
      fontSize: 14,
      fontColor: '#585858',
      textAlign: 'left'
    }
  }
});

var fieldset = ['fieldset', 'iframe', 'img', 'link'].map(function (type) {
  return {
    type: type,
    model: {
      type: type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)',
      lineWidth: 1,
      lineDash: 'solid',
      textAlign: 'left'
    }
  }
});

var others = ['textarea', 'select'].map(function (type) {
  return {
    type: type,
    model: {
      type: type,
      top: 100,
      left: 100,
      width: 280,
      height: type == 'textarea' ? 60 : 40,
      paddingLeft: type == 'select' ? 0 : 7,
      paddingRight: type == 'select' ? 0 : 7,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)',
      lineWidth: 1,
      lineDash: 'solid',
      textAlign: 'left'
    }
  }
});

var form = [{
  type: 'form',
  model: {
    type: 'form',
    top: 100,
    left: 100,
    width: 400,
    height: 200,
    fontColor: '#585858',
    strokeStyle: '#ccc',
    lineWidth: 1,
    method: 'GET',
    action: '',
    name: 'search',
    authorization: '',
    format: 'TEXT'
  }
}];

export default form.concat(inputs01, inputs02, button, textibles, fieldset, others)
.map(template => {
  return {
    name: template.type,
    description: '..',
    icon: '..',
    group: 'form',
    template
  };
});
