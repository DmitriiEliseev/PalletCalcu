$(function(){
	
	//габариты пространства
	$("#size").change(function() {
		xPallet = parseInt($(this).val());
	});
	var xPallet = 800;
	var zPallet = 1200;
	var yPallet = 2400;
	
	//гибариты 1 единицы
	var x = $(".xItem");
	var z = $(".zItem");
	var y = $(".yItem");
	
	//html элементы для записи рассчетов паллетизации
	var xDiv = $(".xPallet");
	var yDiv = $(".yPallet");
	var resStaks = $(".staks");
	//кнопка
	var calcButton = $(".calcButton");
	//результаты подсчетов по двум вариантам
	var overResENDv1;
	var overResENDv2;
	
	//функция рассчета по клику
	calcButton.on( "click", function (){
		//габариты единицы полученные из input
		var xItem = x.val();
		var zItem = z.val();
		var yItem = y.val();
		
		//рассчет колличества единиц по 1 варианту
			var resXv1 = xPallet / xItem;
			var resXv1 = Math.floor(resXv1);
			
			var resZv1 = zPallet / zItem;
			var resZv1 = Math.floor(resZv1);
			
			var resY = yPallet / yItem;
			var resY = Math.floor(resY);
			
			var calcSumV1 =  resXv1 *  resZv1 *  resY;
			
			var overX1 = xPallet - (resXv1 * xItem);
			var overZ1 = zPallet - (resZv1 * zItem);
			//проверка на остаток пространства по X
			var flexStaks = $(".flexStaks");
			
			if(zItem <= overX1){
				//подсчет пространства по X
				var overENDx1 = Math.floor(overX1/zItem);
				var overENDz1 = Math.floor(zPallet/xItem);
				var overENDres1 = (overENDx1 * overENDz1) * resY;
				overResENDv1 = calcSumV1 + overENDres1;
			}
			//проверка на остаток пространства по Z
			else if (xItem <= overZ1){
				//проверка на остаток пространства по Z
				var overENDx1 = Math.floor(overZ1/xItem);
				var overENDz1 = Math.floor(xPallet/zItem);
				var overENDres1 = (overENDx1 * overENDz1) * resY;
				overResENDv1 = calcSumV1 + overENDres1;
			}
			//записать результат если свободного пространства нет
			else {
				overResENDv1 = calcSumV1;
			}
			
		
		//рассчет колличества единиц по 2 варианту
		
			var resXv2 = xPallet / zItem;
			var resXv2 = Math.floor(resXv2);
			
			var resZv2 = zPallet / xItem;
			var resZv2 = Math.floor(resZv2);
			
			var resY = yPallet / yItem;
			var resY = Math.floor(resY);
			
			var calcSumV2 = resXv2 *  resZv2 *  resY;
			
			
			var overX2 = xPallet - (resXv2 * zItem);
			var overZ2 = zPallet - (resZv2 * xItem);
			
			if(xItem <= overX2){
				var overENDx2 = Math.floor(overX2/xItem);
				var overENDz2 = Math.floor(zPallet/zItem);
				var overENDres2 = (overENDx2 * overENDz2) * resY;
				overResENDv2 = calcSumV2 + overENDres2;
			}
			
			else if (zItem <= overZ2){
				var overENDx2 = Math.floor(overZ2/zItem);
				var overENDz2 = Math.floor(xPallet/xItem);
				var overENDres2 = (overENDx2 * overENDz2) * resY;
				overResENDv2 = calcSumV2 + overENDres2;
			}
			else {
				overResENDv2 = calcSumV2;
			}
			
		
		
		yDiv.html(resY);
		
		//подготовка элементов для печати, перевод значений в пиксели
		var stak = $(".stak");
		var flexStaksX = xPallet /5 + "px";
		var flexStaksY = yPallet /5 + "px";
		var flexStaksZ = zPallet /5 + "px";
			
		var stakX = x.val() /5 + "px";
		var stakY = y.val() /5 + "px";
		var stakZ = z.val() /5 + "px";
		
		
		//проверка на превышение максимальных габаритов.
		if((zItem > zPallet && xItem > xPallet) || (xItem > zPallet && zItem > xPallet) || (zItem > xPallet && xItem > xPallet)){
			alert("Внимание! Превышение максимально допустимых габаритов");
			var resXv3 = xPallet / zItem;
			var resXv3 = 1;
			
			var resZv3 = zPallet / xItem;
			var resZv3 = 1;
			
			var resY = yPallet / yItem;
			var resY = Math.floor(resY);
			
			var calcSumV3 = resXv3 *  resZv3 *  resY;
			overResENDv3 = calcSumV3;
			resStaks.html(overResENDv3);
			
			flexStaks.remove();
			console.log("Вариант 3");
			for(var i = 0; i < resY; i++){
				var flex = $(".flex");
				flex.append('<div class ="flexStaks">');
			}
			
			var rowStak = resXv3 * resZv3;
			xDiv.html(rowEND);
			
			//отображение ряда
			var stak = $(".stak");
			var flexStaks = $(".flexStaks");
			stak.remove();
			
			//рассчет габаритов стороны
			flexStaks.css({"height": flexStaksZ, "width": flexStaksX});
			
			//печать элементов в указанных габаритах
			for (var i = 0; i < rowStak; i++) {
				flexStaks.append('<div class ="stak">');
			}
			
			var stak = $(".stak");
			//передача значения габаритов для единицы
			setTimeout(function() { 
				stak.css({"height": stakX, "width": stakZ, "background": "black"});
			}, 500);
		}
		//проверка на соответствие габаритам по Z.
		else if(zItem > zPallet){
			alert("Внимание! Негабаритный груз.");
			var resXv3 = xPallet / zItem;
			var resXv3 = 1;
			
			var resZv3 = zPallet / xItem;
			var resZv3 = Math.floor(resZv3);
			
			var resY = yPallet / yItem;
			var resY = Math.floor(resY);
			
			var calcSumV3 = resXv3 *  resZv3 *  resY;
			overResENDv3 = calcSumV3;
			resStaks.html(overResENDv3);
			
			flexStaks.remove();
			console.log("Вариант 3");
			for(var i = 0; i < resY; i++){
				var flex = $(".flex");
				flex.append('<div class ="flexStaks">');
			}
			
			var rowStak = resXv3 * resZv3;
			xDiv.html(rowEND);
			
			//отображение ряда
			var stak = $(".stak");
			var flexStaks = $(".flexStaks");
			stak.remove();
			
			//рассчет габаритов стороны
			flexStaks.css({"height": flexStaksZ, "width": flexStaksX});
			
			//печать элементов в указанных габаритах
			for (var i = 0; i < rowStak; i++) {
				flexStaks.append('<div class ="stak">');
			}
			
			var stak = $(".stak");
			//передача значения габаритов для единицы
			setTimeout(function() { 
				stak.css({"height": stakX, "width": stakZ, "background": "black"});
			}, 500);
			
		}
		//проверка на соответствие габаритам по X.
		else if(xItem > zPallet){
			alert("Внимание! Негабаритный груз.");
			var resXv3 = xPallet / xItem;
			var resXv3 = 1;
			
			var resZv3 = zPallet / zItem;
			var resZv3 = Math.floor(resZv3);
			
			var resY = yPallet / yItem;
			var resY = Math.floor(resY);
			
			var calcSumV3 = resXv3 *  resZv3 *  resY;
			overResENDv3 = calcSumV3;
			resStaks.html(overResENDv3);
			
			flexStaks.remove();
			console.log("Вариант 4");
			for(var i = 0; i < resY; i++){
				var flex = $(".flex");
				flex.append('<div class ="flexStaks">');
			}
			
			var rowStak = resXv3 * resZv3;
			xDiv.html(rowEND);
			
			//отображение ряда
			var stak = $(".stak");
			var flexStaks = $(".flexStaks");
			stak.remove();
			
			//рассчет габаритов стороны
			flexStaks.css({"height": flexStaksZ, "width": flexStaksX});
			
			//печать элементов в указанных габаритах
			for (var i = 0; i < rowStak; i++) {
				flexStaks.append('<div class ="stak">');
			}
			
			var stak = $(".stak");
			//передача значения габаритов для единицы
			setTimeout(function() { 
				stak.css({"height": stakZ, "width": stakX, "background": "black"});
			}, 500);
		}
		//первый вариант печати (если первый выриант больше или равен втрому)
		else if(overResENDv1 >= overResENDv2){
			resStaks.html(overResENDv1);
			flexStaks.remove();
			console.log("Вариант 1");
			//печать рядов
			for(var i = 0; i < resY; i++){
				var flex = $(".flex");
				flex.append('<div class ="flexStaks">');
			}
			
			var rowStak = resXv1 * resZv1;
		
				var rowOver = overENDx1 * overENDz1;
				if(isNaN(rowOver) == true){
					rowOver = 0;
				}
				var rowEND = rowStak + rowOver;
				
			xDiv.html(rowEND);
			
			//отображение ряда
			var stak = $(".stak");
			var flexStaks = $(".flexStaks");
			stak.remove();
			
			//рассчет габаритов стороны
			flexStaks.css({"height": flexStaksZ, "width": flexStaksX});
			
			//печать элементов в указанных габаритах
			for (var i = 0; i < rowStak; i++) {
				flexStaks.append('<div class ="stak">');
			}
			
			var stak = $(".stak");
			//передача значения габаритов для единицы
			setTimeout(function() { 
				stak.css({"height": stakZ, "width": stakX, "background": "black"});
			}, 500);	
			//добавить элементы если осталось пространство
			var overStak = $(".overStak");
			overStak.remove();
			//печать элементов
			for (var i = 0; i < rowOver; i++) {
				flexStaks.append('<div class ="overStak">');
			}
			
			var overStak = $(".overStak");
			//передача габаритов
			setTimeout(function() { 
				overStak.css({"height": stakX, "width": stakZ, "background": "black"});
			}, 500);
			
			if(zItem <= overX1){
				flexStaks.css({"flex-direction": "column"});
				}
			else {
				flexStaks.css({"flex-direction": "row"});
				}
		}
		
		
		
		//второй вариант печати
		else {
			resStaks.html(overResENDv2);
			flexStaks.remove();
			console.log("Вариант 2");
			for(var i = 0; i < resY; i++){
				var flex = $(".flex");
				flex.append('<div class ="flexStaks">');
			}
			
			var rowStak = resXv2 * resZv2;
			
				var rowOver = overENDx2 * overENDz2;
				if(isNaN(rowOver) == true){
					rowOver = 0;
				}
				var rowEND = rowStak + rowOver;
				
			xDiv.html(rowEND);
			
			//отображение ряда
			var stak = $(".stak");
			var flexStaks = $(".flexStaks");
			stak.remove();
			
			//рассчет габаритов стороны
			flexStaks.css({"height": flexStaksZ, "width": flexStaksX});
			
			//печать элементов в указанных габаритах
			for (var i = 0; i < rowStak; i++) {
				flexStaks.append('<div class ="stak">');
			}
			
			var stak = $(".stak");
			//передача значения габаритов для единицы
			setTimeout(function() { 
				stak.css({"height": stakX, "width": stakZ, "background": "black"});
			}, 500);	
			
			var overStak = $(".overStak");
			overStak.remove();
			
			for (var i = 0; i < rowOver; i++) {
				flexStaks.append('<div class ="overStak">');
			}
			
			var overStak = $(".overStak");
			
			setTimeout(function() { 
				overStak.css({"height": stakZ, "width": stakX, "background": "black"});
			}, 500);
			
			if(xItem <= overX2){
				flexStaks.css({"flex-direction": "column"});
				}
			else {
				flexStaks.css({"flex-direction": "row"});
				}
			
		}
		
		
		
	});	
	
		

});
