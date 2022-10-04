addEventListener("load", function() {
    const results = document.getElementById('results');
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

    calcBtn.addEventListener("click", function() {
        console.log(document.querySelector("option:checked").value);
        calculate(document.querySelector("#age").value, document.querySelector("#height-cm").value, document.querySelector("#weight").value, document.querySelector("option:checked").value);
    });
});