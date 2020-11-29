
const createAutoComplete = ( { root, renderOption, onOptionSelect, inputValue, fetchData } ) => {

    root.innerHTML = `
    <label><b> Search for a Movie</b></label>
                <input type="text" class ="input"/>
                <div class="dropdown">
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content results"> </div>
                </div>
            </div>
    `;



    const searchField = root.querySelector( ".input" );
    const dropDown = root.querySelector( ".dropdown" );
    const resultsWrapper = root.querySelector( ".results" );

    const onInput = async e => {
        const searchTerm = e.target.value;
        const items = await fetchData( searchTerm );
        if ( !items.length ) {
            dropDown.classList.remove( "is-active" );// hide search results
        } else {
            dropDown.classList.add( "is-active" );// show search results  
            resultsWrapper.innerHTML = "";

            for ( const item of items ) {
                const option = document.createElement( "a" );
                option.classList.add( "dropdown-item" );

                option.innerHTML =
                    renderOption( item );
                ;

                option.addEventListener( 'click', ( e ) => {
                    dropDown.classList.remove( "is-active" )
                    searchField.value = inputValue( item );
                    onOptionSelect( item )

                } )
                resultsWrapper.appendChild( option );

            }
        }



    };
    searchField.addEventListener( "input", debounce( onInput, 1000 ) );


    // hide the autocomplete list on click out 

    document.addEventListener( 'click', ( e ) => {
        if ( !root.contains( e.target ) ) {
            dropDown.classList.remove( "is-active" );
        }
    } )





}