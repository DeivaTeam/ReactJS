import algoliasearch from 'algoliasearch';

const KEY = process.env.REACT_APP_ALGOLIA_KEY;
const APP = process.env.REACT_APP_ALGOLIA_APP;

const client = algoliasearch(APP, KEY);

const productsIndex = client.initIndex('products');

export {
  productsIndex
}

export default client;