const inputs = document.querySelectorAll("input")
const showCalc = document.getElementById("showCalc")
const formulary = document.getElementById("formulary")

formulary.addEventListener("submit", event => {
  event.preventDefault();
})

var data = {
    foodWeight: NaN,
    foodKCaloriesXPortion: NaN,
    foodGramsXPortion: NaN,
    espPortions: NaN,
}

inputs.forEach( element => {
  const attribute = element.getAttribute("unit");
  const attributeData = element.getAttribute("name");
  
  element.setAttribute("autocomplete", "off");
  element.setAttribute("placeholder", `Indique en (${attribute})`)
  
  element.addEventListener("change", ({ target }) => {
    data[attributeData] = target.value;
    target.value = data[attributeData];
  })
});


const btnCalc = document.getElementById("form__btn-calc");

btnCalc.addEventListener("click", () => {
  const btnValue = btnCalc.value
    if( showCalc.hasChildNodes() ) {
      const results = document.getElementById("results")
      showCalc.removeChild(results)
    }
    resultsProcess()
    btnCalc.value = btnValue
  })

  function resultsProcess() {
      // "data to show" container
      const results = document.createElement("div")
      results.setAttribute("class", "results")
      results.setAttribute("id", "results")
      

      // data to show

      // basic data
      const basicData = document.createElement("h2")
      basicData.innerHTML = `Datos básicos`
      basicData.setAttribute("class", "results__subtitle")
      
      // total Weight
      const totalCalories = document.createElement("p")
      totalCalories.innerHTML = `Kcalorias totales : ${
        (data.foodWeight / data.foodGramsXPortion) * data.foodKCaloriesXPortion
      }` 

      // total Portions
      const totalPortions = document.createElement("p")
      totalPortions.innerHTML = `N° de Porciones: ${
        data.foodWeight / data.foodGramsXPortion
      }`
      
      // especify data
      const especifies = document.createElement("h2")
      especifies.innerHTML = `Datos deseados`
      especifies.setAttribute("class", "results__subtitle")
      
      // n° of portions
      const espPortions = document.createElement("p")
      espPortions.innerHTML = `N° de porciones: ${data.espPortions}`
      
      // KCalories for each especify portion
      const kCaloriesPerPortions = document.createElement("p")
    kCaloriesPerPortions.innerHTML = `KCalorias por porcion: ${ ((data.foodWeight / data.espPortions ) * data.foodKCaloriesXPortion ) / data.foodGramsXPortion}`

      // grams for each especify portion
      const gramsPerPortions = document.createElement("p")
    gramsPerPortions.innerHTML = `Gramos por porcion: ${ (data.foodWeight / data.espPortions ) }`
      
      
      const dataToShow = [
        basicData,
        totalCalories,
        totalPortions,
        especifies,
        espPortions,
        kCaloriesPerPortions,
        gramsPerPortions
      ]
      
      // to render 
      if( data.foodGramsXPortion && data.foodWeight && data.foodKCaloriesXPortion) {

        for(let i = 0; i < inputs.length; i++) {
          if( inputs[i].value <= 0 && inputs[i].value === NaN ) {
            console.log(data)
            return alert("No se admiten números negativos")
          }
        }

        for(let i = 0; i < dataToShow.length; i++) {
          results.appendChild(dataToShow[i])
        }
      } else {
        console.log(data)
        return alert("Datos incompletos o inválidos")
      }
      
      showCalc.append(results)

      // restart data
      // restartData()
    }
    
    function restartData () {
      data = {
        foodWeight: NaN,
        foodKCaloriesXPortion: NaN,
        foodGramsXPortion: NaN,
        espPortions: NaN,
      }
    inputs.forEach( el => el.value = "")
  }