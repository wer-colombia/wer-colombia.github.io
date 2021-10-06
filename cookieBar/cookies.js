function cargarCookies(){
	
	//console.log('Cargo COOKIES');
	
	/* THEME OPTIONS */
	jQuery('head').append('<script data-ad-client="ca-pub-8006503527387568" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
	jQuery('body').append('<!-- Global site tag (gtag.js) - Google Analytics --><script async src="https://www.googletagmanager.com/gtag/js?id=UA-57494157-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "UA-57494157-1");</script>');
	
	jQuery.ajax({
		url: '/cookies/theme_ads_1.txt',
		method: 'GET'
	}).done(function(response){
		if(response!='') jQuery('#theme_ads_1').replaceWith(response);
	});
	
	
	/* SIDEBAR */
	jQuery.ajax({
		url: '/cookies/sidebar_ads_1.txt',
		method: 'GET'
	}).done(function(response){
		if(response!='') jQuery('#sidebar_ads_1').replaceWith(response);
	});
	
	jQuery.ajax({
		url: '/cookies/sidebar_ads_2.txt',
		method: 'GET'
	}).done(function(response){
		if(response!='') jQuery('#sidebar_ads_2').replaceWith(response);
	});
	
	
	/* WP QUADS */
	jQuery.ajax({
		url: '/cookies/quads_ads_1.txt',
		method: 'GET'
	}).done(function(response){
		if(response!='') jQuery('#quads_ads_1').replaceWith(response);
	});
	
	jQuery.ajax({
		url: '/cookies/quads_ads_5.txt',
		method: 'GET'
	}).done(function(response){
		if(response!='') jQuery('#quads_ads_5').replaceWith(response);
	});
	
	jQuery.ajax({
		url: '/cookies/quads_ads_9.txt',
		method: 'GET'
	}).done(function(response){
		if(response!='') jQuery('#quads_ads_9').replaceWith(response);
	});
}

if(typeof setCookie != 'function'){

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
}

if(typeof getCookie != 'function'){

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
}

function cargaBloqueCookie(){
	jQuery('head').append('<link rel="stylesheet" href="/cookies/cookieBar/cookies.css"></link>');
	jQuery('body').append('<div id="cookieBar"></div>');
	jQuery('#cookieBar').load('/cookies/cookieBar/cookies.php',function(){
			
		jQuery('.aceptarCookie').on('click',function(){
		
			setCookie('cookieBar','1',30);
			cargarCookies();
				
			jQuery('#cookieBar').remove();
			
		});
		
		jQuery('.configCookie').on('click',function(){
		
			jQuery('.containerConfigCookie').slideToggle();
		
		});
		
		jQuery('.cancelCookie').on('click',function(){
		
			setCookie('cookieBar','2',30);
			jQuery('#cookieBar').remove();
		
		});

		jQuery('.closeCookie').on('click',function(){
		
			jQuery('#cookieBar').remove();
		
		});
		
		jQuery('.guardarConfigCookie').on('click',function(){
			
			var seleccionaConfigAcepta=0;
			var aceptaCookie=false;
			jQuery('.consentimientoCookie_aceptar').each(function(){
				if(jQuery(this).hasClass('active')) seleccionaConfigAcepta=seleccionaConfigAcepta+1;
				if(jQuery(this).attr('id')=='consentimientoCookie_81' && jQuery(this).hasClass('active')) aceptaCookie=true;
			});
			var seleccionaConfigRechaza=0;
			jQuery('.consentimientoCookie_rechazar').each(function(){
				if(jQuery(this).hasClass('active')) seleccionaConfigRechaza=seleccionaConfigRechaza+1;
			});
			
			if(seleccionaConfigAcepta+seleccionaConfigRechaza!=8){
				jQuery('.cookieBotonGuardar_error').css('visibility','visible');
			}else{
			
				if(aceptaCookie){
					setCookie('cookieBar','1',30);
					cargarCookies();
					jQuery('#cookieBar').remove();
				}else{
					setCookie('cookieBar','2',30);
					jQuery('#cookieBar').remove();
				}
				
			}
			
		});
		
	});
}

function cargarBloqueNoCookie(){
	jQuery('head').append('<link rel="stylesheet" href="/cookies/cookieBar/cookies.css"></link>');
	jQuery('body').append('<div id="cookieBar"></div>');
	jQuery('#cookieBar').load('/cookies/cookieBar/cookiesNot.php',function(){
		
		jQuery('.closeCookie').on('click',function(){
		
			jQuery('#cookieBar').remove();
		
		});
		
		jQuery('.configCookie').on('click',function(){
		
			jQuery('.containerConfigCookie').slideDown();
		
		});
		
		jQuery('.acceptCookie').on('click',function(){
		
			setCookie('cookieBar','1',30);
			jQuery('#cookieBar').remove();
			cargarCookies();
		
		});
		
	
	});		
}

function consentimientoCookie(tipo,estado){
	if(jQuery('#consentimientoCookie_'+tipo+estado).hasClass('active')) jQuery('#consentimientoCookie_'+tipo+estado).removeClass('active');
	else  jQuery('#consentimientoCookie_'+tipo+estado).addClass('active');
	
	if(estado==0) jQuery('#consentimientoCookie_'+tipo+'1').removeClass('active');
	else jQuery('#consentimientoCookie_'+tipo+'0').removeClass('active');
	
	var seleccionaConfig=0;
	jQuery('.consentimientoCookie').each(function(){
		if(jQuery(this).hasClass('active')) seleccionaConfig=true;
	});
	
	if(seleccionaConfig){
		jQuery('.cookieBotonesGenerales').hide();
		jQuery('.cookieBotonGuardar').show();
	}else{
		jQuery('.cookieBotonesGenerales').show();
		jQuery('.cookieBotonGuardar').hide();
	}
	
	if(jQuery('.cookieBotonGuardar_error').is(':visible')) jQuery('.cookieBotonGuardar_error').css('visibility','hidden');
}

window.onload=function(){
	
	var cookieBar=getCookie('cookieBar');
	var cookieBarExclusion='https://www.cocinacaserayfacil.net/politica-de-cookies/';
	
	if(cookieBar!='1' && cookieBar!='2' && location.href!=cookieBarExclusion){
		
		cargaBloqueCookie();
				
	}
	
	if(cookieBar=='1'){
		
		cargarCookies();
		
	}
	
	if(cookieBar=='2' && location.href!=cookieBarExclusion){
		
		cargarBloqueNoCookie();
		
	}
	
}