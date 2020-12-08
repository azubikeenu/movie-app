
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

let leftMovie;
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
        runComparison();


    }


}

const runComparison = () => {
    // get the summary contianer for the left movie and right movie 
    let leftSideStats = document.querySelectorAll( "#summary-left .notification" );
    let rightSideStats = document.querySelectorAll( "#summary-right .notification" );

    leftSideStats.forEach( ( item, index ) => {
        const rightStats = rightSideStats[index];
        const leftStats = item;
        const rightValue = rightStats.dataset.value;
        const leftValue = leftStats.dataset.value;
        if ( leftValue > rightValue ) {
            rightStats.classList.remove( 'is-primary' );
            rightStats.classList.add( 'is-warning' );
        } else if ( leftValue < rightValue ) {
            leftStats.classList.remove( 'is-primary' );
            leftStats.classList.add( 'is-warning' );
        }

    } )

}

const getTotalAwards = ( awardString ) => {
    const scoresMap = awardString.split( " " )
        .filter( x => !isNaN( x ) )
        .map( x => parseInt( x ) );

    if ( scoresMap.length > 0 ) {
        return scoresMap.reduce( ( prev, curr ) => prev + curr )
    } else {
        return 0;
    }
}


const movieTemplate = ( movieDetail ) => {
    const dollars = parseInt( movieDetail.BoxOffice.replace( /\$/g, '' ).replace( /,/g, '' ) );
    const metaScore = parseInt( movieDetail.Metascore );
    const imdbRating = parseFloat( movieDetail.imdbRating );
    const imdbVotes = parseInt( movieDetail.imdbVotes.replace( /,/g, '' ) );
    const awards = getTotalAwards( movieDetail.Awards );


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

    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle"> Awards</p>
    </article>

    <article data-value =${dollars} class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle"> Box office</p>
  </article>

  <article data-value=${metaScore} class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle"> Metascore</p>
</article>

<article data-value=${imdbRating} class="notification is-primary">
<p class="title">${movieDetail.imdbRating}</p>
<p class="subtitle"> IMDB Rating</p>
</article>

<article data-value=${imdbVotes} class="notification is-primary">
<p class="title">${movieDetail.imdbVotes}</p>
<p class="subtitle"> IMDB Votes</p>
</article>

        `

}




