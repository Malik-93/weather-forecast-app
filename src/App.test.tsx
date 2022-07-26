import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { appStore } from './redux/store';
import { Provider } from 'react-redux';
test('Render the app..', () => {
  const wrapper = render(
    <React.StrictMode>
      <Provider store={appStore}>
        <App />
      </Provider>
    </React.StrictMode>

  );
});
