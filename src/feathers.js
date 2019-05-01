import feathers from '@feathersjs/feathers';
import localstorage from 'feathers-localstorage';
import localforage from 'localforage';

import pokedex from './pokedex.json';

export const app = feathers();

app.use('/pokemons', localstorage({
  storage: localforage,
  paginate: { default: 10, max: 50 },
  multi: true,
}));

export const pokemons = app.service('pokemons');

export function initStorage() {
  pokemons.find({
    query: {
      $limit: 0,
    },
  }).then((res) => {
    if (!res || !res.total) {
      // load json pokedex into localstorage
      pokemons.create(pokedex);
    }
  });
}
