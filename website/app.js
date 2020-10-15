/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',in&APPID=f781e9803a4853247447424968c55eb4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const getTheData = async (url = '') => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// POST Data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
          // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
        });
};
const generateData = async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const response = await fetch(`${url}${zip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateData();
    } catch (error) {
        console.error("Error", error);
    }
};

const updateData = async () => {
    const projectData = await getTheData('/data');
    document.getElementById('date').innerHTML = `${projectData.date}`;
    document.getElementById('temp').innerHTML = `${projectData.temperature} &#8457`;
    document.getElementById('content').innerHTML = projectData.feelings;
};

document.getElementById('generate').addEventListener('click', generateData);

