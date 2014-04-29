//var urlArt='http://localhost/server/article/art';
//var urlPhp='http://localhost/server/getArticlesR.php?cu=';


//var urlArt='http://nuevosociales.com.ar/app/article/art';
var urlArt='http://extensioncbc.com.ar/app/article/art';
//var urlPhp='http://www.ni54.com/Racing/getArticlesR.php?cu=';
//var urlPhp='http://nuevosociales.com.ar/app/getArticlesR.php?cu=';
var urlPhp='http://extensioncbc.com.ar/app/getArticlesR.php?cu=';
//var urlImagenes= 'http://nuevosociales.com.ar/app/';
var urlImagenes= 'http://extensioncbc.com.ar/app/';


function GetNews(cuantity,category,index,div){
console.log(cuantity,category,index,div);
$( "#"+div ).load(urlPhp+cuantity+'&ca='+category+'&ix='+index, function( response, status, xhr ) {
	console.log("asdas");
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
	console.log("errrooooooorrrrr");
  }
});
}

var cuantity= 10;
var filter= "all";
var index= 10000;


$( "#testList" ).on( "pagebeforecreate",function(){
			//filter= $( "#noticias" ).attr( "filter" );
			//GetNews(cuantity,filter,index); 	
});

//var urlVersion="http://localhost/server/version.php";
	//var urlGetNews='http://localhost/server/getArticles.php';
	//var urlArt="http://localhost/server/article/art";
	
	
	function Clikeado(title,date,imagen,articleNumber){
		//console.log(articleNumber);
		
		$( '#nota' ).html("<img src='images/ajax-loader.gif' align='center' style='display:block;'>");
		
		
		//$.get("http://nuevosociales.com.ar/app/proxy.php?url=article/art"+articleNumber+'.txt', function( data ) {
		$.get("http://extensioncbc.com.ar/app/proxy.php?url=article/art"+articleNumber+'.txt', function( data ) {
		//$.get( urlArt+articleNumber+'.txt', function( data ) {
			console.log("adsdasdas");
			//console.log(data);
			//$( '#nota' ).append( data);
			
			
			
			var titleRep= title.replace(/replaceComillasDobles/g,'"');
			titleRep= titleRep.replace(/replaceComillasSimples/g,"'");
			
			console.log(titleRep);
			
			$( '#nota' ).html("");
			if(imagen==""){
				imagen= "images/logo.png";
			}
			$( '#nota' ).append('<div class="divImage" align="center"><img src="'+urlImagenes+imagen+'" class="imageNota"></div>');
			$( '#nota' ).append("<div class='divTitulo'><p class='tituloNota' align='center'>"+ titleRep +"</p><p style='font-size:0.5em'>"+ date +"</p></div>");
			//$( '#nota' ).append("<h8 style='display:block'>"+ date +"</h8></div>");
			//$( '#nota' ).append('<p></p>');
			$( '#nota' ).append('<div style="position:relative;top:-6em;">'+data+'</div>');
			
			
			
		 });
	}
	
	
	
	
var arraySecciones= new Array();
var index=0;

function AddSection(name,hide){
	arraySecciones[index]= name;
	if(hide==true){
		$('#'+name).hide();
	}
	index++;
};

function ShowSection(name){
	 for (a=0;a<arraySecciones.length;a++){
		if(arraySecciones[a]!=name){
			$('#'+arraySecciones[a]).hide();
		}
	}
	$('#'+name).show();
	$('#headName').html( name);
	
	GetNews(10,name,10000,name);
	console.log("llamop");
	
	$( "#left-panel" ).panel( "close" );
};