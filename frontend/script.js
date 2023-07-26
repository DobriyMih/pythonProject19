window.onload = (event => {
  const form = document.querySelector('#add-new-event');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    fetch('http://127.0.0.1:5000/create_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        // Додатковий код для обробки отриманих даних
      })
      .catch(error => console.error(error));
  });
});

function sendRequestToServer(form, url) {

    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => { resolve(data) })
        .catch((error) => {
            console.error("Помилка:", error);
            reject(error);
        });
    });
}

const routes = [
    { path: '/', handler: homeHandler },
    { path: '/login.html', handler: loginHandler},
     { path: '/signup.html', handler: signupHandler},
      { path: '/main.html', handler: homeHandler},
];

function loginHandler () {
.then(data => {
    localStorage.setItem('token', data.token);
    if (data.isLogged) {
                 location.replace('/index.html')
    };
    })
}

function signupHandler () {
.then(data => {
    if (data.isAddedToDB ) {
                location.replace('/login.html')
    };
    })}

function homeHandler () {
const dateToDisplay = convertStringToDate(date)
getEventsByDate(date)
.then(data => showEvents(data, dateToDisplay))
}

function handlerRoutes () {
    const currentPath = window.location.pathname;
    const routeData = routes.find(route => route.path === currentPath);
    if (routeData) {
        routeData.handler();
        }
    else {homeHandler()}
}

function loginHandler () {
    const loginForm = document.querySelector('#login-form');
    const urlLogin = 'http://127.0.0.1:5000/login';
    loginForm.addEventListener('submit', (event) => {
                 event.preventDefault();
                 sendRequestToServer(event.target, urlLogin)
                 .then(data => console.log(data))

    })

sendRequestToServer(event.target, urlLogin)
.then(data => {
    localStorage.setItem('token', data.token);
    console.log(data);
})
localStorage.setItem('token');
    console.log(data);

function getEventsByDate (date) {
    const token = localStorage.getItem('token');
    const  apiUrl = `http://127.0.0.1:5000/get_events_by/${date}`};

    return fetch(apiUrl, {
        method: "GET",
            headers: { Authorization: `Bearer $ {token}`}
        })
        .then(response => response.json())
        .catch(error => {
        console.error('Error:', error);
        });
    }

function homeHandler () {
    const eventForm =
document.querySelector('#add-new-event');
    const urlEvent = 'http://127.0.0.1:5000/create_event';
    const today = new Date(). toISOSstring();

    getEventsByDate(today)
    .then(data => console.log(data))

    eventForm.addEventListener('submit', (event) => {
            event.preventDefault();
            sendRequestToServer(event.target, urlEvent)
            .then(data => console.log(data))
    })
}
const token = localStorage.getItem('token');
let headersData = { "Content-type": "application/json"};

if token
headersData.Authorization = `Bearer ${token}`;

fetch(url, {
    method:"POST",
    headers:headersData,
    body:JSON.stringify(data,
    )}
)

const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', (event) => {
    logout();
})
function logout () {
    localStorage.removeItem('token');
    location.replace('/login.html')}


function showEvents(eventsFromAPI, date) {
    const eventsDiv = document.getElementById('events-for-five-days');

    const dayEventsDiv = document.createElement('div');
    dayEventsDiv.classList.add('sighle-day');

    const date = JSON.parse(eventsFromAPI[0]).date;}
    const displayData = document.createElement('h2');
    displayData.textContent = date;
    dayEventsDiv.appendChild(displayData);

    eventsFromAPI.forEach{ function (event)  {
        event = JSON.parse(event)
         const header = document.createElement('h3');
         header.textContent = event.header;
         header.role = "button";

         const time = document.createElement('span');
         if (event.time !== underfined) {time.textContent = event.time}

          const describe = document.createElement('p');
          describe.textContent = event.describe;
          describe.style.display = 'none';

          header.addEventListener('click', function() {
          describe.style.display = describe.style.display === 'none' ? 'block' :
    'none';
        });
        }
          }

function convertStringToDate(str) {
    return new Date(str).toLocaleDateString();}

function renderEventsForFiveDays () {
    const endDate = new Date ();
    endDate.setDate (endDate.getDate() + 5);
    let currentDate = new Date()};

    while (currentDate <= endDate) {
        console.log(currentDate)
        date = currentDate.toISOSstring();
        let dateToDisplay = convertStringToDate(currentDate);

        getEventsByDate(date)
        .then(data => showEvents(data, dateToDisplay) )
        currentDate.setDate(currentDate.getDate() + 1);
    }
}