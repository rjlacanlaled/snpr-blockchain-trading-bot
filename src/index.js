import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import BlockchainProvider from './components/contexts/BlockchainContext';
import UniswapProvider from './components/contexts/UniswapContext';
import Erc20Provider from './components/contexts/Erc20Context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <BlockchainProvider>
                    <Erc20Provider>
                        <UniswapProvider>
                            <App />
                        </UniswapProvider>
                    </Erc20Provider>
                </BlockchainProvider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
