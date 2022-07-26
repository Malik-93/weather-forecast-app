import { render } from "@testing-library/react";
import { BarChart } from "./index";
import { Provider } from "react-redux";
import { appStore } from "../../redux/store";
describe('<BarChart />', () => {
    test("Render the BarChart component...", () => {
        const { container } = render(<Provider store={appStore}>
            <BarChart />
        </Provider>);
        expect(container).toBeInTheDocument();
    });
})