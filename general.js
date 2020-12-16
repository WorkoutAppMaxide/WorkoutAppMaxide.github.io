let obj = JSON.parse(localStorage.getItem('obj'));
if(!obj)
	obj = [];
function CreateExPage()
{
	addEx = document.createElement('div');
	addEx.classList.add('addEx');
	addEx.innerText = 'Add new exercise';
	addEx.onclick = function(){
		obj.unshift({"name":"exercise","days":[]});
		localStorage.setItem('obj', JSON.stringify(obj));
		window.open("date.html?id=0", "_self");
	};
	document.getElementById("content_block").append(addEx);

	for (var i = 0; i < obj.length; i++) 
	{
		let isDeleting = false;
		let id = i;
		box = document.createElement('div');
		box.classList.add('box');
		box.innerText = obj[i].name;
		let url = "date.html?id="+i;
		box.onclick = function(){
			if(!isDeleting)
				window.open(url, "_self");
		};
		remove = document.createElement('img');
		remove.src = 'trash.svg';
		remove.classList.add('trash');
		remove.onclick = function(){
			obj.splice(id, 1)
			localStorage.setItem('obj', JSON.stringify(obj));
			window.location = window.location.href;
			isDeleting = true;
		};
		box.append(remove);
		document.getElementById("content_block").append(box);
	}
}

function CreateDatePage()
{
	var locString = document.location.search;
	var searchParams = new URLSearchParams(locString);
	var id = searchParams.get("id");

	title = document.createElement('div');
	title.classList.add('addEx');
	title.innerText = obj[id].name;
	title.onclick = function(){
		const name = prompt("Input new title:");
		if(name)
		{
			obj[id].name = name;
			localStorage.setItem('obj', JSON.stringify(obj));
			let url = "date.html?id="+id;
			window.open(url, "_self");

		}
	};
	pen = document.createElement('img');
	pen.src = 'pen.svg';
	pen.classList.add('trash');
	title.append(pen);
	document.getElementById("content_block").append(title);

	addDay = document.createElement('div');
	addDay.classList.add('box');
	addDay.innerText = 'Add new workout';
	addDay.onclick = function(){
		let now = new Date();
		let date_str = now.getDate()+'.'+now.getMonth()+'.'+now.getFullYear();
		obj[id].days.unshift({"name":date_str,"sets":[]});
		localStorage.setItem('obj', JSON.stringify(obj));
		let url = "sets.html?day_id="+id+"&id=0";
		window.open(url, "_self");
	};
	document.getElementById("content_block").append(addDay);

	days = obj[id].days;
	for (var i = 0; i < days.length; i++) 
	{
		let isDeleting = false;
		let day_id = i;
		box = document.createElement('div');
		box.classList.add('box');
		box.innerText = days[i].name;
		let url = "sets.html?day_id="+id+"&id="+i;
		box.onclick = function(){
			if(!isDeleting)
				window.open(url, "_self");
		};
		remove = document.createElement('img');
		remove.src = 'trash.svg';
		remove.classList.add('trash');
		remove.onclick = function(){
			days.splice(day_id, 1)
			localStorage.setItem('obj', JSON.stringify(obj));
			window.location = window.location.href;
			isDeleting = true;
		};
		box.append(remove);
		document.getElementById("content_block").append(box);
	}
	back = document.createElement('div');
	back.classList.add('back');
	back.innerText = "back";
	back.onclick = function(){
		url = "index.html";
		window.open(url, "_self");
	};
	document.getElementById("content_block").append(back);
}

function CreateSetsPage()
{
	var locString = document.location.search;
	var searchParams = new URLSearchParams(locString);
	var id = searchParams.get("id");
	var day_id = searchParams.get("day_id");

	title = document.createElement('div');
	title.classList.add('addEx');
	title.innerText = obj[day_id].name;
	document.getElementById("content_block").append(title);

	addSet = document.createElement('div');
	addSet.classList.add('box');
	addSet.innerText = 'Add new set';
	addSet.onclick = function(){
		obj[day_id].days[id].sets.unshift({"weight":"0", "times":"0"});
		localStorage.setItem('obj', JSON.stringify(obj));
		window.location = window.location.href;
	};
	document.getElementById("content_block").append(addSet);

	sets = obj[day_id].days[id].sets;
	for (var i = 0; i < sets.length; i++) 
	{
		isDeleting = false;
		box = document.createElement('div');
		box.classList.add('box');
		let number = sets.length-i;
		box.innerText = "Set#"+(number)+"   weight: "+sets[number-1].weight+" times: "+ sets[number-1].times;
		box.onclick = function(){
			if(!isDeleting){
				const weight = parseFloat(prompt("Input new weight:"));
				const times = parseFloat(prompt("Input new times:"));
				if(weight && typeof(weight) != "NaN")
					sets[number-1].weight = weight;
				if(times && typeof(times) != "NaN")
					sets[number-1].times = times;
				localStorage.setItem('obj', JSON.stringify(obj));
				window.location = window.location.href;
			}
		};
		remove = document.createElement('img');
		remove.src = 'trash.svg';
		remove.classList.add('trash');
		remove.onclick = function(){
			sets.splice(number-1, 1)
			localStorage.setItem('obj', JSON.stringify(obj));
			window.location = window.location.href;
			isDeleting = true;
		};
		box.append(remove);
		document.getElementById("content_block").append(box);
	}
	back = document.createElement('div');
	back.classList.add('back');
	back.innerText = "back";
	back.onclick = function(){
		url = "date.html?id="+day_id;
		window.open(url, "_self");
	};
	document.getElementById("content_block").append(back);
}
//alert(obj[0].name);
//obj.unshift({"name":"ooo"});
//alert(obj[0].name);
//localStorage.setItem('ex', obj);
//obj2 = JSON.parse(localStorage.getItem('ex'));
//let json = JSON.stringify(obj);
//alert(json);
//alert(localStorage.getItem('first'));


/*let obj = [
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