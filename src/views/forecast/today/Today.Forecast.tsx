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
    const current_forecast: CurrentWeatherResponse = reducer.current_forecast;
    // const current_forecast = mockData.CURRENT;
    const is_celcius = reducer.is_celcius;
    // console.log('current_forecast', current_forecast);
    // console.log('is_celcius', is_celcius);
    const tempratureRapper = (temp: number): string => {
        return `${temprature(is_celcius, temp)}${is_celcius ? `°C` : `°F`}`
    }
    if (current_forecast.cod == 200) {

        return (
            <div className="col-sm-6 col-md-6 col-lg-6">
                <div><span className="daily_forecast_label">{`Today's Forecast for ${current_forecast.name}`}</span></div>
                <div className="d-flex align-items-center my-5 mx-x">
                    <div className="current_weather">
                        <p className="">
                            {`Date : ${new Date(current_forecast.dt).toUTCString()}`}
                        </p>
                        <p className="">
                            {`Temprature : ${tempratureRapper(current_forecast.main.temp)}`}
                        </p>
                        <p className="">
                            {`Weather : ${current_forecast.weather[0].description}`}
                        </p>
                        <p className="">
                            {`Today's high temperature : ${tempratureRapper(current_forecast.main.temp_max)}`}
                        </p>
                        <p className="">
                            {`Today's low temperature : ${tempratureRapper(current_forecast.main.temp_min)}`}
                        </p>
                        <p className="">
                            {`Humidity: ${current_forecast.main.humidity}%`}
                        </p>
                        <p className="">
                            {`Wind Speed: ${current_forecast.wind.speed}km/h`}
                        </p>
                    </div>
                    <i className={`wi ${current_forecast.weather[0].icon}`} />
                </div>
            </div>
        )
    } else return null;

}

TodayForecast.defaultProps = defaultProps;

export default TodayForecast;