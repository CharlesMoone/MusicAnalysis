import { injectAsyncReducer } from 'stores';


export default function createRoutes(store) {
  injectAsyncReducer(store, 'frame', require('./reducer').default);
  return {
    component: require('./Frame').default,
  };
}