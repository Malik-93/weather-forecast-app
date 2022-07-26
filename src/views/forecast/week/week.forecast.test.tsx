import { render } from "@testing-library/react";
import { WeeklyForecast } from "./index";
import mockData from '../../../mockData.json';
import { CurrentWeatherResponse } from "../../../types";
import { Provider } from "react-redux";
import { appStore } from "../../../redux/store";
describe('<WeeklyForecast />', () => {
    test("Render the WeeklyForecast component...", () => {
        const getTodayData = jest.fn();
        getTodayData.mockReturnValue(mockData.FIVE_DAYS);
        const response: CurrentWeatherResponse = getTodayData.call(mockData.FIVE_DAYS);
        expect(getTodayData.mock.calls.length).toBe(1);
        if (response.cod == 200) {
            const { container } = render(<Provider store={appStore}>
                <WeeklyForecast />
            </Provider>);
            expect(container).toBeInTheDocument();

        }
    });
})