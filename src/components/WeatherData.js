import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import WeatherCard from './WeatherCard';
function WeatherData() {
    const [city, setCity] = useState('');
    const [place, setPlace] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState('');
    const [temp, setTemp] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const handleSearch = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=597f0d42fe8e2a0dbe2c277440080878`;
        let data = await fetch(url);
        let main = await data.json();
        setPlace(main.name);
        setCountry(main.sys.country);
        setDate(new Date().toGMTString());
        setTemp((main.main.temp - 273.15));
        let mySentence =main.weather[0].description;
        const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        setDescription(finalSentence);
        setIcon(main.weather[0].icon);
        let date = new Date((main.sys.sunrise) * 1000);
        let date1 = new Date((main.sys.sunset) * 1000);
        if(date1.getHours()>12&&date.getHours()<12)
        {
            if (date1.getMinutes() < 10) {
                setSunset(`${date1.getHours()-12}:0${date1.getMinutes()} PM`);
            }
            else {
                setSunset(`${date1.getHours()-12}:${date1.getMinutes()} PM`);
            }
            if (date.getMinutes() < 10) {
                setSunrise(`${date.getHours()}:0${date.getMinutes()} AM`);
            }
            else {
                setSunrise(`${date.getHours()}:${date.getMinutes()} AM`);
            }
        }
        else if(date1.getHours()>12&&date.getHours()>12)
        {
            if (date1.getMinutes() < 10) {
                setSunset(`${date1.getHours()-12}:0${date1.getMinutes()} PM`);
            }
            else {
                setSunset(`${date1.getHours()-12}:${date1.getMinutes()} PM`);
            }
            if (date.getMinutes() < 10) {
                setSunrise(`${date.getHours()-12}:0${date.getMinutes()} PM`);
            }
            else {
                setSunrise(`${date.getHours()-12}:${date.getMinutes()} PM`);
            }
        }
        else if(date1.getHours()<=12&&date.getHours()<=12)
        {
            if (date1.getMinutes() < 10) {
                setSunset(`${date1.getHours()}:0${date1.getMinutes()} AM`);
            }
            else {
                setSunset(`${date1.getHours()}:${date1.getMinutes()} AM`);
            }
            if (date.getMinutes() < 10) {
                setSunrise(`${date.getHours()}:0${date.getMinutes()} AM`);
            }
            else {
                setSunrise(`${date.getHours()}:${date.getMinutes()} AM`);
            }    
        }
        else
        {
            if (date1.getMinutes() < 10) {
                setSunset(`${date1.getHours()}:0${date1.getMinutes()} AM`);
            }
            else {
                setSunset(`${date1.getHours()}:${date1.getMinutes()} AM`);
            }
            if (date.getMinutes() < 10) {
                setSunrise(`${date.getHours()-12}:0${date.getMinutes()} PM`);
            }
            else {
                setSunrise(`${date.getHours()-12}:${date.getMinutes()} PM`);
            }       
        }
        setHumidity(main.main.humidity);
        setWind(main.wind.speed);
    }
    useEffect(() => {
        handleSearch(); // eslint-disable-next-line
    },[])
    return (
        <div className="weather" style={{ width: '100%', minHeight: '100vh' }}>
            <div className="container">
                <div class="card my-2">
                    <div class="card-body">
                        <h2 class="card-title text-white mt-4">Weather App <i class="fa fa-cloud-sun"></i></h2>
                        <form class="d-flex mt-5" role="search">
                            <input class="form-control me-2 mx-5" type="search" placeholder="Enter City To Search" aria-label="Search" value={city} onChange={(res) => setCity(res.target.value)} />
                            <Button color="success" variant="contained" style={{ width: '140px', borderRadius: '10px' }}
                                onClick={handleSearch}>Search</Button>
                        </form>
                        <WeatherCard place={place} country={country} date={date} description={description} sunrise={sunrise} sunset={sunset} humidity={humidity} wind={wind} icon={icon}  temp={temp}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherData



