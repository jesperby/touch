define(['jquery', 'backbone', 'chrome', 'apps/poi/js/PoiTypeCollection', 'text!apps/poi/templates/poi-tpl.html'], function ($, Backbone, Chrome, PoiTypeCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
    
  var View = Backbone.View.extend({
    collection: PoiTypeCollection,
    initialize: function() {
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }
    },

    template: _.template(Templates.find('#poiTypesTemplate').html()),

    render: function() {
      var html = this.template({types: this.collection.toJSON()});
      Chrome.showPage( Chrome.parseHTML(html) );
    }
  });
  
  return View;
});
