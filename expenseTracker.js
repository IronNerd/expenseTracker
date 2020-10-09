"use strict";
// #########################
//window.localStorage.clear();
// #########################
function restoreFromStorage() {
  console.log(
    `1) Reading back the previously saved tableData array from storage.`
  );
  let bufferContent = JSON.parse(window.localStorage.getItem("tableData"));
  console.log(`Done!!
`);
  // INITIAL PROCEDURE WHEN App STARTS:
  if (bufferContent == undefined) {
    // first run procedure
    console.log(`2) Nothing in storage. Loading placeholder row to buffer...`);
    bufferContent = [
      `<p class = "expenseItem" ><span class = "date" ></span><button class="eraseExpense" >x</button><span class = "description" >1st item could be your starting balance :-)</span><span class="amount" ></span ></p>`,
    ];
    console.log(`Done!!
  `);
    console.log(`bufferContent: ${bufferContent}`);
  } else {
    console.log(`3) Pre-existing data in storage found!!`);
  }

  console.log(`Extracting rowsData from bufferContent.
  `);
  let rowsData = "";
  for (
    let pointerToRow = 0;
    pointerToRow < bufferContent.length;
    pointerToRow++
  ) {
    const row = bufferContent[pointerToRow];
    rowsData = rowsData + row;
  }
  console.log(`Done!!
  `);
  console.log(`Data extracted: ${rowsData}`);
  console.log(`Injecting data extracted to DOM:`);
  let rowsParent = document.querySelector("#parent");
  rowsParent.innerHTML = rowsData;
  console.log(`Done!!
  `);
}
restoreFromStorage();
/* 
let RetrieveBtn = document.querySelector('#readBack');
RetrieveBtn.addEventListener('click', restoreFromStorage);
*/

// Declare variables that hold user data
let dateDatum;
let amountDatum;
let descriptionDatum;

// Define required to create DOM elements
let date;
let amount;
let description;
let main;
let p;
let span;
let button;
/*
// ########################
// Prevent form data submital default action
function blockSubmital(e) {
  e.preventDefault(); // Don't send data to server
  var inputSource = e.target;
  // console.log(inputSource);
}
// Listen to any form data submittal events to be blocked
let submitDataToServer = document.getElementById("dummyServer");
submitDataToServer.addEventListener("click", blockSubmital);
*/
// ########################

// Determines today's date
let today = new Date();
// console.log(`1) Today's date: ${today}`);
// console.log(`1) ${yearNow}-${monthNow}-${dayNow}`);

// Fix month's digit format to be two digits length
function fixMonthFormat() {
  let monthNow = today.getMonth() + 1;
  // console.log(`1) monthNow is a number? ${!isNaN(monthNow)}`);
  // console.log(`2) monthNow: ${monthNow}`);
  let monthStrLength = monthNow.toString().length;
  // console.log(`3) monthStrLength: ${monthStrLength}`);
  if (monthStrLength == 1) {
    // Fix adding zero to the left
    monthNow = `0${monthNow}`;
  }
  // console.log(`4) monthNow: ${monthNow}`);
  return monthNow;
}
// Fix day's digit format to be two digits
function fixDayFormat() {
  let dayNow = today.getDate();
  // console.log(`5) dayNow is a number? ${!isNaN(dayNow)}`);
  // console.log(`6) dayNow: ${dayNow}`);
  let dayStrLength = dayNow.toString().length;
  // console.log(`7) dayStrLength: ${dayStrLength}`);
  if (dayStrLength == 1) {
    // Fix adding zero to the left
    dayNow = `0${dayNow}`;
    // console.log(`8) dayNow: ${dayNow}`);
  }

  return dayNow;
}
// Assemble year, month, week to obtain today's date in correct format
function dateNow() {
  let yearNow = today.getFullYear();
  let monthNow = fixMonthFormat();
  let dayNow = fixDayFormat();
  let dateNow = `${yearNow}-${monthNow}-${dayNow}`;
  // console.log(`9) dateNow: ${dateNow}`);
  return dateNow;
}
// Once the date input field is clicked, load it with today's date
function loadTodaysDate() {
  let dateToday = dateNow();
  // Fills out date field with today's date
  document.getElementById("date").value = dateToday;
}
// Event listener to load date field with today's date
let dateInputField = document.getElementById("date");
dateInputField.addEventListener("click", loadTodaysDate);

// ########################
// functions 1 thru 5 are called by postExpense() function

// ***** 1 ***** Capture all data fields content
function fetchNewData() {
  // Capture all data fields content
  dateDatum = document.getElementById("date").value;
  amountDatum = document.getElementById("amount").value;
  descriptionDatum = document.getElementById("description").value;
  // console.log(`
  //  ${dateDatum}
  //  ${amountDatum}
  //  ${descriptionDatum}`);
}

// ***** 2 ***** Fill each element's field
function populateRecordFields() {
  // Fill each element's field
  date.textContent = dateDatum;

  // console.log(`amountDatum is a number: ${!isNaN(amountDatum)}`);
  // amountDatum = amountDatum.toFixed(2);
  //amountDatum = Math.round(100 * amountDatum) / 100;
  let criteria =
    Math.round(100 * Math.abs(amountDatum)) / 100 -
    Math.floor(Math.round(100 * Math.abs(amountDatum)) / 100);
  if (criteria == 0) {
    amountDatum = `${amountDatum}.00`;
  }

  amount.textContent = amountDatum;
  description.textContent = descriptionDatum;
  button.textContent = "x";
}

// ***** 3 ***** Assemble the record of interest
function assembleNewTableRow() {
  // Assemble the record of interest
  p.appendChild(date);
  p.appendChild(button);
  p.appendChild(description);
  p.appendChild(amount);
}

// ***** 4 ***** Append captured data to grid
function appendRecord() {
  // Append captured data to grid
  main = document.getElementsByTagName("main")[0];
  // console.log(`appended data: ${p}`);
  main.appendChild(p);
  // Updatealso  dataTable array for backup purposes
}

// ***** 5 ***** Clear form
function resetForm() {
  // ***** 5 ***** Clear form
  document.getElementById("dummyServer").reset();
}
/**/

// Post expense to expense list
function postExpense() {
  // MAIN
  // Declare variables
  dateDatum;
  amountDatum;
  descriptionDatum;
  // Define required DOM elements
  p = document.createElement("p");
  date = document.createElement("span");
  amount = document.createElement("span");
  description = document.createElement("span");
  button = document.createElement("button");

  // Add classes to each DOM element
  date.classList.add("date");
  amount.classList.add("amount");
  description.classList.add("description");
  p.classList.add("expenseItem");
  button.classList.add("eraseExpense");

  // Capture all data fields content
  fetchNewData(); // ***** 1 *****

  // Fill each element's field
  populateRecordFields(); // ***** 2 *****

  // Assemble the record of interest
  assembleNewTableRow(); // ***** 3 *****

  // Attach new record to DOM
  appendRecord(); // ***** 4 *****

  // Clear form
  resetForm(); // ***** 5 *****

  backupToStorage(); // To save all table rows to an array
}

// ********************
//    MAIN ENTRY POINT:
// ********************

// Listen to form data submittal button event
let postBtn = document.getElementById("post");
postBtn.addEventListener("click", postExpense);

// ########################
// Post current balance after every new expense posting
function postBalance() {
  // Post current balance
  function balanceArray() {
    let allAmountValues = document.getElementsByClassName("amount");
    // console.log(`${allAmountValues}`);
    let netBalanceArray = [];
    for (let index = 0; index < allAmountValues.length; index++) {
      const element = parseInt(100 * allAmountValues[index].innerHTML) / 100;
      netBalanceArray.push(element);
      // console.log(`netBalanceArray: ${netBalanceArray}`);
    }
    return netBalanceArray;
  }
  let netBalanceArray = balanceArray();

  function netBalance() {
    var netBalance = netBalanceArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    // console.log(`netBalance: ${netBalance}`);
    return netBalance;
  }
  //Define how the balance looks on screen
  netBalance = netBalance();
  netBalance = netBalance.toFixed(2);
  document.getElementById("netBalance").innerHTML = netBalance;
  // Net Balance red color if balance is negative
  if (netBalance < 0) {
    let balanceStyle = document.getElementById("netBalance").style;
    balanceStyle.fontWeight = "bold";
    balanceStyle.backgroundColor = "lightyellow";
    balanceStyle.color = "red";
  } else {
    let balanceStyle = document.getElementById("netBalance").style;
    balanceStyle.fontWeight = "normal";
    balanceStyle.backgroundColor = "white";
    balanceStyle.color = "black";
  }
}
// Listen for form data submittal button event to post balance
postBtn.addEventListener("click", postBalance);

// ########################

// Erase expense upon clicking its red button
function expenseEraser(btn) {
  // Erase expense
  let p = btn.parentNode;
  let main = btn.parentNode.parentNode;
  // console.log(`p: ${p}  main: ${main}`);
  main.removeChild(p);
  //Set trigger to update Net Balance
  // console.log(`1) Child removed!!`);
  // console.log(`2) Calling postBalance() function`);

  postBalance();
  backupToStorage(); // To save all table rows to an array
}
// Listen for any delete button click event
let parent = document.querySelector("#parent");
parent.addEventListener("click", function (e) {
  // console.log(`e.target: ${e.target}`);
  let btn = e.target;
  expenseEraser(btn); // Call expense Eraser function
});

// Update Net Balance every time page loads
postBalance();

// ####################
// TO PRESERVE DATA:
// ####################

// invoke upon deletion of an item; from within expenseEraser() function call

// Fetch data from DOM and keep it in an array

let tableData = new Array();

function fetchTableData() {
  // To save all table rows to an array
  console.log(`1) Fetching DOM tableData to array.`);
  let pCollection = document.querySelectorAll(".expenseItem");
  let pArray = Array.from(pCollection);
  tableData.length = 0;
  for (let pointerToRow = 0; pointerToRow < pArray.length; pointerToRow++) {
    const row = pArray[pointerToRow];
    tableData.push(row.outerHTML);
  }
  console.log(`tableData: ${tableData}`);
}
// Save DOM tableData array to storage
function saveToStorage() {
  console.log(`2) Saving DOM tableData to storage.`);
  window.localStorage.clear();
  window.localStorage.setItem("tableData", JSON.stringify(tableData));
  console.log(`Done!!
`);
}
// DOM table data backup function

function backupToStorage() {
  console.log(`0) DOM tableData to storage function invoked.`);
  fetchTableData();
  saveToStorage();
}
/*
let backupBtn = document.querySelector('#fetchRows');
backupBtn.addEventListener('click', backupToStorage);
*/
