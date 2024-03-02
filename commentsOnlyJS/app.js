
// /* Global Variables */
//----Creat a new date
let d = new Date()
let newDate = d.toDateString()
//Personal API Key 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
//units=metric to get celsius temp
const apiKey = ",&appid=abfc83a912a72ff32aaf6819e08cade2&units=metric"

//URL of the Server to Post Data
const server = "http://localhost:4800"

// -----------------------
const generateData = () => {
    //Get value after click on btn
    const zip = document.getElementById("zip").value
    const feelings = document.getElementById("feelings").value

    //get data 
    getWeatherData(zip).then((data) => {
        if (data) {
            const {
                main: { temp },
                weather: [{ description }]
            } = data
            //------
            const info = {
                newDate,
                temp: Math.round(temp),
                description,
                feelings
            }
            postDate(server + "/add", info)
            updateUI()
        }
    })
}
//-----------------------
let btn = document.querySelector("#generate")
btn.onclick = () => {
    //click btn
    btn.classList.toggle("click")
    setTimeout(() => {
        btn.classList.toggle("click")
    }, 180);
    generateData()
}
//----------------------------
//erorCode
const catchError = (error) => { 'Some Been Error >>', error }
//----------------------------
const getWeatherData = async (zip) => {
    try {
        const res = await fetch(apiUrl + zip + apiKey);
        const data = await res.json();
        if (data.cod != 200) {
            return alert(data.message)
        }
        return data
    } catch (error) {
        catchError(error)
    }
}

//------------------------
const postDate = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })
    try {
        const newDate = await res.json()
        console.log("Saved", newDate)
        return newDate
    } catch (error) {
        catchError(error)
    }
}
const updateUI = async () => {
    let res = await fetch(`${server}/all`)
    try {
        const saveData = await res.json()
        document.getElementById("date").innerHTML = saveData.newDate
        document.getElementById("temp").innerHTML = saveData.temp + '&degC'
        document.getElementById("description").innerHTML = saveData.description
        document.getElementById("content").innerHTML = saveData.feelings
    } catch (error) {
        catchError(error)
    }
}

