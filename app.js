const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=20&apikey=7e99323b2679072c3e1119052f1aca13&hash=779d449f29c113e00feddbada3e680af';

$(document).ready(function() {
   let contentHTML = '';

   $.get(urlAPI, function(res) {
      const items = res.data.results;

      items.forEach(function(hero) {
         const name = hero.name;
         const url = hero.urls[0].url;
         const pathImage = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;

         contentHTML += `
            <div class="item">
               <a href="${url}" target="_blank">
                  <img src="${pathImage}" alt="${name}" rel="noopener noreferrer">
               </a>
               <h3 class="title">${name}</h3>
            </div>
         `;
      });

      $('#marvel-row').html(contentHTML);
   });
});