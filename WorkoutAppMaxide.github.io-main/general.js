let data = JSON.parse(localStorage.getItem('obj'));
if(!data)
	data = [];
var pageType;
var exId;
var dayId;

function AddDeleteButton(box, data_of_box, list)
{
	remove = document.createElement('img');
	remove.src = 'trash.svg';
	remove.classList.add('icon');
	remove.onclick = function(){
		list.splice(data_of_box.id, 1)
		localStorage.setItem('data', JSON.stringify(data));
		window.location = window.location.href;
		data_of_box.isDeleting = true;
	};
	box.append(remove);
}
function AddBox(data_of_box, list)
{
	box = document.createElement('div');
	box.classList.add('box');
	box.innerText = list[data_of_box.id].name;
	box.onclick = function(){
		if(data_of_box.isDeleting == "false")
			window.open(data_of_box.url, "_self");
	};
	AddDeleteButton(box, data_of_box, list);
	document.getElementById("content_block").append(box);
}
function CreateExPage(list)
{
	header = document.createElement('div');
	header.classList.add('header');
	header.innerText = 'Добавить новое упражнение';
	header.onclick = function(){
		list.unshift({"name":"Упражнение","days":[]});
		localStorage.setItem('data', JSON.stringify(data));
		window.open("index.html?type=days&exId=0", "_self");
	};
	document.getElementById("content_block").append(header);

	for (var i = 0; i < list.length; i++) 
	{
		let data_of_box = {
			"isDeleting":"false",
			"id":i,
			"url":("index.html?type=days&exId="+i)
		}
		AddBox(data_of_box, list);
	}
}
function CreateDaysPage(obj)
{
	header = document.createElement('div');
	header.classList.add('header');
	header.innerText = obj.name;
	header.onclick = function(){
		const name = prompt("Введите новое название:");
		if(name)
		{
			obj.name = name;
			localStorage.setItem('data', JSON.stringify(data));
			window.location = window.location.href;
		}
	};
	pen = document.createElement('img');
	pen.src = 'pen.svg';
	pen.classList.add('icon');
	header.append(pen);
	document.getElementById("content_block").append(header);

	addDay = document.createElement('div');
	addDay.classList.add('box');
	addDay.innerText = 'Добавить новую тренировку';
	addDay.onclick = function(){
		let now = new Date(); let date_str = now.getDate()+'.'+now.getMonth()+'.'+now.getFullYear();
		obj.days.unshift({"name":date_str,"sets":[]});
		localStorage.setItem('data', JSON.stringify(data));
		let url = "index.html?type=sets&exId="+exId+"&dayId=0";
		window.open(url, "_self");
	};
	document.getElementById("content_block").append(addDay);

	for (var i = 0; i < obj.days.length; i++) 
	{
		let data_of_box = {
			"isDeleting":"false",
			"id":i,
			"url":("index.html?type=sets&exId="+exId+"&dayId="+i)
		}
		AddBox(data_of_box, obj.days);
	}
}
function CreateSetsPage(obj)
{
	header = document.createElement('div');
	header.classList.add('header');
	header.innerText = data[exId].name;
	document.getElementById("content_block").append(header);

	addSet = document.createElement('div');
	addSet.classList.add('box');
	addSet.innerText = 'Добавить подход';
	addSet.onclick = function(){
		obj.sets.unshift({"weight":"0", "times":"0"});
		localStorage.setItem('data', JSON.stringify(data));
		window.location = window.location.href;
	};
	document.getElementById("content_block").append(addSet);

	for (var i = 0; i < obj.sets.length; i++) 
	{
		let number = obj.sets.length-i;
		let id = i;
		let data_of_box = {
			"isDeleting":"false",
			"id":i
		}
		box = document.createElement('div');
		box.classList.add('box');
		box.innerText = "Подход #"+(number)+"\nвес: "+obj.sets[i].weight+" кол-во: "+ obj.sets[i].times;
		box.onclick = function(){
			if(data_of_box.isDeleting == "false")
			{
				const weight = parseFloat(prompt("Введите вес:"));
				const times = parseFloat(prompt("Введите кол-во:"));
				if(weight && typeof(weight) != "NaN")
					obj.sets[id].weight = weight;
				if(times && typeof(times) != "NaN")
					obj.sets[id].times = times;
				localStorage.setItem('data', JSON.stringify(data));
				window.location = window.location.href;
			}
		};
		AddDeleteButton(box, data_of_box, obj.sets);
		document.getElementById("content_block").append(box);
	}
}
function Create()
{
	let locString = document.location.search;
	let searchParams = new URLSearchParams(locString);
	pageType = searchParams.get("type");
	exId = searchParams.get("exId");
	dayId = searchParams.get("dayId");

	if(!pageType) CreateExPage(data);
	else if(pageType == "days") CreateDaysPage(data[exId]);
	else CreateSetsPage(data[exId].days[dayId]);

	if(pageType)
	{
		back = document.createElement('div');
		back.classList.add('back');
		back.innerText = "back";
		back.onclick = function(){
			if(pageType == "days") url = "index.html";
			else url = "index.html?type=days&exId="+exId;
			window.open(url, "_self");
		};
		document.getElementById("content_block").append(back);
	}
}
//alert(data[0].name);
//data.unshift({"name":"ooo"});
//alert(data[0].name);
//localStorage.setItem('ex', data);
//data2 = JSON.parse(localStorage.getItem('ex'));
//let json = JSON.stringify(data);
//alert(json);
//alert(localStorage.getItem('first'));

/*let data = [
	{
		"name":"jumping",
		"days":
		[
			{
			"name":"15.12.20",
			"sets":
			[
				{
					"weight":"12",
					"times":"10"
				},
			]
			},
			{
			"name":"14.12.20",
			"sets":
			[
				{
					"weight":"11",
					"times":"9"
				},
			]
			}
		]
	},
	{
		"name":"Running"
	},
	{
		"name":"C"
	}
]
*/