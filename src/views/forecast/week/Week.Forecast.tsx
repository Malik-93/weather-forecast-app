import * as React from 'react';
import { useAppSelector } from '../../../hooks/store.hook';
import Slider from '../../../libs/slider';
import './week.forecast.css';
import mockData from '../../../mockData.json';
type Props = {
}
const defaultProps = {
}
const WeeklyForecast: React.FC<Props> = (props) => {
    const reducer = useAppSelector(store => store.weather_forecast_slice);
    // const weekly_forecast: WeeklyWeatherResponse = reducer.weekly_forecast;
    const weekly_forecast = mockData.FIVE_DAYS;
    const is_celcius = reducer.is_celcius;
    // console.log('weekly_forecast', weekly_forecast);
    if (weekly_forecast.cod == 200) {
        const DATA = [...weekly_forecast.list].map((el, index) => {
            if (weekly_forecast.list[index + 1]) {
                if (weekly_forecast.list[index].dt_txt.split(' ')[0] !== weekly_forecast.list[index + 1].dt_txt.split(' ')[0]) {
                    return weekly_forecast.list[index]
                }
            }
            else return el
        }).filter(x => x);
        return (
            <div className="col-lg-6">
                <div><span className="daily_forecast_label">{`Weekly forecast for ${weekly_forecast.city.name}`}</span></div>
                <Slider data={DATA} is_celcius={is_celcius} />
            </div>
        )
    } else return null;
}

WeeklyForecast.defaultProps = defaultProps;

export default WeeklyForecast;