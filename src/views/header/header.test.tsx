import { render } from "@testing-library/react";
import { Header } from "./index";
describe('<Header />', () => {
    test("Render the Header component...", () => {
        const { container } = render(<Header />)
        expect(container).toBeInTheDocument();
    });
})