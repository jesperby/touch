define(['jquery', 'backbone'], function ($, Backbone) {
  'use strict';

  function adaptImageSize(url) {
    return url.replace('width=35&height=35', 'width=80&height=80');
  }

  var Feed = Backbone.Collection.extend({
    loaded: false,
    catid: null,
    model: Backbone.Model.extend({
      defaults: {
        title: null,
        url: null,
        imgurl: null,
        location: null
      }
    }),
    
    url: function() {
      return 'http://webapps2.malmo.se/evenemang/EventGuide'+(this.page>1? '/Page/'+this.page : '');
    },
  


    fetch: function(options) {
      options || (options = {});
      this.catid = options.data.searchCategory;

      return Backbone.Collection.prototype.fetch.call(this, options);
    },

    moreResultsAvailable: false,
    
    page: 1,
    
    parse: function(response) {
      var events = [], $item, imgurl;
      var that = this;

      if($(response).find('#events-more-results').length > 0) {
        this.moreResultsAvailable = true;        
      } else {
        this.moreResultsAvailable = false;
      }

        $(response).find('li a').each(function(index, item){
        $item = $(item);
        events.push({
          title: $item.find('h2').text(),
          url: '#events/event/'+that.catid+"/"+$item.attr('data-proxy-url').split('/View/').pop(),
          imgurl: adaptImageSize($item.find('img').attr('src')),
          location: $item.find('p').text()
        });
      });
      
      this.loaded = true;
      return events;
    },

    sync: function(method, model, options){  
      options.dataType = "text";
      return Backbone.sync(method, model, options);  
    }
  });


  return Feed;
});
