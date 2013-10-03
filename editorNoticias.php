<?php
	session_start();
	if(!session_is_registered(myusername)){
	header("location:main_login.php");
	}
?>
<!DOCTYPE HTML>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
<head>
 
<link rel="stylesheet" href="jquerymobile130.css"/>
<link rel="stylesheet" href="CeCeApp.css" />
<script src="jquery-1.9.1.js"></script>
<script src="jquery.mobile-1.3.2.js"></script>


</head>

<body>

<div data-role="page" id="page1">

<div data-role='header' id="hdrMain" data-theme="d" name="hdrMain" data-nobackbtn="false">
	<h1>SEUBE APP</h1>
	<a onclick="history.go(-1)" data-role="button" data-theme="b" class= "ui-btn2">
			<img src="images/volver.png">
			</a>
	<button onclick="Refresh()" data-role="button" data-theme="d" data-icon='refresh'> Refresh</button>
</div>
<div data-role='content' id="mainContent" name= "Main content">
	
	<div data-role="content" class="ui-content" id='noticias' data-theme="d">
		<p>       </p>
		<ul id="testList" data-role="listview" class="ui-listview" data-theme="d"></ul>
		<p>       </p>
	</div>


</div>


</div>


<script>

	//var urlVersion="http://localhost/server/version.php";
	//var urlGetNews='http://localhost/server/getArticles.php';
	//var urlArt="http://localhost/server/article/art";
	var urlVersion="http://extensioncbc.com.ar/app/version.php";
	var urlGetNews='managerNoticias.php';
	var urlArt="article/art";
	//var urlVersion="http://franas3.p.ht/ubaApp/version.php";
	//var urlGetNews='http://franas3.p.ht/ubaApp/getArticles.php';
	//var urlArt="http://franas3.p.ht/ubaApp/article/art";
	
	//var urlImportantes="http://franas3.p.ht/ubaApp/getImportantes.php";
	var urlImportantes="http://extensioncbc.com.ar/app/getImportant.php";

	localStorage.clear();

	var log= document.getElementById('log');
	var news;
	var cuantity=100000;
	var lastVersion=0;
	var request;
	var newsLoaded=0;
	var lastId=0;
	var refreshing=false;
	var executed=false;
	var newsList='';
	
	var section="all";

	$(document).on("pageinit", "#page1", function () {
		console.log("entro");
		//Refresh();
		 RequestNews(0);
	});
	
	function trace(text){
		//log.innerHTML+=text+'<br>';
	}
	
	function SetStatus(status){
		//document.getElementById('estado').innerHTML=status;
	}
	
	function Refresh(){
	
		if(!refreshing){
			console.log("entro refresh");
			RequestNews("10000");
		}
	}
	
	function CheckVersion(){
		
	}
	
	function RequestNews(index){
		console.log("pide new");
		request= new XMLHttpRequest();
		request.open('GET',urlGetNews+"?id="+index,true);
		request.onreadystatechange=CheckLastNews;
		request.send();
	}
		
		function CheckLastNews(){
			console.log(request.status);
			if (request.readyState==4 && request.status==200){
				if(request.responseText!=''){
					newsLoaded=0;
					DecodeNews(request.responseText);
				}else{
					refreshing=false;
					return;
				}
			}
		}
		
		function DecodeNews(text){
			var auxText=text;
			var index=1;
			while(index>-1){
				index=auxText.indexOf('~');
				var auxArray= auxText.substring(0,index).split('|');
				if(localStorage.getItem('art'+auxArray[0])==null){
					StoreNew(auxArray);
				}else{
				
				}
				auxText= auxText.substring(index+1,auxText.length);
				index=auxText.indexOf('~');
				if(newsLoaded<cuantity){
					AddToShowList(auxArray);
				}
			}
			if(newsLoaded<cuantity){
				lastId-=1;
				SearchStoredNews();
			}
			AppendArticles();
		}
		
		function StoreNew(auxArray){
			localStorage.setItem('art'+auxArray[0],true);
			localStorage.setItem('art'+auxArray[0]+'.title',auxArray[1]);
			localStorage.setItem('art'+auxArray[0]+'.author',auxArray[2]);
			localStorage.setItem('art'+auxArray[0]+'.date',auxArray[3]);
			localStorage.setItem('art'+auxArray[0]+'.category',auxArray[4]);
			localStorage.setItem('art'+auxArray[0]+'.summary',auxArray[5]);
			localStorage.setItem('art'+auxArray[0]+'.id',auxArray[0]);
			
			request= new XMLHttpRequest();
			
			var aux= localStorage.getItem('art'+auxArray[0]+'.content');
			
			if(aux==null||aux=='undefined'){
			//asincronizar esto
				request.open("GET",urlArt+auxArray[0] +".txt",false);
				request.send();
				localStorage.setItem('art'+auxArray[0]+'.content', request.responseText);
			}
			
			
			
		}
		
		function AddToShowList(auxArray){
			console.log("noticia agregada");
			console.log(auxArray[0]);
			newsList+= '<li id="id'+auxArray[0]+'"data-role="list-divider" onclick="Clicked('+auxArray[0]+')" data-theme="d">'+auxArray[1] +'</li><li id="b'+auxArray[0]+'"><a onclick="Borrar('+auxArray[0]+')" data-transition="slide"><p>Borrar</p></a></li><li id="e'+auxArray[0]+'"><a onclick="Clicked('+auxArray[0]+')" href=#page2 data-transition="slide"><p>Ver nota</p></a></li><li id="i'+auxArray[0]+'"><a onclick="MakeImportant('+auxArray[0]+')" data-transition="slide"><p>Hacerla Importante</p></a></li>';
			//newsList+= '<li data-role="list-divider">'+auxArray[1] +'<span class="ui-li-count">'+auxArray[4] +' </span></li><li><a onclick="Clicked('+auxArray[0]+')" href=#page2 data-transition="slide"><p class="li-aside">'+auxArray[2] +', '+ auxArray[3]+'</p><p>'+auxArray[5]+'</p></a></li>';
			newsLoaded+=1;
			//<li id="e'+auxArray[0]+'"><a onclick="Clicked('+auxArray[0]+')" href=#page2 data-transition="slide"><p>Editar</p></a></li>
			lastId=auxArray[0];
		}
		
		function Borrar(idNota){
		var Brequest= new XMLHttpRequest();
		Brequest.open('GET',"deleteNews.php?id="+idNota,true);
		Brequest.send();
		$('#id'+idNota).remove();
		$('#b'+idNota).remove();
		$('#e'+idNota).remove();
		$('#i'+idNota).remove();
		}
		
		function MakeImportant(idNota){
			var Brequest= new XMLHttpRequest();
			Brequest.open('GET',"makeImportant.php?id="+idNota,true);
			Brequest.send();
		}
		
		function SearchStoredNews(){
			while(newsLoaded<cuantity&&lastId>=0){
				if(localStorage.getItem('art'+lastId)!=null){
					if(section=="all"||localStorage.getItem('art'+lastId+".category")==section){
					var auxArray= new Array(6);
					auxArray[0]= localStorage.getItem('art'+lastId+".id");
					auxArray[1]= localStorage.getItem('art'+lastId+".title");
					auxArray[2]= localStorage.getItem('art'+lastId+".author");
					auxArray[3]= localStorage.getItem('art'+lastId+".date");
					auxArray[4]= localStorage.getItem('art'+lastId+".category");
					auxArray[5]= localStorage.getItem('art'+lastId+".summary");
					AddToShowList(auxArray);
					}
				}
				lastId-=1;
			}
		}
		
		function AppendArticles(){
			if(executed){
				CleanNews();
			}
			console.log("apendeados");
			$('#testList').append( newsList ).listview("refresh");
			refreshing=false;
			executed=true;
			
			//SetStatus('Actualizado');
		}
		
		function RemoveNode(idNode){
			var node= document.getElementById('testList');
			node.removeChild(node.childNodes[idNode]);
			$('#testList').listview("refresh");
		}
		
		function CleanNews(){
			var node= document.getElementById('testList');
			
			while(node.hasChildNodes()){
				node.removeChild(node.childNodes[0]);
			}
			console.log("cleneadas");
		}
		
		function Clicked(event){
			document.getElementById('titulo').innerHTML= localStorage.getItem('art'+event+'.title');
			document.getElementById('sub').innerHTML= localStorage.getItem('art'+event+'.summary');
			document.getElementById('asd5').innerHTML= localStorage.getItem('art'+event+'.content');
		}
		
		function LoadMore(){
			refreshing=true;
			newsLoaded=0;
			/*SearchStoredNews();
			AppendArticles();*/
			
			//RequestNews(lastId);
		}
		
		function SetFilter(filter){
			section='all';
			if(executed){
				CleanNews();
				news=new Array(cuantity);
				newsList='';
				//RequestNews(lastVersion);
				console.log("asdas"+newsList);
			}
			//Refresh();
			
		}
		
		$(document).on("pageinit", "#page7", function () {
			console.log("entro inicio");
			Importantes();
		});
		
		var requestI;
		
		var importantesList;
		
		function Importantes(){
			console.log("entro importante");
			if(importantesList!="undefinded"){
			//	var node= document.getElementById('noticiasImportantes');
				//while (node.hasChildNodes()){
//				node.removeChild(node.childNodes[0]);
	//			}
		//		$('.ui-listview').append( importantesList ).listview("refresh");
			}
			requestI= new XMLHttpRequest();
			requestI.open('GET',urlImportantes+"?ix=500000",true);
			requestI.onreadystatechange= DownloadImportantes;
			requestI.send();
		}
		
		function DownloadImportantes(){
			console.log(requestI.readyState+"     "+requestI.status);
			if (requestI.readyState==4 && (requestI.status==200)){
								
				importantesList= requestI.responseText;
				var node= document.getElementById('noticiasImportantes');
				while (node.hasChildNodes()){
					node.removeChild(node.childNodes[0]);
				}
				$('#noticiasImportantes:visible').append( importantesList).listview("refresh");
				DownloadAtt(importantesList);
			}
			
			
			
		}
		
		function DownloadAtt(auxListViewImportantes){
			console.log("ntro");
			var auxIn=0;
			
			while(auxIn<3){
			var stringId= "not"+auxIn;
			var id;
				var title;
				var date;
				var author;
				var category;
				var summary;
			Array.prototype.slice.call(document.getElementById(stringId).attributes).forEach(function(item) {
				if(item.name=="author"){
					author= item.value;
				}
				if(item.name=="nota"){
				
					id= item.value;
				}
				if(item.name=="date"){
					date= item.value;
				}
				if(item.name=="title"){
					title= item.value;
				}
				if(item.name=="summary"){
					summary= item.value;
				}
				if(item.name=="category"){
					category= item.value;
				}
			});
			console.log("id es   "+id);
			localStorage.setItem('art'+id,true);
			localStorage.setItem('art'+id+'.title',title);
			localStorage.setItem('art'+id+'.author',author);
			localStorage.setItem('art'+id+'.date',date);
			localStorage.setItem('art'+id+'.category',category);
			localStorage.setItem('art'+id+'.summary',summary);
			localStorage.setItem('art'+id+'.id',id);
			
			request= new XMLHttpRequest();
		
			var aux= localStorage.getItem('art'+id+'.content');
		
			if(aux==null||aux=='undefined'){
			//asincronizar esto
				request.open("GET",urlArt+id +".txt",false);
				request.send();
				localStorage.setItem('art'+id+'.content', request.responseText);
				console.log(request.responseText);
			}
			auxIn+=1;
			}
		}
		
		function DeleteDatos(){
			localStorage.clear();
		}
		
</script>

	<div data-role="page" data-theme="d" id="page2">
		<div data-role='header' id="hdrMain" data-theme="d" name="hdrMain" data-nobackbtn="false">
			<h1 id='titulo'> Titulo </h1>
			<a onclick="history.go(-1)" data-role="button" data-theme="b" class= "ui-btn2">
			<img src="images/volver.png">
			</a>
		</div>
		<div data-role='content' id="mainContent4" name= "news content">
			<div data-role='header' id='estadoHdr' data-theme="c"> <p id="sub" class="bajada"> Sub</p></div>
			<div data-role='content' id='asd5' name= 'asd5' data-theme="d">
			</div>
			
		</div>		

	</div>
	<div data-role="page" data-theme="d" id="pageConfig">
		<div data-role='header' id="hdConfig" data-theme="d" name="hdrConfig" data-nobackbtn="false">
			<h1 id='titulo'> Ajustes </h1>
			<a onclick="history.go(-1)" data-role="button" data-theme="b" class= "ui-btn2">
			<img src="images/volver.png">
			</a>
		</div>
		<div align="center">
		<a onclick="Refresh()" data-role="button" data-theme="b" class= "ui-btnMain" align="center">
			<p> Borrar Noticias</p>
		</a>
		</div>
	</div>

</body>


</html>