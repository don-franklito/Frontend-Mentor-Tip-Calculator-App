import calculatorStore from '../store/calculator-store';
import html from './app.html?raw';

/**
 * 
 * @param { HTMLElement } elementID 
 */
export const App = ( elementID ) => {

    //Renderizar HTML
    (() => {
        const app = document.createElement('main');
        app.classList.add('container');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
    }) ();

    //Referencias HTML
    let billInput = document.querySelector('.bill-amount-input');
    let amountOfPeopleInput = document.querySelector('.people-amount-input');

    let tipAmount = document.querySelector('.tip-amount');
    let totalAmount = document.querySelector('.total-amount');

    let percentageButtons = Array.from(document.querySelectorAll('.percentage-button'));
    let customPercentageButton = document.querySelector('.custom-button');
    let resetButton = document.querySelector('.reset-button');

    let billValue = 0;
    let amountOfPeopleValue = 1;
    let tipValue = 0;

    //Listeners
    ['keypress', 'input'].forEach( event => {
        billInput.addEventListener( event, ( key ) => {
            billValue = billInput.value;  
            if( event == 'keypress' ) {      
                if ( key.keyCode < 48 || key.keyCode > 57 ) {
                    key.preventDefault();
                    return false;
                }               
            } else if( event == 'input' ) {
                if( amountOfPeopleValue != 0 ) {
                    totalAmount.innerHTML = `€${ calculatorStore.updateTotal( billValue, amountOfPeopleValue, tipValue ) }`;
                    tipAmount.innerHTML = `€${ calculatorStore.updateTipAmount(billValue, amountOfPeopleValue, tipValue) }`;
                }
            } 
        });

        amountOfPeopleInput.addEventListener( event, ( key ) => {
            amountOfPeopleValue = amountOfPeopleInput.value;  
            if( event == 'keypress') {      
                if ( key.keyCode < 48 || key.keyCode > 57 ) {
                    key.preventDefault();
                    return false;
                }               
            } else if( event == 'input' ) {
                if( amountOfPeopleValue != 0 ) {
                    totalAmount.innerHTML = `€${ calculatorStore.updateTotal( billValue, amountOfPeopleValue, tipValue ) }`;
                    tipAmount.innerHTML = `€${ calculatorStore.updateTipAmount(billValue, amountOfPeopleValue, tipValue) }`;
                }
            } 
        });
    }); 

    percentageButtons.forEach( button => {
        button.addEventListener('click', () => {
          if( billValue != null && amountOfPeopleValue != null ) {
            resetPercentageButtons();
            tipValue = button.innerHTML.replace('%', '');
            button.classList.add('percent-button-active');
            totalAmount.innerHTML = `€${ calculatorStore.updateTotal( billValue, amountOfPeopleValue, tipValue ) }`;
            tipAmount.innerHTML = `€${ calculatorStore.updateTipAmount(billValue, amountOfPeopleValue, tipValue) }`;
          }
        });
    });

    customPercentageButton.addEventListener('click', () => {
        resetPercentageButtons();
        customPercentageButton.innerHTML = `<input type="text">`
        let customPercentageInput = customPercentageButton.childNodes[0];
        customPercentageInput.focus();
        
        ['keypress', 'input'].forEach( event => {
            customPercentageInput.addEventListener( event, ( key ) => {
                tipValue = customPercentageInput.value; 
                if( event == 'keypress' ) {      
                    if ( key.keyCode < 48 || key.keyCode > 57 ) {
                        key.preventDefault();
                        return false;
                    }               
                } else if( event == 'input' ) {
                    customPercentageButton.classList.add('percent-button-active');
                    totalAmount.innerHTML = `€${ calculatorStore.updateTotal( billValue, amountOfPeopleValue, tipValue ) }`;
                    tipAmount.innerHTML = `€${ calculatorStore.updateTipAmount(billValue, amountOfPeopleValue, tipValue) }`;
                } 
            });
        }); 
    });

    resetButton.addEventListener('click', () => {
        tipAmount.innerHTML = '€0.00';
        totalAmount.innerHTML = '€0.00';
        billInput.value = '';
        amountOfPeopleInput.value = '';
        billValue = 0;
        amountOfPeopleInput = 1;
        resetPercentageButtons();
    });


    //Reset
    const resetPercentageButtons = () => {
        customPercentageButton.innerHTML = 'Custom';
        customPercentageButton.classList.remove('percent-button-active');
        percentageButtons.forEach( button => {
          button.classList.remove('percent-button-active');
        });
    }
}