import { render } from "@testing-library/react";
import { Temprature } from "./index";
import { Provider } from "react-redux";
import { appStore } from "../../redux/store";
describe('<Temprature />', () => {
    test("Render the Temprature component...", () => {
        const { container } = render(<Provider store={appStore}>
            <Temprature />
        </Provider>);
        expect(container).toBeInTheDocument();
    });
})