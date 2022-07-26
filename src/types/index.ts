export type selectOptions = {
    id: number,
    value: string
}

export type WeatherObject = {
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level?: number,
        grnd_level?: number,
        humidity: number,
        temp_kf?: number
    },
    weather: Array<
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    >,
    clouds: {
        all: number
    },
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    visibility: number,
    pop: number,
    rain?: Object,
    sys: {
        pod?: string,
        type?: number,
        id?: number,
        country?: string,
        sunrise?: number,
        sunset?: number
    },
    dt_txt: string
}
export type WeeklyWeatherResponse = {
    cod: number | string,
    message: string,
    cnt: number,
    list: Array<WeatherObject>
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export type CurrentWeatherResponse = WeatherObject & {
    id: number,
    cod: number | string,
    coord: {
        lat: number,
        lon: number
    },
    base: string,
    name: string,
    timezone: number,
    message?: string
}

export type RequestParams = {
    lat: number,
    lon: number,
    appid?: string,
    mode?: any,
    units?: string
    lang?: string
    cnt?: number
}

export type CountryInfoResponse = {
    name?: string,
    lat: number,
    lon: number,
    country?: string,
    state?: string,
    message?: string
}

export interface IData {
    label: string;
    value: number;
}

export interface IGroupedData {
    label: string;
    values: number[];
}
