define(['jquery', 'backbone', 'chrome', 'apps/jobs/js/JobCollection.js', 'text!apps/jobs/templates/jobs-tpl.html'], function ($, Backbone, Chrome, JobCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
  
  var View = Backbone.View.extend({
    collection:JobCollection,

    initialize: function() {
      _.bindAll(this, 'render');
      this.collection.on('reset', this.render);
    },

    template: _.template(Templates.find('#listTemplate').html()),

    render: function() {
      if(this.collection.length > 0) {
        var html = this.template({articles: this.collection.toJSON()});
        Chrome.showPage( Chrome.parseHTML(html) );
      }
    }
  });
  
  return View;
});  