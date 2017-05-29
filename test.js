let test = function (condition, outputTrue, outputFalse) {
	if (condition) {
		console.info(outputTrue);
	} else {
		console.error(outputFalse);
	}
};
try {
	test($('#dollar .class')[0].className == "class",
		"element with class found",
		"element with class did not found");

	test($('#dollar').length == 1,
		"#dollar found",
		"#dollar didn't found");

	test($('#dollar p ').length == 1,
		"#dollar p found",
		"#dollar  p didn't found");
} catch (e) {
	console.error("Failed dollar");
}

try {
	test($('#addClass').addClass('class')[0].className == 'class',
		' class added',
		' class was not added'
	);
	//добавился ли класс
	test($('#addClass').addClass('class')[0].className == 'class',
		' class added',
		' class was not added'
	);
	//добавляется ли 2-ой класса
	test($('#addClass').addClass('alena')[0].classList.contains('alena'),
		'alena added',
		'alena was not added'
	);
	//есть  ли два класса
	test($('#addClass')[0].classList.length == 2,
		'has two classes',
		' has not two classes'
	);
	//работает ли chaining
	/*test($('#addClass div').addClass('lena').addClass('vorobei')[0].classList.length == 2,
		"chaining working",
		"chaining  is not working"
	);*/
	$('#addClass div').addClass(function (index, className) {
		return index % 2 ? 'foo bar' : 'foo'
	})

} catch (e) {
	console.error("Failed addClass");
}
try {
	$('#each li').each(function (i, elem) {
		elem.classList.add('lily');
	});
	//всем элементам li добавляется ли  class lily
	test($('#each .lily').length == 3,
		"classes lily  added",
		"classes lily is not  added"
	);


	$('#each li').each(function (i, elem) {
		elem.classList.remove('lily');

	});
	//всем элементам li удаляем ли  class lily
	test($('#each .lily').length == 0,
		"classes lily  closed",
		"classes lily is not  closed"
	)


} catch (e) {
	console.error("Failed each");
}


try {
	//добавился в конец элемента текст
	$('#append li ').append("123");
	test( $('#append li ')[0].innerHTML=="123",
		' text added',
		' text was not added'
	);
	//добавляtv два тестa
	$('#append li ').append("88","5");
	test($('#append li ')[0].innerHTML=="123885",
		'two text added',
		'two text was not added'
	);
	//добавляем функцию
	$('#append p ').append(function(index,str){return index});
	test($('#append p')[0].innerHTML == "pip0",
		'append(function index) worked',
		' append(function index) was not worked'
	);
	//добавляем функцию
	$('#append p ').append(function(index,str){return str});
	test($('#append p')[0].innerHTML == "pip0pip0",
		'append(function  str) worked',
		' append(function str) was not worked'
	);

	//можно ли добавить элемент самосозданный
	const newLi = document.createElement('li');
	newLi.innerHTML = 'Привет, мир!';
	$('#append').append(newLi);

	test($('#append li').length == 4,
		"append li working",
		"append li is not working"
	);
	
	//поместить несколько ссылок в #append
	const link = document.createElement('a');
	link.innerHTML = 'Привет!';
	$('#append').append(link);
	$('#append').append('<a href="#">gh</a>');
	$('#append').append(function (i,str) {
		return '<a href="#">function'+ i +'</a>';
	});
	test($('#append a').length == 3,
		"append a working",
		"append a is not working"
	);
	$('.links').append($('#append a'));
	test($('.links a').length == 3,
		"a  moves to links",
		"a is not moved to links"
	);

} catch (e) {
	console.error("Failed append");
}
try {
	//записываем новое аттрибут, проверяем  его значение
	$('#attr div').attr("name","Alena");
	test($('#attr div').attr("name")=="Alena",
		"attr  name Alena install",
		"attr  name Alena is not install"
	)
	//записываем объект с множетсвом аттрибут, проверяем  его значение
	$('#attr p').attr({
		alt: "Beijing Brush Seller",
		title: "photo by Kelly Clark"
	});
	test($('#attr p').attr("alt")=="Beijing Brush Seller"&&$('#attr p').attr("title")=="photo by Kelly Clark",
		"obj of attr install",
		"obj of attr is not install"
	)
	//измения через ф-цию, измения значения
	$('#attr p').attr("alt",()=>"mother");
	test($('#attr p').attr("alt")=="mother",
		"attr value of function install",
		"attr value of function is not install"
	)
	//измения через ф-цию, измения значения+ индех
	$('#attr .abc').attr("title","Edik");
	$('#attr p').attr("title",(i,old)=>old+i);
	test($('#attr p').attr("title")=="Edik0",
		"attr value of function install",
		"attr value of function is not install"
	)

} catch (e) {
	console.error("Failed each");
}

try {
	//находим количествр ul прямых детей
	test($('#children').children('ul').length == 2,
		"children ul  finded",
		"children ul  is not  finded"
	);
	//находим количествр всех прямых детей
	test($('#children').children().length == 3,
		"all children finded",
		"all children is not  finded"
	);
} catch (e) {
	console.error("Failed children");
}
try {
	//устанлвка и провекрка нового свойства
	$("#css p").css("color","red");
	test($("#css p").css("color")=="red",
		"color red install ",
		"color red is not install"
	);
	//устанлвка  обекта и провекрка нового свойства
	$("#css p").css({"color":"blue","background":"green"});
	test($("#css p").css("color")=="blue"&&$("#css p").css("background")=="green",
		"obj css install ",
		"obj css is not install"
	);
	$("#css p").css("height","20px");

	$('#css p').css("height",(i,old)=> parseInt(old)*i+"px");
	$("#css p").css(["color","background","hvb"]);

} catch (e) {
	console.error("Failed css");
}
try {
	//проверка при трех событиях
	$("#on").on("click","li",(e)=>alert(e.target.innerHTML));
//проверка при двух аргументах, вывод двух событий
	let clickCnt=0;
	$("#on .ven").on("click",()=>clickCnt++).trigger("click");
	test(clickCnt==3,
		"click event works",
		"click event is not  working"
	);
	//$("#on li").trigger("click");
	//$("#on ").trigger("click");

} catch (e) {
	console.error("Failed on");
}
try {
	$('#data p').data("name","Alena");
	$('#data p').data("alt","Beijing Brush Seller");
	$('#data p').data("title","photo by Kelly Clark");
	test($('#data p').data("alt")=="Beijing Brush Seller"&&$('#data p').data("title")=="photo by Kelly Clark",
		"obj of data install",
		"obj of data is not install"
	);
	$("#data p").data();

} catch (e) {
	console.error("Failed data");
}
try {

	let clickCntOne=0;
	$("#one .ven1").one("click",()=>clickCntOne++).trigger("click").trigger("click");
	test(clickCntOne==3,
		"click one  event works",
		"click  one event is not  working");
} catch (e) {
	console.error("Failed one");
}