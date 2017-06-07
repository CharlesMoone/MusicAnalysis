import Frame from 'containers/Frame';
import MusicPlayRoute from 'containers/MusicPlay/route';


export function createRoutes(store) {
  return [{
    path: '/',
    component: Frame,
    indexRoute: { component: MusicPlayRoute(store).component },
    // childRoutes: [
    //   ...
    // ],
  }];
}