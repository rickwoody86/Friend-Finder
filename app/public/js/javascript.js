//Array of textbox questions
var textboxBank=["Name", "Your Picture (ex. http://www.example.com/myImage.jpg)"];

//Array of dropdown questions
var questionBank=["Magneto is correct about humans and they should be destroyed.",
					"Peter Parker should give up on Gwen Stacy.",
					"Charles Xavier's school for the gifted helps mutants.",
					"Mutants should hide thier powers.",
					"Deadpool should join the X-Men.",
					"Beast looks better furry.",
					"Marvel is superior to DC comics.",
					"The latest Fantastic Four movie was terrible.",
					"Wolverine needs counseling.",
					"Ghost Rider needs a reboot."
					];

//Array of dropdown answers					
var answerBank = [1,2,3,4,5];

//Empty array for the answers with length of # of questions
var friendAnswers = new Array(questionBank.length).fill('');

//query API
function queryApi(){

	var newPerson = {
		name: $('#box0').val().trim(),
		img: $('#box1').val().trim(),
		scores: friendAnswers
	};	
	$.ajax({
  		type: "POST",
  		url: "/api/friends",
 		data: newPerson
	}).then(function(response){
		console.log(response);
		$('#modalContent').empty();
		$('#modalContent').css('text-align','center');
		$('#modalContent').append($('<h1>').html(response.name));
		$('#modalContent').append($('<img>').attr({src: response.img, width:"200", alt:response.name}));
		$('#modalContent').append($('<h3>').html("Score: "+response.score));

		$('#myModal').modal("show") //Show Modal
	})

	return false;
}

//Validate form
function validate(){
	var missingAns = [];

	//Check textboxes if missing data
	//Add error class to textbox if missing answer
	textboxBank.forEach(function(value, index){
		if($("#box"+index).val() === ''){
			$("#box"+index).parent(".form-group").addClass("has-error");
			$("#box"+index).addClass("textError");
			missingAns.push("#box"+index);

		}
	});

	//Check for missing answers in dropdowns
	//Replaces default class with danger class in buttons for every missing answer	
	friendAnswers.forEach(function(value, index){
		if(value===''){
			missingAns.push("#answer"+index);
			$("#answer"+index).parents('.input-group-btn').find('.dropdown-toggle').removeClass('btn-default');
			$("#answer"+index).parents('.input-group-btn').find('.dropdown-toggle').addClass('btn-danger');
		}
	});

	//Check if there were any missing answers and scroll to 1st error location
	if(missingAns.length>0){
		var errorLoc = $(missingAns[0]).parents('.questionGroup').offset().top-80; 
		$('html, body').animate({
    		scrollTop: errorLoc
    	}, 500);
	}
	else{

		queryApi();
	}
}

//Dynamically create questions for form
function createForm(){

	$("#startQuest").append("<div class=\"row\"><div class=\"col-md-6\"><h2>About You</h2</div></div>"); //About you header

	//Create name and image inputs
	textboxBank.forEach(function(value, index){
		var rowInput = $('<div>').addClass("row"); //Create Row
		var colInput = $('<div>').addClass("col-md-8"); //Create Column
		var groupInput = $('<div>').addClass("form-group questionGroup");//Create input div
		var inputBox = $('<input>', {"type":"text", "class":"form-control", "placeholder":value, "aria-describedby":"basic-addon1", "id": "box"+index}); //Create textbox
		$("#startQuest").append(rowInput.append(colInput.append(groupInput.append(inputBox))));
		
	 });
	
	//For every question in questionBank, create an element tag with the question #, question, and answer button
	questionBank.forEach(function(value, index){

		var row = $('<div>').addClass("row"); //Create Row
		var col = $('<div>').addClass("col-md-6"); //Create Column
		var group = $('<div>').addClass("input-group-btn questionGroup");	//Create button div (container)

		var button = $('<button>', {"class":"btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true",// Create button
			 "aria-expanded": "false"}).html("Choose an Option ");
		var caret = $('<span>').addClass("caret"); //Create caret for button
		button.append(caret);	//Add caret to button

		var list = $('<ul>').addClass("dropdown-menu").attr('id', "answer"+index); //Create dropdown menu
			answerBank.forEach(function(value1, index){
				var item = $('<li>').append("<a href=\"#\">"+value1+"</a>");
				list.append(item);
			});

		row.append(col.append(group.append(button, list))); //Add everything (div's, button, list) above together
		
		var questNum = $('<h3>').html("Question "+(index+1)+":"); //Question # div
		var quest = $('<h4>').html(value);	//Question div
		$("#startQuest").append(questNum, quest, row);	//Add question #, question, and dropdown to page
		
	});

	//Add submit button
	var row = $('<div>').addClass("row"); //Create Row
	var col = $('<div>').addClass("col-md-12"); //Create Column
	var para = $('<p>').addClass("submitButton");
	var button = $('<button>', {"class":"btn btn-default center", "id":"submit"}).html("Submit Survey!"); //Create button
	$("#startQuest").append(row.append(col.append(para.append(button))));
}

$(document).ready(function(){
	//Dynamically create form
	createForm();

	//Get value of dropdown when clicked
	$(".dropdown-menu li a").on("click", function(e){
		var value = parseInt($(this).find('option:selected').context.innerHTML); //value of item
		var id = parseInt($(this).parents('.dropdown-menu').attr('id').replace(/^\D+/g, '')); //id of dropdown (the question #)

		//Add answers to array, other options include using regular dropdown or still use <ul> and add a class
		//to the selected item to keep track of answer.  Decided to try it this way for fun.
		friendAnswers[id] = value; 

		if(typeof value === 'number'){//Check if valid number
			//remove error class and replace with default
			$(this).parents('.input-group-btn').find('.dropdown-toggle').removeClass('btn-danger');
			$(this).parents('.input-group-btn').find('.dropdown-toggle').addClass('btn-default');
		}
		 $(this).parents('.input-group-btn').find('.dropdown-toggle').html(value+' <span class="caret"></span>');
		  e.preventDefault(); //Prevents page from scrolling up
	});

	//Go to survey when clicked
	$("#surveyGo").on("click", function(){
		window.location.href = "/survey";
	});

	//Validate form when submit is clicked
	$('#submit').on('click', function () {
		validate();
	});

	//Remove error css if clicked into textbox
	$('.form-control').on('click', function () {
		$(this).parent(".form-group").removeClass("has-error");
		$(this).removeClass("textError");
	});

	//After clicking close (after seeing result) return to home
	$("#finished").on("click", function(){
		window.location.href = "/";
	});

});