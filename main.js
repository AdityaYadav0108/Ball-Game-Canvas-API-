const countrySelect = document.getElementById("countrySelect");
const date = document.getElementById("date");
const totalCases = document.getElementById("totalCases");
const totalDeaths = document.getElementById("totalDeaths");
const active = document.getElementById("active");
const recovered = document.getElementById("recovered");
const population =  document.getElementById("population");
const errorDisplay = document.getElementById("errorDisplay");

const url = "https://disease.sh/v3/covid-19/countries";
document.addEventListener("DOMContentLoaded", start());


async function getData(){
    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Something went wrong with the API")
        }
        else{
            const data = await response.json();
            return data;
        }
    }catch(error){
        errorDisplay.textContent = `${error}`;
        errorDisplay.style.visibility = "visible";
        console.log(error);
    }
   
}

async function setCountry(data) {
    
    const countries = data.map((e)=>{
        return e.country;
    })
    countries.forEach((element,index) => {

        let option = document.createElement("option");
        option.value = index;
        option.text = element;
        countrySelect.append(option);
    });
    return countries;
}

async function setData(){
    const data = await getData();
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];

    totalCases.textContent = data[selectedOption.value].cases;
    totalDeaths.textContent = data[selectedOption.value].deaths;
    active.textContent = data[selectedOption.value].active;
    recovered.textContent = data[selectedOption.value].recovered;
    population.textContent = data[selectedOption.value].population;
}

function setDate(){
    const currDate = new Date();
    const dateOfMonth = currDate.getDate();
    const monthName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthName[currDate.getMonth()];
    const year = currDate.getFullYear();
    const daysName= ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
    const day = daysName[currDate.getDay()-1];

    date.textContent = `${day}, ${dateOfMonth} ${month} ${year}`
}
    

async function start() {
    setDate();
    const data = await getData();
    await setCountry(data);
}


