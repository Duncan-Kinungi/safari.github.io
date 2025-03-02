//REST Country API from https://restcountries.eu/
const API_URL = "https://restcountries.eu/rest/v2/alpha/";

// Create country buttons
axios
  .get(`${API_URL}?codes=zaf;bwa;nam;ken;`) //<= Possibility to add more country codes
  .then((res) => {
    const container = document.querySelector(".btn-container");
    let containerButtons = "";
    for (let i in res.data) {
      let button = `<div class="col-6 col-lg-3"><div class="api-button" type="button" data-country="${res.data[i].alpha2Code}">${res.data[i].name}</div></div>`;
      containerButtons += button;
    }
    container.innerHTML = `${containerButtons}`;
  })
  .then(() => {
    const buttons = document.querySelectorAll(".api-button");
    for (let i = 0; i < buttons.length; i++) {
      // add a click event listener to the button
      buttons[i].addEventListener("click", (event) => {
        // send an api request that uses the 'data-country' data attribute
        axios
          .get(`${API_URL}${event.target.dataset.country}`)
          .then((res) => {            
            document.querySelector(".countryHeading").innerHTML = res.data.name; // Country Name heading            
            document.querySelector(".capitalText").innerHTML = res.data.capital; // Capital City
            document.querySelector(".phoneText").innerHTML = `+${res.data.callingCodes}`; // Dialling Code

            const localCurrency = document.querySelector(".currencyText"); // Currencies
            let currencyData = res.data.currencies;
            localCurrency.innerHTML = "";
            for (let currency in currencyData) {
              let currency_item1 = `${currencyData[currency].name}`;
              let currency_item2 = `${currencyData[currency].symbol}`;              
              let currency_item3 = `${currencyData[currency].code}`;
              localCurrency.insertAdjacentHTML("beforeend", `${currency_item1} (${currency_item2} or ${currency_item3})<br>`);
            }

            document.querySelector(".timeText").innerHTML = res.data.timezones; // Int. Time Zone            
            /*CREDIT: Refactored population number with Intl.NumberFormat() constructor
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat*/
            let population = `${Intl.NumberFormat().format(res.data.population)} (2018) World Bank`; // Population
            // End Credit
            document.querySelector(".populationText").innerHTML = population;
            
            const languageList = document.querySelector(".langList"); // Language List
            let langData = res.data.languages;
            languageList.innerHTML = "";
            for (let language in langData) {
              let language_item = `<li>${langData[language].name}</li>`;
              languageList.insertAdjacentHTML("beforeend", language_item);
            }
            
            document.querySelector(".container-image").setAttribute("src", res.data.flag); // Flags
          });
      });
    }
  });
