define(['jquery', 'backbone', 'chrome', 'text!apps/about/templates/about-tpl.html'], function ($, Backbone, Chrome, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
    
  var View = Backbone.View.extend({
    initialize: function() {       
      _.bindAll(this, 'render');
    },

    template: _.template(Templates.find('#infoPageTemplate').html()),

    render: function() {
      var html = this.template();
      Chrome.showPage( Chrome.parseHTML(html) );
    }
  });
  
  return View;
});