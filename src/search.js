import Fuse from 'fuse.js';

import { pokemons } from './feathers';

const indexes = {
};

function updatePokemonIndex() {
  pokemons.find({ paginate: false }).then((dex) => {
    indexes.pokemons = new Fuse(dex, {
      keys: ['name.english', 'type'],
      includeMatches: true,
    });
  });
}

indexes.init = function init() {
  updatePokemonIndex();
  pokemons.on('patched', updatePokemonIndex);
  pokemons.on('created', updatePokemonIndex);
};

window.indexes = indexes;

export default indexes;
