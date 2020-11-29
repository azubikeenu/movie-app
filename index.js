
const autoCompleteConfig = {
    renderOption: ( movie ) => {
        const imgSrc = ( movie.Poster === "N/A" ) ? "" : movie.Poster;
        return `<img src="${imgSrc}"/>
        ${movie.Title} (${movie.Year})`
    }
    , inputValue: ( movie ) => {
        return movie.Title
    },

    fetchData: async searchTerm => {

        const response = await axios.get( "http://www.omdbapi.com/", {
            params: {
                apikey: "3f8b760",
                s: searchTerm
            }
        } )

        return ( response.data.hasOwnProperty( "Error" ) ) ? [] : response.data.Search;
    }

}

createAutoComplete( {
    root: document.querySelector( "#left-auto_complete" ),
    ...autoCompleteConfig,
    onOptionSelect: ( movie ) => {
        document.querySelector( ".tutorial" ).classList.add( "is-hidden" );
        onMovieSelect( movie, document.querySelector( "#summary-left" ) );
    }

} );
createAutoComplete( {
    root: document.querySelector( "#right-auto_complete" ),
    ...autoCompleteConfig,
    onOptionSelect: ( movie ) => {
        document.querySelector( ".tutorial" ).classList.add( "is-hidden" );
        onMovieSelect( movie, document.querySelector( "#summary-right" ) );
    }

} );


const onMovieSelect = async ( movie, summaryElement ) => {

    const response = await axios.get( "http://www.omdbapi.com/", {
        params: {
            apikey: "3f8b760",
            i: movie.imdbID
        }
    } )

    summaryElement.innerHTML = movieTemplate( response.data
    );

}



const movieTemplate = ( movieDetail ) => {
    return `
    <article class="media">
    <figure class  = "media-left">
    <p class="image">
      <img src ="${movieDetail.Poster}"/>
    </p>
    </figure>

    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle"> Awards</p>
    </article>

    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle"> Box office</p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle"> Metascore</p>
</article>

<article class="notification is-primary">
<p class="title">${movieDetail.imdbRating}</p>
<p class="subtitle"> IMDB Rating</p>
</article>

<article class="notification is-primary">
<p class="title">${movieDetail.imdbVotes}</p>
<p class="subtitle"> IMDB Votes</p>
</article>

        `

}




