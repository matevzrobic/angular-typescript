addEventListener("load", function() {
    /*const results = document.getElementById('results');
    const calcBtn = document.getElementById('calc');

    function showResults(calories) {
        results.innerHTML = `<p>Vaš maksimalni dnevni vnos kalorij znaša: <strong>${(calories)}</strong>.</p>`;
        results.style.display = "flex";
    }
    
    function calculate(age, heightCM, weight, gender) {
    
        let calories = 0;
        if(gender == 'Female') {  
            calories = 655.09 + (9.56 * weight) + (1.84 * heightCM) - (4.67 * age);
        }  else {
            calories = 66.47 + (13.75 * weight) + (5 * heightCM) - (6.75 * age);
        }
        
        showResults(calories);
    }

    calcBtn.addEventListener("click", function(e) {
        e.preventDefault();
        console.log(document.querySelector("option:checked").value);
        calculate(document.querySelector("#age").value, document.querySelector("#height-cm").value, document.querySelector("#weight").value, document.querySelector("option:checked").value);
    });*/
    
    
    /*$("#queryCalc").on("click", function (event) {
      event.preventDefault();
      
        FoodSearch();
      
    });
    
    var limit = 24;
    var queryURL;
    var queryParams;
    function FoodSearch() {
    
      setParams();
      
      $.ajax({
        url: queryURL,
        method: "GET",
        data: queryParams
      })
        .then(function (response) {
          
          var first = response.hints[0];
          
          var str = `
                  <table class="table">
                      <thead>
                        <tr>
                          <th rowspan="6">
                              <img src="${first.food.image}" >
                          </th>
                          <th colspan="2">${(first.food.label).toUpperCase()}</th>
                        </tr>
                        <tr>
                          <td>Kalorije:</td>
                          <td>${first.food.nutrients.ENERC_KCAL} kcal</td>
                        </tr>
                        <tr>
                          <td>Beljakovine:</td>
                          <td>${first.food.nutrients.PROCNT} g</td>
                        </tr>
                        <tr>
                          <td>Ogljikovi hidrati:</td>
                          <td>${first.food.nutrients.CHOCDF} g</td>
                        </tr>
                        <tr>
                          <td>Maščobe:</td>
                          <td>${first.food.nutrients.FAT} g</td>
                        </tr>
                        <tr>
                          <td>Vlaknine:</td>
                          <td>${first.food.nutrients.FIBTG} g</td>
                        </tr>
                      </thead>
                  </table>`;
          
          //first.food.servingsPerContainer

          var child = document.createElement('div');
          child.innerHTML = str;
          
          var res = document.getElementById('results-here');
          res.innerHTML = '';
          res.appendChild(child);
         
          console.log(response);
        });
    
    }
    
    
    function setParams() {
      queryURL = "https://api.edamam.com/api/food-database/v2/parser";
      queryParams = {
        "app_id": "91aeea3f",
        "app_key": "89336a92f5a90027d3c5bea9ee46d7f8"
      };
      queryParams.ingr = encodeURI( $("#query").val().trim() );
    }
    
    */
});