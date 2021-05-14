var eventArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }

];

var filterEvents = eventArray;

function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(eventArray.map((event) => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats()

}

function displayStats() {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;
    for (let i = 0; i < filterEvents.length; i++) {
        currentAttendance = filterEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;

        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }


    }
    average = total / filterEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

//get the event for the selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventArray")) || eventArray;
    filterEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`
    if (city != "All") {
        filterEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }

        })
    }
    displayStats();
}


loadAddressBook();

function loadAddressBook() {
    let addressBook = [];
    addressBook = getData();
    displayData(addressBook);
}

function getData() {
    let addressBook = JSON.parse(localStorage.getItem("eventArray")) || [];

    if (addressBook.length == 0) {
        addressBook = eventArray;
        localStorage.setItem("eventArray", JSON.stringify(addressBook));
    }
    return addressBook;
}

function saveEvent() {
    //grab the events out of local storage
    let addressBook = JSON.parse(localStorage.getItem("eventArray")) || eventArray;

    let obj = {};
    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;


    addressBook.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(addressBook));

    //Access the values from the form by ID and add an object to the array.
    displayData(addressBook);
}

function displayData(addressBook) {

    const template = document.getElementById("resultsData-template");
    const resultsBody = document.getElementById("resultsBody");
    //clear table first
    resultsBody.innerHTML = "";
    for (let i = 0; i < addressBook.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("event").textContent = addressBook[i].event;
        dataRow.getElementById("city").textContent = addressBook[i].city;
        dataRow.getElementById("state").textContent = addressBook[i].state;
        dataRow.getElementById("attendance").textContent = addressBook[i].attendance;
        dataRow.getElementById("date").textContent = (addressBook[i].date);

        resultsBody.appendChild(dataRow);
    }
}