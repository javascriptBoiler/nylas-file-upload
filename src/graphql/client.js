// import ApolloClient, { InMemoryCache } from 'apollo-boost';
// import { createUploadLink } from 'apollo-upload-client'
// import config from '../config';

// const link = createUploadLink({uri: config.API_URL})
// export const client = new ApolloClient({
//   // uri: config.API_URL,
//   link,
//   cache: new InMemoryCache(),
//   request: (operation) => {
//     operation.setContext({
//       headers: {
//         Authorization: config.TOKEN,
//       },
//     });
//   },
// });

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
