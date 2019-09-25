 

const buttonElement = document.querySelector("#search");
const InputElement = document.querySelector("#inputValue");
const movieSearchable = document.querySelector("#movies-searchable");
const IMAGE_URL  = 'https://image.tmdb.org/t/p/w500/'


const API_Key = "fd35960a4843ec646369d29e79ed30dd";   
const url = 'https://api.themoviedb.org/3/search/movie?api_key=fd35960a4843ec646369d29e79ed30dd'


function generateUrl(path){

const url = `https://api.themoviedb.org/3${path}?api_key=fd35960a4843ec646369d29e79ed30dd`;

return url;

}

function renderSearchMovies(data){


    const  movies = data.results
    const movieBlock = createMovieContainer(movies)
    movieSearchable.appendChild(movieBlock);
    

}



function movieSection(movies){


  return movies.map((movie) =>{

        return ` 
        <img src = ${IMAGE_URL + movie.poster_path} data-movie-id =${movie.id}/>
        `;
        })

}



function createMovieContainer(movies){

const movieELement = document.createElement('div')
movieELement.setAttribute('class', 'movie');


const movieTemplate = `

<section class = "section">
${movieSection(movies)}

</section>
<div class = "content">
<p id = "content-close">X</p>
</div>
 `;

movieELement.innerHTML = movieTemplate;
return movieELement;
}


/*

<div class ="movie">
<section class = "section">
<img 
src = "https://image.tmdb"
alt =""
data-movie-id = "";
</section>
<div class = "content">
<p id = "content-close">X</p>
</div>
*/


buttonElement.onclick = function(event){
event.preventDefault();
const value = InputElement.value; 
const path ='/search/movie';
const newUrl = generateUrl(path)+ '&query=' + value;
console.log(newUrl)

fetch(newUrl)
.then((res) => res.json())
.then(renderSearchMovies
)
.catch((error) => {

console.log('Error: ', error);

});

InputElement.value = '';
console.log('Value: ',value)

}

//console.log(movieSection(movies))

document.onclick= function(event){

  const target = event.target
 


  if(target.tagName.toLowerCase()=== 'img'){

    const movieId = target.dataset.movieId;
    console.log(movieId);
    const section =event.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add('content-display')


/// fetch movie video 
const path =`/movie/${movieId}/videos`;
const url = generateUrl(path);
console.log('URL' , url)

fetch(url)
.then((res) => res.json())
.then((data) => {

  console.log('video' , data)

})
.catch((error) => {

console.log('Error: ', error);

});





  }
if(target.id === 'content-close'){

const content = target.parentElement;
content.classList.remove('content-display')

}
   
}

