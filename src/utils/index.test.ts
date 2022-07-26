import { getLocationAndForecast } from './index';

test('it should return true', () => {
    const bool = getLocationAndForecast();
    if (bool !== undefined) {
        expect(bool).toBe(true);
    }
})