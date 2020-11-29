
const debounce = ( func, delay = 1000 ) => {
    let timerId
    return ( ...args ) => {
        if ( timerId ) {
            clearTimeout( timerId ); // destroy the timer 
        }
        timerId = setTimeout( () => {
            func.apply( null, args );
        }, delay );

    }

}