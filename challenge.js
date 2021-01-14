const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input');
const marvelRow = document.getElementById('marvel-row');

window.addEventListener('load', () => {
   try {
      getHeroes()
   } catch (err) {
      console.error(err);
   }
});

searchButton.addEventListener('click', sendForm);
searchInput.addEventListener('input', formatedInput);

function formatedInput(event) {
   const target = event.target;

   setTimeout(() => {
      target.value = target.value.replace(/\D/g, '');

      if(target.value.length > 3) {
         target.value = target.value.slice(0, -1);
      }
   
   }, 1);
}

function sendForm() {
   const value = searchInput.value;

   try {
      getHeroes(value || 20);
   } catch(err) {
      console.error(err);
   }
}

async function getHeroes(number = 20) {
   marvelRow.innerHTML = '';

   const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=${number}&apikey=7e99323b2679072c3e1119052f1aca13&hash=779d449f29c113e00feddbada3e680af`;

   const request = await fetch(urlAPI);
   const response = await request.json();
   const items = response.data.results;

   items.forEach(function(hero) {
      const name = hero.name;
      const url = hero.urls[0].url;
      const pathImage = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;

      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
         <a href="${url}" target="_blank">
            <img src="${pathImage}" alt="${name}" rel="noopener noreferrer">
         </a>
         <h3 class="title">${name}</h3>
      `;

      marvelRow.append(div);
   });
}
