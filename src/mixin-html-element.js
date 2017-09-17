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
    setElementProperties() {
      throw new Error('Not Implemented Yet')    
    }
  
    // Overidable
    createElement() {
      this._element = document.createElement(this.tag)
      if(!this._element)
        return;
  
      this.setElementProperties();
      
      reposition(this);
  
      if(this.parent.isHTMLElement && this.parent.isHTMLElement())
        this.parent.element.appendChild(this._element)
      else
        this.root.model_layer.overlay.appendChild(this._element);
    }
  
    // Overidable
    disposeElement() {
      this._element && this._element.parentElement && this._element.parentElement.removeChild(element);
      delete this._element
    }
  
    ready() {
      !this._element && this.createElement();
    }
  
    added() {
      if(!this._element) {
        return
        // this.createElement()
        // return
      }
  
      if(this.parent.isHTMLElement && this.parent.isHTMLElement())
        this.parent.element.appendChild(this._element)
      else
        this.root.model_layer.overlay.appendChild(this._element);
    }
  
    _draw(ctx) {
      reposition(this);
    }
  
    dispose() {
      disposeElement(this);
      super.dispose()
    }
  
    get hasTextProperty() {
      return false
    }
  
    onchange(after, before) {
      // reposition(this);
      if (after.hasOwnProperty('htmlConfig') && this._element) {
        this.setElementProperties()
      }
    }
  }

  return A
}
