import { Zip } from './index';
import { render, fireEvent, getByTestId } from '@testing-library/react';
describe('<Search />', () => {
    test("It should render <Zip /> and Select /> ", () => {
        const { container } = render(<Zip />);
    });

})
