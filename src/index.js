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