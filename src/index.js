// Task 1
// Each time you change the content of the input box, filter the countries that are displayed in the textarea to the ones having their name matching the typed content. Having no content in the input field displays all the countries.
// Ex: typing ria would show only Bulgaria,Liberia,Nigeria (they both end in ria)

// Task 2
// Extend the filtering to be done by either name or capital based on the value of the select element. Each time the value of the select box is changed the displayed countries from the textarea are re-filtered by the criteria and the typed content from the input.

// Task 3
// Extend the filtering to be case insensitive (typing Alb produces the same result as typing alb).


const countries = [
    {
      name: "Albania",
      capital: "Tirana"
    },
    {
      name: "Belgium",
      capital: "Brussels"
    },
    {
      name: "Bulgaria",
      capital: "Sofia"
    },
    {
      name: "Comoros",
      capital: "Moroni"
    },
    {
      name: "Denmark",
      capital: "Copenhagen"
    },
    {
      name: "Italy",
      capital: "Rome"
    },
    {
      name: "Liberia",
      capital: "Monrovia"
    },
    {
      name: "Madagascar",
      capital: "Antananarivo"
    },
    {
      name: "Nigeria",
      capital: "Abuja"
    },
    {
      name: "Singapore",
      capital: "Singapore"
    },
    {
      name: "Tajikistan",
      capital: "Dushanbe"
    },
    {
      name: "Zimbabwe",
      capital: "Harare"
    }
  ];


  //Your code comes below this line

  //Solution

  const input = document.querySelector("input");
const textArea = document.querySelector("textarea");
const select = document.querySelector("select");

input.addEventListener("input", function(){
  let filterValue = this.value.toLowerCase();
  let criteria = select.value;
  let filterCountries = countries.filter(function(country){
    return country[criteria].toLowerCase().includes(filterValue);
    })
  .map(function(country){
    return country.name;
  });
  textArea.value = filterCountries.join("\n")
});



  //Your code comes above this line