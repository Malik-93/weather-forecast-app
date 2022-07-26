import { render } from "@testing-library/react";
import { TodayForecast } from "./index";
import mockData from '../../../mockData.json';
import { CurrentWeatherResponse } from "../../../types";
import { Provider } from "react-redux";
import { appStore } from "../../../redux/store";
describe('<TodayForecast />', () => {
    test("Render the TodayForecast component...", () => {
        const getTodayData = jest.fn();
        getTodayData.mockReturnValue(mockData.CURRENT);
        const response: CurrentWeatherResponse = getTodayData.call(mockData.CURRENT);
        expect(getTodayData.mock.calls.length).toBe(1);
        if (response.cod == 200) {
            const { container } = render(<Provider store={appStore}>
                <TodayForecast />
            </Provider>);
            expect(container).toBeInTheDocument();

        }
    });
})