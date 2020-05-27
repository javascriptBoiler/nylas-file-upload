import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';


import Upload from './fileUpload/upload'
import { client } from './graphql/client';
import './App.css';


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Upload />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
