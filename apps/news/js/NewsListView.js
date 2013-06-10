define(['jquery', 'backbone', 'chrome', 'apps/news/js/NewsCollection.js', 'text!apps/news/templates/news-tpl.html'], function ($, Backbone, Chrome, NewsCollection, Templates) {
  'use strict';
  
  // Page templates for this app
  Templates = $('<div>').html(Templates);
  
  // Backbone view
  var View = Backbone.View.extend({
    // Defining the collection (Singelton in this case)
    collection:NewsCollection,
    
    // Constructor
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
    
    // Define the template
    template: _.template(Templates.find('#newsListTemplate').html()),
    
    // Render list of articles
    render: function() {
      var latest = this.collection.latest(20);
      if(latest.length > 0) {
        var html = this.template({articles: latest.toJSON()});
        Chrome.showPage( Chrome.parseHTML(html) );
      }
    }
  });
  
  return View;
});  