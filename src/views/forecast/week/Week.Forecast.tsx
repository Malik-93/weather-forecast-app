import * as React from 'react';
import { useAppSelector } from '../../../hooks/store.hook';
import Slider from '../../../libs/slider';
import './week.forecast.css';
import mockData from '../../../mockData.json';
import { WeeklyWeatherResponse } from '../../../types';
type Props = {
}
const defaultProps = {
}
const WeeklyForecast: React.FC<Props> = (props) => {
    const reducer = useAppSelector(store => store.weather_forecast_slice);
    // const weekly_forecast: WeeklyWeatherResponse = reducer.weekly_forecast;
    const weekly_forecast = mockData.FIVE_DAYS;
    const is_celcius = reducer.is_celcius;
    console.log('weekly_forecast', weekly_forecast);
    if (weekly_forecast.cod == '200') {
        return (
            <div className="col-sm-12 col-md-12 col-lg-6 mb-5">
                <div><span className="daily_forecast_label">{`Weekly forecast for ${weekly_forecast.city.name}`}</span></div>
                <Slider data={weekly_forecast.list.slice(0, 5)} is_celcius={is_celcius} />
            </div>
        )
    } else return null;
}

WeeklyForecast.defaultProps = defaultProps;

export default WeeklyForecast;