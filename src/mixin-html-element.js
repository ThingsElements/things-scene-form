/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import reposition from './reposition'

/**
 * Mixin HTMLElement
 */
export default (superclass) => {
  var A = class extends superclass {
    isHTMLElement() {
      return true
    }
  
    get element() {
      return this._element
    }
  
    // Overidable
    get tag() {
      return this.get('type')
    }
  
    // Overidable
    setElementProperties(element) {
      throw new Error('Not Implemented Yet')    
    }
  
    // Overidable
    createElement() {
      this._element = document.createElement(this.tag)
      if(!this._element)
        return;
  
      this.setElementProperties(this._element);
      
      if(this.parent.isHTMLElement && this.parent.isHTMLElement())
        this.parent.element.appendChild(this._element)
      else
        this.root.model_layer.overlay.appendChild(this._element);

      reposition(this);

      this.oncreate_element && this.oncreate_element(this._element)
    }
  
    // Overidable
    disposeElement() {
      var element = this._element
      element && element.parentElement && element.parentElement.removeChild(element);
      delete this._element
    }
  
    ready() {
      !this._element && this.createElement();
    }
  
    added() {
      if(!this._element) {
        return
      }
  
      if(this.parent.isHTMLElement && this.parent.isHTMLElement())
        this.parent.element.appendChild(this._element)
      else
        this.root.model_layer.overlay.appendChild(this._element);

      reposition(this);
    }
  
    dispose() {
      this.disposeElement(this);
      super.dispose()
    }
  
    get hasTextProperty() {
      return false
    }
  
    onchange(after, before) {
      if(after.hasOwnProperty('htmlConfig') && this._element) {
        this.setElementProperties()
      }

      reposition(this);
    }
  }

  return A
}
