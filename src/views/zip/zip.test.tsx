import { Zip } from './index';
import { render } from '@testing-library/react';
describe('<Zip />', () => {
    test("It should render <Zip />  ", () => {
        const { container } = render(<Zip />);
        expect(container).toBeInTheDocument();
    });

})
