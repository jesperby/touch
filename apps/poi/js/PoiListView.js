define(['jquery', 'backbone', 'chrome', 'apps/poi/js/PoiCollection', 'apps/poi/js/PoiTypeCollection', 'text!apps/poi/templates/poi-tpl.html'], function ($, Backbone, Chrome, PoiCollection, PoiTypeCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);

  var View = Backbone.View.extend({
    collection: PoiCollection,
    typeid: null,
    initialize: function(info) {
      this.typeid = info.typeid || null;
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }
    },

    template: _.template(Templates.find('#poiListTemplate').html()),

    render: function() {
      var filteredPois = this.typeid === null ? this.collection : this.collection.filterByType( this.typeid );
      var html = this.template({pois: filteredPois.toJSON(), types:PoiTypeCollection, typeid: this.typeid});
      //Chrome.showPage($(html));
      Chrome.showPage( Chrome.parseHTML(html) );
    }
  });
  
  return View;
});
