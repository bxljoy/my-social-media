import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store = { store }>
        <GoogleOAuthProvider clientId='123276089249-3m11ggv0autcvreun3pgqh395ajkrgfk.apps.googleusercontent.com'>
            <App />
        </GoogleOAuthProvider>
    </Provider>
);