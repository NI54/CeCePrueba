	var urlVersion="http://localhost/server/version.php";
	var urlGetNews='http://localhost/server/getArticles.php';
	var urlArt="http://localhost/server/article/art";
	//var urlVersion="http://extensioncbc.com.ar/app/version.php";
	//var urlGetNews='http://extensioncbc.com.ar/app/getArticles.php';
	//var urlArt="http://extensioncbc.com.ar/app/article/art";
	//var urlVersion="http://franas3.p.ht/ubaApp/version.php";
	//var urlGetNews='http://franas3.p.ht/ubaApp/getArticles.php';
	//var urlArt="http://franas3.p.ht/ubaApp/article/art";
	
	//var urlImportantes="http://franas3.p.ht/ubaApp/getImportantes.php";
	var urlImportantes="http://extensioncbc.com.ar/app/getImportant.php";

	//localStorage.clear();

	
	var news;
	var cuantity=10;
	var lastVersion=0;
	var request;
	var newsLoaded=0;
	var lastId=0;
	var refreshing=false;
	var executed=false;
	var newsList='';
	
	var section="all";

	
	
	function trace(text){
		//log.innerHTML+=text+'<br>';
	}
	
	function SetStatus(status){
		//document.getElementById('estado').innerHTML=status;
	
	}
	
	
	
	function Refresh(){
		
		
		if(!refreshing){
			console.log("entro refresh");
			refreshing=true;
			SetStatus('Comprobando datos...');			
			news=new Array(cuantity);
			if(localStorage.getItem('lastVersion')==null){
				localStorage.setItem('lastVersion', lastVersion);
			}else{
				lastVersion= localStorage.getItem('lastVersion');
			}
			request= new XMLHttpRequest();
			request.open('GET',urlVersion,true);
			request.onreadystatechange= CheckVersion;
			request.send();
		}
	}
	
	function CheckVersion(){
		console.log("state"+request.readyState+"   status"+request.status);
		if (request.readyState==4 && (request.status==200)){
			console.log("entro2");
			var svVersion= request.responseText;
			if(svVersion!=lastVersion){
				newsList='';
				//arreglar esto luego e_e
				lastVersion= svVersion;
				localStorage.setItem('lastVersion', lastVersion);
				
				SetStatus('Descargando noticias...');
				lastVersion+=1;
				RequestNews(lastVersion);
				
			}else{
				if(!executed){
					newsList='';
					lastId=lastVersion;
					SetStatus('Accediendo noticias...');
					SearchStoredNews();
					AppendArticles();
				}else{
					SetStatus('Actualizado');
					refreshing=false;
				}
			}	
			
		}
	}
	
	function RequestNews(index){
		request= new XMLHttpRequest();
		request.open('GET',urlGetNews+'?cu='+cuantity+'&ca='+section+'&ix='+index,true);
		request.onreadystatechange=CheckLastNews;
		request.send();
	}
		
		function CheckLastNews(){
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
			//newsList+= '<div data-role="list-divider" onclick="Clicked('+auxArray[0]+')" data-theme="d">'+auxArray[1] +'</li><li><a onclick="Clicked('+auxArray[0]+')" href=#page2 data-transition="slide"><p>'+auxArray[5]+'</p></a></li>';
			
			newsLoaded+=1;
			
			lastId=auxArray[0];
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
			/*if(executed){
				CleanNews();
			}*/
			console.log("apendeados");
			newsList= '<div data-role="header"><div data-role="controlgroup" data-type="horizontal" class="ui-mini ui-btn-left" ><a href="#" class="ui-btn ui-btn-icon-right ui-icon-plus">Add</a><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-u">Up</a><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-d">Down</a></div><h6> Header</h6></div>';
			
			
			//$('#testList').hide().show(0);
			
			

			refreshing=false;
			executed=true;
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
			
			RequestNews(lastId);
		}
		
		function SetFilter(filter){
			section=filter;
			if(executed){
				CleanNews();
				news=new Array(cuantity);
				newsList='';
				RequestNews(lastVersion);
				console.log("asdas"+newsList);
			}
			
		}
		
		
		var requestI;
		
		var importantesList;
		
		function Importantes(){
			console.log("entro importante");
			if(importantesList!="undefinded"){
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
				$('#noticiasImportantes:visible').append( importantesList);
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