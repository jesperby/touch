define([ "conf" ], function ( Conf ) {
  'use strict';

  window._gaq = window._gaq || [];

  (function() {
    var ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(ga, s);
  })();

  window._gaq.push(['_setAccount', Conf.UAAccount]);
  window._gaq.push(['_setDomainName', '.malmo.se']);

  function pageView(id) {
    var path =  document.location.href.replace(document.location.protocol + '//' + document.domain, '');
    window._gaq.push(['_trackPageview', path + ' ' + id]);
  }

  return {pageView:pageView};
});
