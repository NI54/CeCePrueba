/*
$('#testList').append('<div id="header" data-role="header"  style="position:fixed;width:100%;z-index:10;">'+'<div data-role="controlgroup" data-type="horizontal" class="ui-btn-left" style="width:20%;left:33%;top:65%;">'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0; background-color:transparent;"><img src="images/Twitter.png" style="width:10em;"></a>'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0; background-color:transparent;"><img src="images/Facebook.png" style="width:10em;"></a>'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0; background-color:transparent;"><img src="images/Blog.png" style="width:10em;"></a>'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0; background-color:transparent;"><img src="images/Mail.png" style="width:10em;"></a>'+'</div>'+'<img src="images/Header.png" style="width:70%;">'+'</div>');*/

$.mobile.orientationChangeEnabled = false;

function InitializeHead(body){ 
$(body).append('<div id="header" data-theme="c" data-role="header"  style="position:fixed;width:100%;z-index:10;background-color:#1e8f89;border:0;">'+'<img src="images/Header.png" class="imgHeader" style="width:25em;height:auto;"><p id="headName" style="padding: 0;padding-top:0.4em;padding-bottom:0.4em;position:relative;padding-left:10%;margin:0;background:#1e8f89;color:white;font-family:'+"'Helvetica'"+';">Comunidad UBA</p><div style="border-width:3px;border-bottom-style:solid;width:100%;height:0.2px;border-bottom-color:#1e8f89;border-top-style:solid;width:100%;border-top-color:#ffffff;"> </div> '+'</div>');

}

/*<div data-role="controlgroup" data-type="horizontal" class="ui-btn-left" style="width:20%;left:33%;top:65%;">'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0; background-color:transparent;"><img src="images/Twitter.png" style="width:10em;"></a>'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0;padding-left: 0.5em; background-color:transparent;"><img src="images/Facebook.png" style="width:10em;"></a>'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0; padding-left: 0.5em; background-color:transparent;"><img src="images/Blog.png" style="width:10em;"></a>'+'<a href="#" class="ui-btn ui-btn-twitter" style="padding:0;padding-left: 0.5em; background-color:transparent;"><img src="images/Mail.png" style="width:10em;"></a>'+'</div>'+'*/

$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
    //$( "imgHeader" ).attr( "style", "width:25em;height:auto;" );
    
	$('.imgHeader').css({ width:'25em',height:'auto'});
	$('.imgHeaderInvi').css({ width:'25em',height:'auto',visibility:'hidden'});
	
  }
  else // Landscape
  {
    //$( "imgHeader" ).attr( "style", "width:15em;height:auto;" );
	$('.imgHeader').css({ width:'15em',height:'auto'});
	$('.imgHeaderInvi').css({ width:'15em',height:'auto',visibility:'hidden'});
    
  }
});


//$(document).on("pageinit", "#testList", function () {
/*$( "#testList" ).on( "pagebeforecreate", function( event ) {
$( "#header" ).load('header.html #header', function( response, status, xhr ) {
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
	console.log("errrooooooorrrrr");
  }
})//;
});*/
