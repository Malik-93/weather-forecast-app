import React from 'react';
import './App.css';
import { getLocationAndForecast } from './utils';
import { Header } from './views/header';
import { Search } from './views/search';
import { Zip } from './views/zip';
import { TodayForecast } from './views/forecast/today';
import { WeeklyForecast } from './views/forecast/week';
import { Temprature } from './views/temprature';
import { BarChart } from './views/charts';
import { WeatherMap } from './views/weather-map';
const App: React.FC = () => {
  // console.log('reducer', reducer)
  React.useEffect(() => {
    // getLocationAndForecast();
  }, [])
  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="d-flex mt-2">
          <Search />
          <Zip />
        </div>
        <div className="row mt-5">
          <TodayForecast />
          <Temprature />
        </div>
        <div className="row mt-5">
          <WeeklyForecast />
          <BarChart data={[
            { label: "Apples", value: 100 },
            { label: "Bananas", value: 200 },
            { label: "Oranges", value: 50 },
            { label: "Kiwis", value: 150 }
          ]} />
        </div>
        <WeatherMap />
      </div>
    </div >
  );
}

export default App;
