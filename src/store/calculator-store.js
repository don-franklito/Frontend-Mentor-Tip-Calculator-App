const initStore = () => {
    console.log('Inicia el store');
}

/**
 * 
 * @param { Number } bill 
 * @param { Number } amount 
 * @param { Number } tip 
 * @returns { Number }
 */
const updateTotal = ( bill, amount, tip ) => {
    return ( ( bill / amount ) + ( ( bill / 100 * tip ) / amount) ).toFixed( 2 );
}

/**
 * 
 * @param { Number } bill 
 * @param { Number } amount 
 * @param { Number } tip 
 * @returns { Number }
 */
const updateTipAmount = ( bill, amount, tip ) => {
   return ( (bill / 100 * tip ) / amount ).toFixed( 2 );
}

export default {
    initStore,  
    updateTotal,
    updateTipAmount
}