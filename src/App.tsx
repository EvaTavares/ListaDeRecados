import React from 'react';

import AppRoutes from './routes/AppRoutes';
import { PersistGate } from 'redux-persist/es/integration/react';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
