
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
        onMovieSelect( movie, document.querySelector( "#summary-left" ), 'left' );
    }

} );
createAutoComplete( {
    root: document.querySelector( "#right-auto_complete" ),
    ...autoCompleteConfig,
    onOptionSelect: ( movie ) => {
        document.querySelector( ".tutorial" ).classList.add( "is-hidden" );
        onMovieSelect( movie, document.querySelector( "#summary-right" ), 'right' );
    }

} );

let leftMovie
let rightMovie;


const onMovieSelect = async ( movie, summaryElement, side ) => {

    const response = await axios.get( "http://www.omdbapi.com/", {
        params: {
            apikey: "3f8b760",
            i: movie.imdbID
        }
    } )
    if ( side === 'left' ) {
        leftMovie = response.data
    } else {
        rightMovie = response.data;
    }

    summaryElement.innerHTML = movieTemplate( response.data
    );

    /**
    * conditions for comparison 
    * The left and right movies have to be clicked 
    * 
    */
    if ( leftMovie && rightMovie ) {
        // run comparison 
        runComparison( leftMovie, rightMovie );


    }


}

const runComparison = ( leftMovie, rightMovie ) => {
    // get the sumarry contianer for the left movie and right movie 
    const leftSummary = document.querySelector( "#summary-left" );
    const rightSummary = document.querySelector( "#summary-right" );
    // compare the metascore as a test ; 

}

const getTotalAwards = ( awardString ) => {
    return awardString.split( " " )
        .filter( x => !isNaN( x ) )
        .map( x => parseInt( x ) )
        .reduce( ( acc, curr ) => acc + curr );
}


const movieTemplate = ( movieDetail ) => {
    const dollars = parseInt( movieDetail.BoxOffice.replace( /\$/g, '' ).replace( /,/g, '' ) );
    const metaScore = parseInt( movieDetail.Metascore );
    const imdbRating = parseFloat( movieDetail.imdbRating );
    const imdbVotes = parseInt( movieDetail.imdbVotes.replace( /,/g, '' ) );
    const totalAwards = getTotalAwards( movieDetail.Awards );
    console.log( metaScore, imdbRating, imdbVotes );
    console.log( totalAwards );

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




