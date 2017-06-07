import { injectAsyncReducer } from 'stores';


export default function createRoutes(store) {
  injectAsyncReducer(store, 'musicPlay', require('./reducer').default);
  return {
    path: 'musicplay',
    component: require('./MusicPlay').default,
  };
}