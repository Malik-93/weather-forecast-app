import { render } from "@testing-library/react";
import { WeatherMap } from "./index";
import { Provider } from "react-redux";
import { appStore } from "../../redux/store";
describe('<WeatherMap />', () => {
    test("Render the WeatherMap component...", () => {
        const { container } = render(<Provider store={appStore}>
            <WeatherMap />
        </Provider>);
        expect(container).toBeInTheDocument();
    });
})