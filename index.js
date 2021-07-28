// Getting All required Ellements

let inputArea = document.querySelector('.inputField input');
let addInputButton = document.querySelector('.inputField button');
let todoList = document.querySelector('.todoList');
let clearAll = document.querySelector('.footer button');

//
inputArea.onkeyup = () => {
	let userData = inputArea.value; // getting User Entered Values
	if (userData.trim() != 0) {
		// if user Values Are Not Only Spaces
		addInputButton.classList.add('active'); // then Active The Button
	} else {
		addInputButton.classList.remove('active'); // if spaces Then Remove/ Unactive the Button
	}
};

showTasks();
//if User click on Add Button

addInputButton.onclick = () => {
	let userData = inputArea.value; // getting User Entered Values
	let localStorageDatabase = localStorage.getItem('New Todo'); // Getting Local Storage
	if (localStorageDatabase == null) {
		// If no data, create an array
		//if Local Storage is Null Then
		listArr = []; //Create Blank Array
	} else {
		listArr = JSON.parse(localStorageDatabase);
		// Otherwise, convert the localStorage string to an array
	}
	listArr.push(userData); // Add new data to localStorage Array
	localStorage.setItem('New Todo', JSON.stringify(listArr)); // Save back to localStorage
	showTasks();
	addInputButton.classList.remove('active');
};

//Function to add task list nside ul

function showTasks() {
	let localStorageDatabase = localStorage.getItem('New Todo');
	if (localStorageDatabase == null) {
		listArr = [];
	} else {
		listArr = JSON.parse(localStorageDatabase);
	}
	let pendingTasks = document.querySelector('.pendingTasks');
	pendingTasks.textContent = listArr.length; // passing the length value in Pending tasks
	if (listArr.length > 0) {
		clearAll.classList.add('active');
	} else {
		clearAll.classList.remove('active');
	}

	let getListTags = '';
	listArr.forEach((element, index) => {
		getListTags =
			getListTags +
			`<li> ${element} <span onclick="deleteTask(${index})";> <i class="fas fa-trash-alt"></i></span></li>`;
	});
	todoList.innerHTML = getListTags; //adding new li tag inside ul tag
	inputArea.value = ''; //once task added leave the input field blank
}

//delete Tasks function

function deleteTask(index) {
	let localStorageDatabase = localStorage.getItem('New Todo');
	listArr = JSON.parse(localStorageDatabase);
	listArr.splice(index, 1); // splice will remove element from index/ or replace item from array
	// After Remove the li again update the local storage
	localStorage.setItem('New Todo', JSON.stringify(listArr));
	showTasks();
}

// clear All Button function

clearAll.onclick = () => {
	listArr = []; // Empty the array
	// After Remove all task  again update the local storage
	localStorage.setItem('New Todo', JSON.stringify(listArr));
	showTasks();
};
