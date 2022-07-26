import * as React from 'react';
import { useAppSelector } from '../../../hooks/store.hook';
import { CurrentWeatherResponse } from '../../../types';
import { temprature } from '../../../utils';
import mockData from '../../../mockData.json';
import './today.forecast.css';
type Props = {
}
const defaultProps = {
}
const TodayForecast: React.FC<Props> = (props) => {
    const reducer = useAppSelector(store => store.weather_forecast_slice);
    // const current_forecast: CurrentWeatherResponse = reducer.current_forecast;
    const current_forecast = mockData.CURRENT;
    const is_celcius = reducer.is_celcius;
    console.log('current_forecast', current_forecast);
    console.log('is_celcius', is_celcius);
    const tempratureRapper = (temp: number): string => {
        return `${temprature(is_celcius, temp)}${is_celcius ? `°C` : `°F`}`
    }
    if (current_forecast.cod == 200) {

        return (
            <div className="col-sm-12 col-md-12 col-lg-6">
                <div><span className="daily_forecast_label">{`Today's Forecast for ${current_forecast.name}`}</span></div>
                <div className="flex-wrap-reverse d-flex justify-content-center align-items-center my-5">
                    <ul className="current_weather">
                      <li><span className='title'>Date :</span>{`${new Date(current_forecast.dt).toUTCString()}`}</li>
                      <li><span className='title'>Temprature :</span>{`${tempratureRapper(current_forecast.main.temp)}`}</li>
                      <li><span className='title'>Weather :</span>{`${current_forecast.weather[0].description}`}</li>    
                      <li><span className='title'>Today's high temperature :</span>{`${tempratureRapper(current_forecast.main.temp_max)}`}</li>      
                      <li><span className='title'>Today's low temperature :</span>{`${tempratureRapper(current_forecast.main.temp_min)}`}</li>      
                      <li><span className='title'>Humidity :</span>{`${current_forecast.main.humidity}%`}</li>      
                      <li><span className='title'>Wind Speed :</span>{`${current_forecast.wind.speed}km/h`}</li>      
                    </ul>
                    <div className='mb-4 mx-auto d-flex justify-content-center'><img className="weather_icon" src={require('../../../assets/rainy-day.png')} alt="" /></div>
                </div>
            </div>
        )
    } else return null;

}

TodayForecast.defaultProps = defaultProps;

export default TodayForecast;