const weatherForm =  document.querySelector('form');
const search = document.querySelector('input');
const messageLoc = document.querySelector('#message-1');
const messageDes = document.querySelector('#message-2');
const messageTemp = document.querySelector('#message-3');
const messageFeels = document.querySelector('#message-4');
const messageHumid = document.querySelector('#message-5');
const messageSpeed = document.querySelector('#message-6');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageLoc.textContent = 'Loading...';
    messageDes.textContent = '';
    messageTemp.textContent = '';
    messageFeels.textContent = '';
    messageHumid.textContent = '';
    messageSpeed.textContent = '.';
    const url = '/weather?address=' + encodeURIComponent(location);
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageLoc.textContent = data.error;
        } else {
            console.log(data.location);
            messageLoc.textContent = data.location;
            messageDes.textContent = data.weatherDes;
            messageTemp.textContent = data.temp;
            messageFeels.textContent = data.feelsLike;
            messageHumid.textContent = data.humidity;
            messageSpeed.textContent = data.windSpeed;
            console.log(data.forecast);
        }
    });
}); 

    
});