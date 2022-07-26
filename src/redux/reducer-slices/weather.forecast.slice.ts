import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  current_forecast: {},
  weekly_forecast: {},
  weather_map: {},
  bar_chart: [],
  is_celcius: true
}
const weather_forecast_slice: any = createSlice({
  name: 'weather_forecast_slice',
  initialState,
  reducers: {
    set_current_forecast: (state: any, action: PayloadAction<Object>): any => {
      return { ...state, current_forecast: action.payload }
    },
    set_weekly_forecast: (state, action: PayloadAction<Object>): any => {
      return { ...state, weekly_forecast: action.payload }
    },
    set_weather_map: (state, action: PayloadAction<Object>): any => {
      return { ...state, weather_map: action.payload }
    },
    set_bar_chart: (state, action: PayloadAction<Object>): any => {
      return { ...state, bar_chart: action.payload }
    },
    temprature_toggle: (state, action: PayloadAction<boolean>): any => {
      return { ...state, is_celcius: action.payload }
    },
  }
})
export const { set_current_forecast, set_weather_map, set_weekly_forecast, set_bar_chart, temprature_toggle } = weather_forecast_slice.actions;
export default weather_forecast_slice.reducer;