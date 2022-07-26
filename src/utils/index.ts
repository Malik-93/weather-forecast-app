import { getRequest } from "../services/api.service";
import { CountryInfoResponse, CurrentWeatherResponse, RequestParams, WeeklyWeatherResponse } from "../types";
import { set_current_forecast, set_weather_map, set_weekly_forecast, set_bar_chart } from '../redux/reducer-slices/weather.forecast.slice';
import { appStore } from "../redux/store";
export const ISB_LAT_LONG = {
    lat: 33.6844,
    lon: 73.0479
}
export const _alert = (message: string) => {
    alert(message)
}
const getCurrentForecast = (params: RequestParams, onSuccess = (data: CurrentWeatherResponse) => { }, onError = (error: Error) => { }) => {
    // return console.log('getCurrentForecast ran...');
    const units = params.units ? `units=${params.units}&` : ''
    getRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&${units}appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`, (data: CurrentWeatherResponse) => {
        if (data.cod == 200) {
            const _data = {
                ...data,
                main: {
                    ...data.main,
                    temp: temprature(true, kelvinToCelcius(data.main.temp)),
                    temp_min: temprature(true, kelvinToCelcius(data.main.temp_min)),
                    temp_max: temprature(true, kelvinToCelcius(data.main.temp_min)),
                }

            }
            onSuccess(_data)
            appStore.dispatch(set_current_forecast(_data));
        } else {
            _alert(data.message || 'No record found');
            onSuccess({ ...data, message: data.message || 'No record found' });
        }
    },
        (err: Error | TypeError | any) => {
            onError(err);
            console.log(err);
        })
}



const getWeeklyForecast = (params: RequestParams, onSuccess = (data: WeeklyWeatherResponse) => { }, onError = (error: Error) => { }) => {
    // return console.log('getWeeklyForecast ran...');
    const units = params.units ? `units=${params.units}&` : ''
    getRequest(`https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&${units}appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`, (data: WeeklyWeatherResponse) => {
        if (data.cod == 200) {
            const _data = {
                ...data,
                list: data.list.map(el => ({
                    ...el,
                    main: {
                        ...el.main,
                        temp: temprature(true, kelvinToCelcius(el.main.temp)),
                        temp_min: temprature(true, kelvinToCelcius(el.main.temp_min)),
                        temp_max: temprature(true, kelvinToCelcius(el.main.temp_min)),
                    },
                }))
            }
            onSuccess(_data)
            appStore.dispatch(set_weekly_forecast(_data));
            setBarChartData(_data.list[0].dt_txt.split(' ')[0]);
        } else {
            _alert(data.message || 'No record found');
            onSuccess({ ...data, message: data.message || 'No record found' });

        }
    },
        (err: TypeError | Error | any) => {
            console.log(err);
            onError(err);
        })
}
const getLatLongAndData = (query: string, isZip: boolean = false, onSuccess = (data: CountryInfoResponse) => { }, onError = (error: Error) => { }) => {
    query = query.trim();
    const url = `http://api.openweathermap.org/geo/1.0/${isZip ? `zip?zip=${query}` : `direct?q=${query}`}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
    getRequest(url, (response: any) => {
        if (!isZip && response.length) {
            const data: CountryInfoResponse = response[0];
            onSuccess(data);
            getCurrentForecast({ lat: data.lat, lon: data.lon });
            getWeeklyForecast({ lat: data.lat, lon: data.lon });
        } else if (Object.keys(response).length) {
            const data: CountryInfoResponse = response;
            onSuccess(data);
            getCurrentForecast({ lat: data.lat, lon: data.lon });
            getWeeklyForecast({ lat: data.lat, lon: data.lon });
        } else {
            const data: CountryInfoResponse = response;
            _alert(data.message || 'No record found');
            onSuccess({ ...data, message: data.message || 'No record found' })
        }
    },
        (err: TypeError | Error | any) => {
            console.log(err);
            onError(err);
        })

}

const getLocationAndForecast = (onSuccess = (data: WeeklyWeatherResponse) => { }, onError = (error: Error) => { }) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log('[getLocationAndForecast].coords', coords);
                getCurrentForecast({ lat: coords.latitude, lon: coords.longitude });
                getWeeklyForecast({ lat: coords.latitude, lon: coords.longitude });

            },
            (err) => {
                console.log('[getLocationAndForecast].err', err)
                getCurrentForecast(ISB_LAT_LONG);
                getWeeklyForecast(ISB_LAT_LONG);
            }
        )
    }
}
const temprature = (isCelcius: boolean = true, celcius: number = 0) => {
    if (isCelcius) return Math.round(celcius);
    return Math.round((celcius * (9 / 5)) + 32)
}
const kelvinToCelcius = (kelvin: number,) => {
    return Math.round(kelvin - 273.15)
}
const setBarChartData = (filter: string = '') => {
    const _data = appStore.getState().weather_forecast_slice.weekly_forecast;
    const result = _data.list.map((el: any, idx: number) => {
        if (idx === 0) {
            filter = `${el.dt_txt.split(' ')[0]}`
        }
        if (el.dt_txt.split(' ')[0] === filter) {
            return {
                label: `${new Date(el.dt_txt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`,
                value: Math.round(el.main.temp)
            };
        }
    }).filter((x: any) => x);
    console.log('result', result);
    appStore.dispatch(set_bar_chart(result));
}
export {
    getLocationAndForecast,
    getCurrentForecast,
    getWeeklyForecast,
    temprature,
    getLatLongAndData,
    kelvinToCelcius,
    setBarChartData
}