const fetchData = async ( searchTerm ) => {

    const { data } = await axios.get( "http://www.omdbapi.com/", {
        params: {
            apikey: "3f8b760",
            s: searchTerm
        }
    } )
    console.log( data );
}

const searchField = document.querySelector( "#searchField" );
let timerId;

const onInput = ( e ) => {
    if ( timerId ) {
        clearTimeout( timerId );
    }

    timerId = setTimeout( () => {
        const searchTerm = e.target.value;
        fetchData( searchTerm );

    }, 1000 )

};
searchField.addEventListener( "input", onInput )