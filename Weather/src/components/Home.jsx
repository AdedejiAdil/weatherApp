import {  useState } from "react";
import "./Home.css";
import axios from "axios";

import search_icon from "../assets/search.svg";
import clear_icon from "../assets/clear.png";
import clouds_icon from "../assets/clouds.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import mist_icon from "../assets/mist.png";
import rain_icon from "../assets/rain.png";
import wind_icon from "../assets/wind.png";
import snow_icon from "../assets/snow.png";

function Home() {
  const [data, setData] = useState({
    celsius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: {clouds_icon}
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [wicon, setWicon] = useState(clouds_icon);

  const handleChange = (e) => setName(e.target.value);
  const handleClick = () => {
    if (name !== "") {
      const API_KEY = "6ed9f5e5328d89162864d6984098182c";
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&&units=metric`;
      axios
        .get(API_URL)
        .then((res) => {
          if (res.data.weather[0].main == "Clouds") {
            setWicon(clouds_icon);
          } else if (res.data.weather[0].main == "Clear") {
            setWicon(clear_icon);
          } else if (res.data.weather[0].main == "Rain") {
            setWicon(rain_icon);
          } else if (res.data.weather[0].main == "Drizzle") {
            setWicon(drizzle_icon);
          } else if (res.data.weather[0].main == "Mist") {
            setWicon(mist_icon)
          } else if (res.data.weather[0].main == "Snow"){
            setWicon(snow_icon)
          } else {
            setWicon(clouds_icon);
          }
          console.log(res.data);
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: res.data.weather[0].main,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City" onChange={handleChange} />
          <button>
            <img src={search_icon} alt="" onClick={handleClick} />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="weather-info">
          <img src={wicon} alt="" className="image-icon" />
          <h1>{Math.round(data.celsius)}˚C</h1>
          <h2>{data.name}</h2>
        </div>
        <div className="weather-details">
          <div className="detail">
            <img src={humidity_icon} alt="" />
            <div className="humidity">
              <p>{Math.round(data.humidity)}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="detail">
            <img src={wind_icon} alt="" />
            <div className="wind">
              <p>{Math.round(data.speed)} Km/h</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
