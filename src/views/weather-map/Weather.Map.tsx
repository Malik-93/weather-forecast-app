import * as React from 'react';
import Button from '../../components/atoms/Button';
import { useAppSelector } from '../../hooks/store.hook';
type Props = {
}
const defaultProps = {
}
const WeatherMap: React.FC<Props> = (props) => {
    const reducer = useAppSelector(store => store.weather_forecast_slice);
    const weather_map = reducer.weather_map;
    console.log('weather_map', weather_map);
    return (
        <div className="row mt-5">
            <div className="col-lg-12">
                <div className="d-flex">
                    <Button className="map_btns">Clouds</Button>
                    <Button className="map_btns">Precipitation</Button>
                    <Button className="map_btns">Temperature</Button>
                </div>
            </div>
            <div className="col-lg-12 mt-5">
                <div style={{ width: '100%' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                        width="100%" height="400" style={{ border: 0 }}></iframe>
                </div>
            </div>
        </div>
    )
}

WeatherMap.defaultProps = defaultProps;

export default WeatherMap;