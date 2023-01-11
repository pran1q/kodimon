const getPokemonData = async () => {
  const randomPokemon = Math.floor(Math.random() * 905 + 1);
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  return {
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image: data.sprites.other["official-artwork"].front_default,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
  };
};

export default getPokemonData;
