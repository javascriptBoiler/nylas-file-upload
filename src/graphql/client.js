import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import config from '../config';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: config.API_URL,
    headers: {
      Authorization: config.TOKEN,
    }
  }),
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: config.TOKEN,
      },
    });
  },
});
