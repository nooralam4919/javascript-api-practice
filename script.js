const input = document.querySelector("#input");
const btn = document.querySelector('#btn');

// function updateLocation(city){
//     const locationDiv = document.getElementById("location");
//     locationDiv.innerText = "";

//     const li = document.createElement('span');
//     li.innerText = city;

//     locationDiv.appendChild(li);
// }
// btn.addEventListener('click', function(e){
//     if(input.value.trim()  === '')
//         return;
//     const val = input.value;
//     console.log(val);
//     getTemp(val);
//     // updateLocation(val);
// })


// input.addEventListener('keydown', function(e) {
//     if (e.key === "Enter") {
//         const val = input.value.trim();
//         if (val === '') return;

//         getTemp(val);
//     }
// });


btn.addEventListener('click', handleSearch);

input.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        handleSearch();   
    }
});

function handleSearch(){
    const val = input.value.trim();
    if(val === '') return ;
    getDetail(val);
    input.value = "";
}


function setLocation(cityy, country){
    const getLoc = document.querySelector('#location');
    getLoc.innerText =  "";

    const spn = document.createElement('span');
    spn.innerText = cityy + " , " + country;

    getLoc.appendChild(spn);
}

// function addOptiLanguage(langName){
//         const li = document.createElement('li');
//         li.appendChild(document.createTextNode(langName))
//         document.querySelector('.language').appendChild(li)
//     }


function setTemp(temp){
    const tempDiv = document.querySelector('#tempVal');

    tempDiv.innerHTML = "";  

    const spn = document.createElement('span');
    spn.textContent = temp + "°C";

    tempDiv.appendChild(spn);

    const body = document.body;

    // hot weather
    if(temp >= 30){
        body.style.backgroundColor = "red";
    }
    // normal weather
    else if(temp >= 15){
        body.style.backgroundColor = "orange";
    }
    // cold weather
    else{
        body.style.backgroundColor = "blue";
    }
}

function setWindSpeed(wind)
{
    // const windInMile = document.getElementById('windspeed');
    // wind.innerText = ""
    // const span = document.createElement('span')
    // span.innerText = wind + "" +" m/s";
    // windInMile.appendChild(span);

    document.getElementById('windspeed').innerText = wind + "m/s";

}

function setPre(pres){
    document.getElementById("press").innerText = pres + "hPa";
}

// both are correct

// function setTemp(temp){
//     document.querySelector('#tempValue').textContent = temp + "°C";
// }

function setHumdity(humi)
{
    document.getElementById('humidi').innerText = humi + "%";
}


async function getDetail(city) {
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0364bd03ed6742ca8b6210641262304&q=${city}&aqi=yes`);
        
        const data = await response.json();
        console.log(data)
        const cityy =  data.location.name;
        const country =  data.location.country
        const temp = data.current.temp_c;
        // console.log(temp);
        setLocation(cityy, country);
        setTemp(temp);
        console.log(data.current.wind_mph);
        console.log(" pressure", data.current.pressure_in);
        // console.log(" humidity", data.current.humidity);
        const humidity = data.current.humidity;
        setHumdity(humidity);
        const setPre = data.current.pressure_in;
        const wind = data.current.wind_mph
        setWindSpeed(wind)
    }
    catch(error){
        console.log("this is the error", error);
    }
}