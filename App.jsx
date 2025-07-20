import React, { useEffect, useState } from "react";
import Temperature from "./components/Temperature";
import Highlights from "./components/Highlights";

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=bbd70bbda3d3417f998134736252007&q=${city}&aqi=no`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <div className="bg-[#87CEEB] h-screen flex justify-center align-top">
      <div className=" bg-blue-500 mt-40 w-1/1 h-1/2 mr-5  rounded-lg">
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>

      <div className="bg-blue-500 mt-40 w-1/3 h-1/2 rounded-lg grid grid-cols-2 gap-3">
        <h1 className="flex justify-center text-blue-100 mt-1 text-2xl  text-bold col-span-2 bg-blue-600 rounded-lg h-10 ">
          Today's Highlights
        </h1>

        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

