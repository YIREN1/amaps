/**
 * A module defining `AmapsWidget`.
 *
 * @module nmodule/amaps/rc/AmapsWidget
 */
define([
  'baja!',
  'baja!baja:IStatus',
  'bajaux/Widget',
  'nmodule/webEditors/rc/fe/baja/BaseEditor',
  'bajaux/mixin/subscriberMixIn',
  'jquery',
  'Promise',
  'hbs!nmodule/amaps/rc/AmapsWidgetTemplate',
  'css!nmodule/amaps/rc/amaps',
], function (baja, types, Widget, BaseEditor, subscriberMixin, $, Promise, AmapsWidgetTemplate) {
  ('use strict');

  var SELECTED_CLASS = 'active',
    BUTTON_CLASS = 'AmapsWidget-button';

  /**
   * A demonstration Widget. This builds a list of buttons from the slots of a
   * Complex value, allowing the user to select a slot.
   *
   * @class
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   * @alias module:nmodule/amaps/rc/AmapsWidget
   */
  var AmapsWidget = function AmapsWidget() {
    /** remember to call super constructor. Javascript won't do this for you */
    var that = this;

    BaseEditor.apply(this, arguments);
    that
      .properties()
      .add('ak', 'your-key')
      .add('position', '116.404,39.915');
    subscriberMixin(this);
  };

  //extend and set up prototype chain
  AmapsWidget.prototype = Object.create(BaseEditor.prototype);
  AmapsWidget.prototype.constructor = AmapsWidget;

  /**
   * Decode and return the longitude and latitude from a String in the form of
   * '116.404,39.915',
   *
   * @private
   * @inner
   *
   * @param {String} data The data to decode.
   * @returns {Object} An object that contains a lng and lat property.
   */
  function decodeLatLong(data) {
    var position = data.split(',');
    return {
      lng: parseFloat(position.length > 1 ? position[0].trim() : 0),
      lat: parseFloat(position.length > 1 ? position[1].trim() : 0),
    };
  }

  /**
   * Do initial setup of the DOM for the widget. This will set up the DOM's
   * structure and create a space where the buttons will go.
   *
   * @param {jQuery} element the DOM element into which to load this widget
   */
  AmapsWidget.prototype.doInitialize = function (dom) {
    var that = this;
    console.log('AmapsWidget initializing');

    dom.html(AmapsWidgetTemplate({}));
    let loaderAPI = 'https://webapi.amap.com/loader.js';
    let AmapsAPI = `https://webapi.amap.com/maps?v=2.0&key=${that.properties().getValue('ak')}`;

    return new Promise(function (resolve, reject) {
      // wait for Baidu Map API to load inside the page
      require([AmapsAPI], function (AMap) {
        console.log('loader loaded');
        var map = new AMap.Map('container', {
          zoom: 15,
          center: [116.397428, 39.90923],
        });
        // console.log(map);
        // AMapLoader.load({
        //   key: that.properties().getValue('ak'), // 申请好的Web端开发者Key，首次调用 load 时必填
        //   version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        //   plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        //   AMapUI: {
        //     // 是否加载 AMapUI，缺省不加载
        //     version: '1.1', // AMapUI 缺省 1.1
        //     plugins: ['overlay/SimpleMarker'], // 需要加载的 AMapUI ui插件
        //   },
        //   Loca: {
        //     // 是否加载 Loca， 缺省不加载
        //     version: '1.3.2', // Loca 版本，缺省 1.3.2
        //   },
        // })
        //   .then((AMap) => {
        //     console.log('api loaded');
        //     var map = new AMap.Map('container');
        //     map.addControl(new AMap.Scale());
        //     new AMapUI.SimpleMarker({
        //       map: map,
        //       position: map.getCenter(),
        //     });
        //   })
        //   .catch((e) => {
        //     console.error(e); //加载错误提示
        //   });
      });
    });
  };

  /**
   * Loads in a Complex value and builds up an array of buttons, one for each
   * slot.
   *
   * @param {baja.Complex} value the complex value whose slots you wish to
   * select from
   */
  AmapsWidget.prototype.doLoad = function (value) {
    var that = this;
  };

  return AmapsWidget;
});
