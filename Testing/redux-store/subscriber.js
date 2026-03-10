import { store } from './store';

store.subscribe(() => {
  console.log('state changed', store.getState());
});
