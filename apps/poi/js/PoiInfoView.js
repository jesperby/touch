define(['jquery', 'backbone', 'chrome', 'apps/poi/js/PoiCollection', 'text!apps/poi/templates/poi-tpl.html'], function ($, Backbone, Chrome, PoiCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);

  var View = Backbone.View.extend({
    collection: PoiCollection,
    poiid: null,
    initialize: function(info) {
      this.poiid = info.poiid;
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }
    },

    template: _.template(Templates.find('#poiInfoTemplate').html()),

    render: function() {
      var details = this.collection.get(this.poiid);
      details.set('description', this.linkify(details.get('description')));      
      details.set('description', this.nl2br(details.get('description')));

      

      var html = this.template({poiinfo: details.toJSON()});
      Chrome.showPage( Chrome.parseHTML(html) );
    },
    
    nl2br: function(str) {
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2');
    },
    
    linkify: function(str) {  
      var patterns = {
        '<a href="$1">$1</a>': /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
        '$1<a href="http://$2">$2</a>': /(^|[^\/])(www\.[\S]+(\b|$))/gim,
        '<a href="mailto:$1">$1</a>': /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim
      };
      
      for(var pattern in patterns) {
        str = str.replace(patterns[pattern], pattern);
      }
      
      return str;
    }        
  });
  
  return View;
});
