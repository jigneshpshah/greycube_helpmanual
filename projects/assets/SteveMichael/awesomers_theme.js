
$(function(){
   $("nav.navbar").addClass("fixto-fixed");
   $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $("nav.navbar").removeClass("fixto-fixed");
    } else {
        $("nav.navbar").addClass("fixto-fixed");
    }
   });
   $(".web-page-content").addClass("container");
   $("#home").removeClass("container");
   $(".page-content-wrapper > .container").prepend('<div id="headerwrap"><div class="header-homepage color-overlay"></div><div class="header-separator header-separator-bottom "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path class="svg-white-bg" d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path></svg></div></div>');
   
   var headerstxt = $("#page-list").find('#headerwrap');
   $("#page-list .page-content-wrapper").prepend(headerstxt);
   $(".hero-and-content .container .page-container, .page-header").addClass('container');
   $("#page-home").removeClass('container');
   $("#page-home").parent().find("#headerwrap").hide();
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-43681903-9', 'auto');
ga('send', 'pageview');
// End Google Analytics
