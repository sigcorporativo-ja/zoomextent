/**
 * @module M/control/ZoomExtentControl
 */

import ZoomExtentImplControl from '../../impl/ol/js/zoomextentcontrol';
import template from '../../templates/zoomextent';
import { getValue } from './i18n/language';

export default class ZoomExtentControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api
   */
  constructor() {
    if (M.utils.isUndefined(ZoomExtentImplControl)) {
      M.exception(getValue('exception.impl'));
    }
    const impl = new ZoomExtentImplControl();
    super(impl, 'ZoomExtent');
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api
   */
  createView(map) {
    return new Promise((success, fail) => {
      const html = M.template.compileSync(template, {
        vars: {
          translations: {
            tooltip: getValue('tooltip'),
          },
        },
      });
      success(html);
    });
  }

  /**
   * This function is called on the control activation
   *
   * @public
   * @function
   * @api
   */
  activate() {
    super.activate();
    this.getImpl().activateClick(this.map_);
    document.body.style.cursor = 'crosshair';
    document.querySelector('.g-cartografia-zoom-extension').classList.add('active');
  }
  /**
   * This function is called on the control deactivation
   *
   * @public
   * @function
   * @api
   */
  deactivate() {
    super.deactivate();
    this.getImpl().deactivateClick(this.map_);
    document.body.style.cursor = 'auto';
    document.querySelector('.g-cartografia-zoom-extension').classList.remove('active');
  }

  /**
   * This function gets activation button
   *
   * @public
   * @function
   * @param {HTML} html of control
   * @api
   */
  getActivationButton(html) {
    return html.querySelector('.m-zoomextent button');
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api
   */
  equals(control) {
    return control instanceof ZoomExtentControl;
  }
}
