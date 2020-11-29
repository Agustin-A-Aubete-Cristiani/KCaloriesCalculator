// BASE (targets by ID and define data)

const formulary = document.getElementById("formulary")
const inputs = document.querySelectorAll("input")
const btnCalc = document.getElementById("form__btn-calc");
const showCalc = document.getElementById("showCalc")

var data = {
  foodWeight: 500,
  foodKCaloriesXPortion: 10,
  foodGramsXPortion: 100,
  espPortions: NaN,
  espGrams: NaN,
  }
  

// EVENT LISTENER
formulary.addEventListener("submit", event => {
  event.preventDefault();
})
  
inputs.forEach( element => {
  const attribute = element.getAttribute("unit");
  const attributeData = element.getAttribute("name");
  
  element.setAttribute("autocomplete", "off");
  element.setAttribute("placeholder", `Indique en (${attribute})`)
  
  element.addEventListener("change", ({ target }) => {
    data[attributeData] = target.value;
  })
  
  element.addEventListener("focus", ({target}) => {
    if ( target === document.getElementById("espPortions")) {
      document.getElementById("espGrams").value = ""
      data.espGrams = NaN
    }
    if ( target === document.getElementById("espGrams")) {
      document.getElementById("espPortions").value = ""
      data.espPortions = NaN
    }
    // if( target !== document.getElementById("form__btn-calc")) {
    //   target.value = "";
    // }
  })
});

btnCalc.addEventListener("click", () => {
  const btnValue = btnCalc.value
    resultsProcess()
    btnCalc.value = btnValue
  })

  
  // ------------------------ Functions:
  // 
  //    defineDecimals
  //    restartData
  //    resultsProcess
  
  function defineDecimals( num, decimals = 1 ) {
    // .toFixed(decimals)
    return (num).toFixed(decimals)
  }
  
  function restartData ( info, inputs) {
    if( info ) {
      data = {
        foodWeight: NaN,
        foodKCaloriesXPortion: NaN,
        foodGramsXPortion: NaN,
        espPortions: NaN,
      }
    }
    if( inputs ) {
      inputs.forEach( el => el.value = "")
    }
  }
  
  function resultsProcess() {

    // "data to show" container (to render)
      const results = document.createElement("div")
      results.setAttribute("class", "results")
      results.setAttribute("id", "results")
    
    
    // ||------ data to show ------||


// <-- Info -->
    
    // basic data
      const basicData = document.createElement("h2")
      basicData.innerHTML = `Porcion Estandar`
      basicData.setAttribute("class", "results__subtitle")
    
    // total Weight
      const totalCalories = document.createElement("p")
      totalCalories.innerHTML = `KCalorias totales : ${
        defineDecimals(
          (data.foodWeight / data.foodGramsXPortion) * data.foodKCaloriesXPortion
        )
      }` 

    // total Portions
      const totalPortions = document.createElement("p")
      totalPortions.innerHTML = `N° de Porciones: ${
        defineDecimals(
          data.foodWeight / data.foodGramsXPortion
        )
      }`
    
    // especify data
      const especifies = document.createElement("h2")
      especifies.innerHTML = `Porcion Personalizada`
      especifies.setAttribute("class", "results__subtitle")
      
    // n° of portions
      // const espPortions = document.createElement("p")
      // espPortions.innerHTML = `N° de porciones: ${data.espPortions}`
      
    // KCalories for each especify portion
      const kCaloriesPerPortions = document.createElement("p")
      kCaloriesPerPortions.innerHTML = `KCalorias por porcion: ${
        defineDecimals(
          ((data.foodWeight / data.espPortions || data.espGrams ) * data.foodKCaloriesXPortion ) / data.foodGramsXPortion
        )
      }`

    // grams for each especify portion
      const gramsPerPortions = document.createElement("p")
      gramsPerPortions.innerHTML = `Gramos por porcion: ${
        defineDecimals(
          data.foodWeight / data.espPortions 
        )
      }`
      
    // portions according to grams
      const portionsAccordingToGrams = document.createElement("p")
      portionsAccordingToGrams.innerHTML = `Porciones según gramos: ${
        defineDecimals(
          data.foodWeight / data.espGrams
        )
      }`


// <-- containers -->

    // basic info
      const basicInfo = document.createElement("div")
      basicInfo.className = "results__basicInfo"
      basicInfo.appendChild(basicData)
      basicInfo.appendChild(totalCalories)
      basicInfo.appendChild(totalPortions)
      
    // especific info
    const especificInfo = document.createElement("div")
    especificInfo.className = "results__especificInfo"
    especificInfo.appendChild(especifies)
    especificInfo.appendChild(kCaloriesPerPortions)
    // especificInfo.appendChild(espPortions)

    if( data.espPortions ) {
      especificInfo.appendChild(gramsPerPortions)
    } else {
      especificInfo.appendChild(portionsAccordingToGrams)
    }
    
    // Info to render into container
      
      const dataToShow = [
        basicInfo,
        // basicData,
        // totalCalories,
        // totalPortions,
        
        especificInfo,
        // especifies,
        // espPortions,
        // kCaloriesPerPortions,
        // gramsPerPortions,
        // portionsAccordingToGrams
      ]
      
      // process for render 

      var render = true
      
      if( data.foodGramsXPortion && data.foodWeight && data.foodKCaloriesXPortion) {
        for(let i = 0; i < inputs.length; i++) {
          if( inputs[i].value <= 0 && inputs[i].value === NaN ) {
            render = false;
            return alert("No se admiten números negativos")
          }
        }
        for(let i = 0; i < dataToShow.length; i++) {
          results.appendChild(dataToShow[i])
        }
        
      } else {
        render = false;
        return alert("Datos incompletos o inválidos")
      }
      
      if ( render ) {
        if( showCalc.hasChildNodes() ) {
          const results = document.getElementById("results")
          showCalc.removeChild(results)
        }
        showCalc.append(results)
        // 1° arg restart data enable/disable, 2° arg value inputs enable/disable (only booleaan options)
        restartData(false, false)
      }
    }

    // ------------------------------------------------||
    
    