define(['jquery', 'backbone', 'chrome', 'apps/intnews/js/NewsCollection.js', 'text!apps/intnews/templates/intnews-tpl.html'], function ($, Backbone, Chrome, NewsCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
  var aid = null;
    
  var View = Backbone.View.extend({
    collection:NewsCollection,
    aid:null,
    initialize: function(info) {       
      _.bindAll(this, 'render');
      this.aid = info.aid;
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }
    },

    template: _.template(Templates.find('#newsArticleTemplate').html()),

    render: function() {
      var article = this.collection.article(this.aid);
      if(article) {
        var html = this.template({ article: article.toJSON() });
        Chrome.showPage( Chrome.parseHTML(html) );
      }
    }

  });
  
  return View;
});
