const weatherContainer = document.querySelector('.weather__container')
const weatherRegion = document.querySelector('.weather__region')
const weatherImg = document.querySelector('.weather__img')
const weatherDegree = document.querySelector('.weather__degree')
const weatherDesc = document.querySelector('.weather__desc')
const form = document.querySelector('.header__forms')
const searchinput = document.querySelector('.header__input')
const weatherForecast = document.querySelector('.weather__forecast')
const weatherDays = document.querySelector('.weather__days')

document.addEventListener('DOMContentLoaded', () => {
    getWeather()
})

async function getWeather(region = "Tashkent") {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`)

    res
        .json()
        .then(res => {
            if (res.error) {
                throw new Error("Bunday shahar mavjud emas")
            }
            mapWeather(res)
            console.log(res);
        })
        .catch(err => {
            alert(err)
        })
}

function mapWeather(data) {
    weatherRegion.innerHTML = `${data.location.name}. ${data.location.country}`
    weatherImg.src = data.current.condition.icon
    weatherDegree.innerHTML = `${data.current.temp_c}°C`
    weatherDesc.innerHTML = data.current.condition.text

    let forecastHour = ""
    let hour = new Date().getHours()

    data.forecast.forecastday[0].hour.slice(hour + 1).forEach(hour => {
        forecastHour += `
            <div class="weather__item">
                <p class="weather__item-hour">${hour.time.split(" ")[1]}</p>
                <img class="weather__item-img" src=${hour.condition.icon} alt="img">
                <p class="weather__item-temp">${hour.temp_c}°C</p>
                <div class="weather__humidity-box">
                    <img src="./images/humidity.svg" alt="img">
                    <p class="weather__humidity">${hour.humidity}</p>
                </div>
            </div>
        `
    })

    weatherForecast.innerHTML = forecastHour

    let forecastDay = ""

    let DAY = new Date().getDay()

    let Day

    switch (DAY) {
        case 0:
            Day = "Sunday"
            break
        case 1:
            Day = "Monday"
            break
        case 2:
            Day = "Tuesday"
            break
        case 3:
            Day = "Wednesday"
            break
        case 4:
            Day = "Thursday"
            break
        case 5:
            Day = "Friday"
            break
        case 6:
            Day = "Saturday"
    }


    data.forecast.forecastday.forEach(days => {
        forecastDay += `
            <div class="weather__day">
                <h3 class="weather__day-title">${days.date}</h3>
                <div class="weather__day-info">
                    <p>${days.day.condition.text}</p>
                    <img src=${days.day.condition.icon} alt="">
                    <p class="weather__day-temp">${days.day.maxtemp_c}°C</p>
                    <p class="weather__day-temp">${days.day.mintemp_c}°C</p>
                </div>
            </div>
        `
    })

    weatherDays.innerHTML = forecastDay
}

form.addEventListener('submit', e => {
    e.preventDefault()
    getWeather(searchinput.value)
})


