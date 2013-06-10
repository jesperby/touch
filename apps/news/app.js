define(['jquery', 'chrome', 'backbone', 'text!apps/news/templates/news-tpl.html', 'ga', 'jqm'], function ($, Chrome, Backbone, Templates, GA ) {
  'use strict';
  var fname = 'malmo-se-main'; 
  // Page templates for this app
  Templates = $('<div>').html(Templates);        
  
  // Path to this module
  var modulepath = null;
  
  // Entry point of the app
  function init(p) {
    modulepath = p;
    Chrome.loadCss([modulepath+'/css/news.css']);
  }
  
  // Handle route request, show article list
  function showArticleList() {
    $.mobile.loading('show');
    GA.pageView('ToC '+fname);  
    require(['apps/news/js/NewsListView'], function (NewsListView) {
      new NewsListView();
    });
  }

  // Handle route request, show single article
  function showArticle(aid){
    $.mobile.loading('show');
    require(['apps/news/js/NewsCollection'], function(NewsCollection) {
      if(!NewsCollection.loaded) {
        NewsCollection.fetch().success(function(){;
          GA.pageView(NewsCollection.get(aid).get("link"));      
        });
      };
    });

    require(['apps/news/js/NewsArticleView'], function (NewsArticleView) {
      new NewsArticleView({"aid":aid});
    });    
  }
  
  // Define routes for Backbone
  var router = {
    routes: {
      'news/article/:aid'   : 'showArticle',
      'news'                : 'showArticleList'      
    },
    showArticleList: showArticleList,    
    showArticle: showArticle
  }
  
  return {
    router:router,
    init:init
  };
});
