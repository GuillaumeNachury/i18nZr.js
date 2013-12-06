/*
* i18nZr.js
* @Author Guillaume Nachury
* @Date 04-2012
*
*	Translatable element MUST have the data-i8n-key attribute.
*	The Translated string is placed in the element via the innerHTML 
*/

window.i18nZr = (function(document){
	'use strict';
	var target,
		currentLanguage,
		currentLocale,
		locales=[],
		autoTranslate;


	/**
		Register the locales. The locales must be formated as following :
		{
			"code":"FR_fr",
			"values":[
					{"key":"akey", "value":"Translated entry"},
		 			{"key":"anotherkey", "value":"Another Translated entry"}
		 			]
		 }
	*/
	function registerLocales(){
		for (var i = arguments.length - 1; i >= 0; i--) {
			locales.push(arguments[i]);
		};
	}

	/**
		Set the current locale, Must match the "code" used in the locale File
		forceTranslate can be use to trigger the translation on the DOM
	*/
	function setCurrentLanguage(lng, forceTranslate){
		if(locales === undefined || locales.length === 0) {
			console.log("i18nZr :: No locale set !");
			return;
		}
		currentLanguage = lng;
		if(!findCurrentLocale()){
			console.log("i18nZr :: Can't find locale for '"+lng+"'. Check your registration process");
			return;
		}
		if(forceTranslate)
			translate();
	}

	/**
		Set the locale object, related to the currentLanguage, in the currentLocale varibale.
	*/
	function findCurrentLocale(){
		for (var i = locales.length - 1; i >= 0; i--) {
			if(locales[i].code === currentLanguage){
				currentLocale = locales[i];
				return true;
			} 
		};
		return false;
	}

	/**
		Triggers the translation for all the elements,
		 of the 'target' component, that have the data-i8n-key attribute.

		 If no target is supplied, we use the document.
	*/
	function translate(target){
		var _target = document;
		if(target) _target = target;
		var items = _target.querySelectorAll('*[data-i8n-key]');

		for (var i = items.length - 1; i >= 0; i--) {
			items[i].innerHTML = getTranslation(items[i].getAttribute("data-i8n-key"))
		};
	}

	/**
		Returns the translated value for a given key.
		returns an empty string if no key found
	*/
	function getTranslation(key){
		for (var i = currentLocale.values.length - 1; i >= 0; i--) {
			if(currentLocale.values[i].key === key) return currentLocale.values[i].value;
		};
		return "";
	}


	return {
		registerLocales:registerLocales,
		setCurrentLanguage:setCurrentLanguage,
		getTranslation:getTranslation,
		translateElement:translate
	}



})(document); 