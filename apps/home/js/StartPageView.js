define(['jquery', 'backbone', 'chrome', 'text!apps/home/templates/home-tpl.html', 'json!available-apps.php'], function ($, Backbone, Chrome, Templates, AvailableApps) {
  'use strict';
  Templates = $('<div>').html(Templates);
    
  var View = Backbone.View.extend({
    el: $('body'),

    initialize: function() {       
      _.bindAll(this, 'render');
    },

    template: _.template(Templates.find('#startPageTemplate').html()),

    setArticleId: function(id) {
      aid = id;
      return this;
    },

    render: function() {
      var html = this.template({apps: AvailableApps});
      Chrome.showPage( Chrome.parseHTML(html) );
    }
  });
  
  return View;
});