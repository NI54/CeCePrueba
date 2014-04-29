/*$('#testList').append(' <div data-role="panel" id="left-panel" data-theme="c" data-display="push" style="border:none;position:fixed;"><li data-role="list-divider">Menu</li><div data-role="controlgroup" corners="false" data-corners="false"><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Noticias.png">Noticias</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Videos.png">Videos</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Historia.png">Historia</a><a href="#Historia"  class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Autoridades.png">Autoridades</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Publicidad.png">Publicidad</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Legal.png">Legal</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Staff.png">Staff</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Contacto.png">Contacto</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Estadisticas.png">Estadisticas</a><a href="#" class="ui-btn ui-btnSlider" style="text-align: left;"><img src="images/Plantel.png">Plantel</a> </div></div> ');*/


$( document ).on( "pagecreate", "#testList", function() {
    $( document ).on( "swipeleft swiperight", "#testList", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});
