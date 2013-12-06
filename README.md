i18nZr.js
=========

Lightweight i18n javascript library running client side.
i18nZr allows you to translate your DOM or a subpart.

Based on simple i18n files formated like this : 
```javascript
 {
			"code":"FR_fr",
			"values":[
					{"key":"akey", "value":"Translated entry"},
		 			{"key":"anotherkey", "value":"Another Translated entry"}
		 			]
		 }
 ```

Registering i18n files
=========
```javascript
i18nZr.registerLocales(FR_fr, RU_ru, EN_en)
 ```

Translating
=========
When setting the current language we can trigger a translation on the whole DOM via the 2nd argument of the setCurrentLanguage() function.
```javascript
i18nZr.setCurrentLanguage("FR_fr", true);
 ```

You can also request a translation for a given key (based on the current language set).
```javascript
console.log(i18nZr.getTranslation("A_KEY"));
 ```

By default, the whole DOM is scanned for translatable items, but you reduce the scope by calling the translateElement() method with a specific node as a parameter. (if no argument is supplied DOM is used as a target). 
