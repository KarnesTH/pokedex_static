!"use strict";

(() => {
  // === DOM & VARS ===
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));
  const DOM = {
    pokemonIDEl: $("#pokemon-id"),
    pokemonNameEl: $("#pokemon-name"),
    spriteContainerEl: $("#sprite-container"),
    typesEl: $("#types"),
    heightEl: $("#height"),
    weightEl: $("#weight"),
    hpEl: $("#hp"),
    attackEl: $("#attack"),
    defenseEl: $("#defense"),
    specialAttackEl: $("#special-attack"),
    specialDefenseEl: $("#special-defense"),
    speedEl: $("#speed"),
    searchFormEl: $("#search-form"),
    searchInputEl: $("#search-input"),
  };

  // === INIT =========
  const init = () => {
    DOM.searchFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      resetUI();
      getPokemonData(DOM.searchInputEl.value);
    });

    DOM.searchFormEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        resetUI();
        getPokemonData(DOM.searchInputEl.value);
      }
    });
  };

  // === EVENTS / XHR =======
  const getPokemonData = async (input) => {
    const pokemonNameOrId = input.toLowerCase();
    await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    )
      .then((res) => res.json())
      .then((data) => updateUI(data))
      .catch((err) => {
        alert("Pokémon not found");
        resetUI();
        console.err(err);
      });
  };

  // === FUNCTIONS ====
  const updateUI = (data) => {
    const {
      pokemonIDEl,
      pokemonNameEl,
      spriteContainerEl,
      typesEl,
      heightEl,
      weightEl,
      hpEl,
      attackEl,
      defenseEl,
      specialAttackEl,
      specialDefenseEl,
      speedEl,
    } = DOM;

    const { height, id, name, sprites, stats, types, weight } = data;

    pokemonNameEl.textContent = name.toUpperCase();
    pokemonIDEl.textContent = `#${id}`;
    weightEl.textContent = `Weight: ${weight}`;
    heightEl.textContent = `Height: ${height}`;
    spriteContainerEl.innerHTML = `
        <img id="sprite" src="${sprites.front_default}" alt="${name} front default sprite">
    `;

    typesEl.innerHTML = types
      .map((el) => `<span class="type ${el.type.name}">${el.type.name}</span>`)
      .join("");

    hpEl.textContent = stats[0].base_stat;
    attackEl.textContent = stats[1].base_stat;
    defenseEl.textContent = stats[2].base_stat;
    specialAttackEl.textContent = stats[3].base_stat;
    specialDefenseEl.textContent = stats[4].base_stat;
    speedEl.textContent = stats[5].base_stat;
  };

  const resetUI = () => {
    const {
      pokemonIDEl,
      pokemonNameEl,
      typesEl,
      heightEl,
      weightEl,
      hpEl,
      attackEl,
      defenseEl,
      specialAttackEl,
      specialDefenseEl,
      speedEl,
    } = DOM;

    const spriteEl = $("#sprite");
    if (spriteEl) spriteEl.remove();

    pokemonNameEl.textContent = "";
    pokemonIDEl.textContent = "";
    weightEl.textContent = "";
    heightEl.textContent = "";

    typesEl.innerHTML = "";

    hpEl.textContent = "";
    attackEl.textContent = "";
    defenseEl.textContent = "";
    specialAttackEl.textContent = "";
    specialDefenseEl.textContent = "";
    speedEl.textContent = "";
  };

  init();
})();
