console.log("JS Loaded");


const API_KEY = '7aca115a239af688774f7bd8e23ad96e';
const APILINK = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`;
const IMGPATH = '	https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=7aca115a239af688774f7bd8e23ad96e&query='";

const main=document.getElementById("section");
const form=document.getElementById("form");
const search=document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url){
    fetch(url).then(res=>res.json())
    .then(function(data){
        console.log(data.results);
        if (data.results.length > 0) {
            showHeroBanner(data.results[0]);
          }
          
        data.results.forEach(element=>{
         const div_card=document.createElement('div');
         div_card.setAttribute ('class','card');

         const div_row=document.createElement('div');
         div_row.setAttribute ('class','row');

         const div_column=document.createElement('div');
         div_column.setAttribute ('class','column');

         const image=document.createElement('img');
         image.setAttribute ('class','thumbnail');
         image.setAttribute ('id','image');

         const title=document.createElement('h3'); 
         title.setAttribute ('id','title');
         
         const p=document.createElement('p');
         p.setAttribute('class','click-hint');
         p.innerHTML='Click to know more';
         div_card.appendChild(p);


         const centerDiv = document.createElement('div');
          centerDiv.style.textAlign = 'center';
        title.innerHTML=`${element.title}` ;
        image.src=IMGPATH + element.poster_path;
        
        centerDiv.appendChild(image);
        div_card.appendChild(centerDiv);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
        });
    });
}

function showHeroBanner(movie) {
    const banner = document.getElementById("hero-banner");
    const title = document.getElementById("hero-title");
    const overview = document.getElementById("hero-overview");
    const watchButton = document.querySelector(".hero-button");
  
    banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    title.textContent = movie.title;
    overview.textContent = movie.overview;
  
    // Fetch trailer video from TMDb
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=9b5a074fe936e3992afbca0c64d9c887`)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results.find(
          vid => vid.type === "Trailer" && vid.site === "YouTube"
        );
  
        if (trailer) {
          // Set the button to open trailer on click
          watchButton.onclick = () => {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
          };
        } else {
          // fallback if no trailer found
          watchButton.onclick = () => {
            alert("Trailer not available.");
          };
        }
      });
  }
  

  


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    main.innerHTML="";
    const searchItem=search.value;

    if(searchItem){
        returnMovies(SEARCHAPI+searchItem);
        search.value="";
    }
});
