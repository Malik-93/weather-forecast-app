import { CountryInfoResponse, CurrentWeatherResponse, WeeklyWeatherResponse } from './../types/index';
import { getCurrentForecast, getLatLongAndData, getWeeklyForecast, kelvinToCelcius, temprature } from '.';
import { ISB_LAT_LONG } from '.';
describe('Utils tests...', () => {
    test("It should get current weather forecast data..  ", () => {
        const params = ISB_LAT_LONG;
        const message = 'No record found';
        getCurrentForecast(params, (data: CurrentWeatherResponse) => {
            expect(data).toBeDefined();
            if (data.cod == 200) {
                expect(data.name.toLowerCase()).toEqual(`islamabad`);
            } else {
                expect(data.message || message).toEqual(message)
            }
        },
            (error: Error | TypeError | any) => {
                expect(error).toBeDefined();
            }
        )

    });
    test("It should get getWeeklyForecast weather forecast data..  ", () => {
        const query = '';
        const isZip = true;
        const message = 'No record found';
        getLatLongAndData(query, isZip, (data: CountryInfoResponse) => {
            expect(data).toBeDefined();
        },
            (error: Error | TypeError | any) => {
                expect(error).toBeDefined();
            }
        )

    });
    test("It should get getLatLongAndData weather forecast data..  ", () => {
        const params = ISB_LAT_LONG;
        const message = 'No record found';
        getWeeklyForecast(params, (data: WeeklyWeatherResponse) => {
            expect(data).toBeDefined();
            if (data.cod == 200) {
                expect(data.city.name.toLowerCase()).toEqual(`islamabad`);
            } else {
                expect(data.message || message).toEqual(message)
            }
        },
            (error: Error | TypeError | any) => {
                expect(error).toBeDefined();
            }
        )

    });
    describe("It should get toggle temprature.. ", () => {
        const celciusTemp = 30,
            fahrenheitTemp = 86;
        test('It should convert temprature from fahrenheit to celcius', () => {
            const result1 = temprature(false, celciusTemp);
            expect(result1).toBe(fahrenheitTemp);
        })
        test('It should return temprature in celcius', () => {
            const result2 = temprature(true, celciusTemp);
            expect(result2).toBe(celciusTemp);
        })
    });
    describe("It should convert temprature from kelvin to celcius ", () => {
        const kelvinTemp = 304;
        const celciusTemp = 31;
        test('It should convert fahrenheit to celcius', () => {
            const result = kelvinToCelcius(kelvinTemp);
            expect(result).toBe(celciusTemp);
        })

    });
})