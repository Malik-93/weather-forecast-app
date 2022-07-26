import React from 'react';
import { Search } from './index';
import { render, fireEvent, getByTestId } from '@testing-library/react';
describe('<Search />', () => {
    test("It should check if Search and Input components are exist in DOM", () => {
        const { container } = render(<Search />);
        const input = getByTestId(container, 'search-input');
        expect(input).toBeInTheDocument();
    });
    test("It should validate the input value", () => {
        const onChange = jest.fn();
        const { container } = render(<Search />);
        const input: HTMLInputElement = getByTestId(container, 'search-input');
        fireEvent.change(input, { target: { value: 'Islamabad' } })
        onChange.call('Islamabad');
        expect(onChange.mock.calls.length).toBe(1);
        expect(input.value).toBe('Islamabad');
    });
    test("It should get weather forecast data if key === Enter", () => {
        const onKeyDown = jest.fn();
        const getLatLongAndData = jest.fn();
        const { container } = render(<Search />);
        const input: HTMLInputElement = getByTestId(container, 'search-input');
        fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 })
        onKeyDown.call({ key: 'Enter', keyCode: 13 })
        getLatLongAndData.call(input.nodeValue);
        expect(onKeyDown.mock.calls.length).toBe(1);
        expect(getLatLongAndData.mock.calls.length).toBe(1);

    });
})
