const waitFor = ( selector ) => {
    return new Promise( ( resolve, reject ) => {
        const interval = setInterval( () => {
            if ( document.querySelector( selector ) ) {
                clearInterval( interval );
                clearInterval( timeout );
                resolve();
            }

        }, 30 )

        const timeout = setTimeout( () => {
            clearInterval( interval );
            reject();
        }, 2000 )



    } )
}

beforeEach( () => {
    document.querySelector( "#target" ).innerHTML = "";

    createAutoComplete( {
        root: document.querySelector( "#target" ),
        fetchData: () => {
            return [
                { Title: "Avengers" },
                { Title: "Rambo" },
                { Title: "Indiana Jones" },
                { Title: "The lord of the rings" }
            ];
        },
        renderOption: ( movie ) => {
            return `<p> ${movie.Title}</p>`;
        },

        inputValue: ( movie ) => {
            return movie.Title;
        }

    } )

} )


it( 'dropdown starts closed', () => {
    const dropdown = document.querySelector( ".dropdown" );
    expect( dropdown.className ).not.to.include( 'is-active' );

} )


it( 'opens up a dropdown list after searching', async () => {
    const input = document.querySelector( "input" );
    input.value = "Avengers";
    input.dispatchEvent( new Event( 'input' ) );
    await waitFor( ".dropdown-item" ) //wait for search results to appear before performing asserts 
    const dropdown = document.querySelector( ".dropdown" );
    expect( dropdown.className ).to.include( 'is-active' );

} )


it( 'After searching ,display result search', async () => {
    const input = document.querySelector( "input" );
    input.value = "Avengers";
    input.dispatchEvent( new Event( 'input' ) );
    await waitFor( ".dropdown-item" ); //wait for search results to appear before performing asserts 
    const items = document.querySelectorAll( ".dropdown-item" );
    expect( items ).to.have.lengthOf( 4 );


} )

