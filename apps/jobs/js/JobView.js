define(['jquery', 'backbone', 'chrome', 'apps/jobs/js/JobCollection.js', 'text!apps/jobs/templates/jobs-tpl.html'], function ($, Backbone, Chrome, JobCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
  var aid = null;
    
  var View = Backbone.View.extend({
    collection:JobCollection,
    
    initialize: function() {       
      _.bindAll(this, 'render');
      this.collection.on('reset', this.render);
    },

    template: _.template(Templates.find('#itemTemplate').html()),

    setItemId: function(id) {
      aid = id;
      return this;
    },

    render: function() {
      var item = this.collection.article(aid);
      if(item) {
        var html = this.template({ item: item.toJSON() });
        Chrome.showPage( Chrome.parseHTML(html) );
      }
    }
  });
  
  return View;
});