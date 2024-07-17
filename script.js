document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let age = parseInt(document.getElementById('age').value);
    let activityLevel = parseInt(document.getElementById('activityLevel').value);

    let errorMessage = '';

    if (isNaN(height) || height <= 0) {
        errorMessage += 'Lütfen geçerli bir boy değeri giriniz. Boy negatif veya sıfır olamaz.<br>';
    }
    
    if (isNaN(weight) || weight <= 0) {
        errorMessage += 'Lütfen geçerli bir kilo değeri giriniz. Kilo negatif veya sıfır olamaz.<br>';
    }

    if (!gender) {
        errorMessage += 'Lütfen cinsiyetinizi seçiniz.<br>';
    }

    if (isNaN(age) || age <= 0) {
        errorMessage += 'Lütfen geçerli bir yaş değeri giriniz.<br>';
    }

    if (isNaN(activityLevel) || activityLevel < 1 || activityLevel > 4) {
        errorMessage += 'Lütfen geçerli bir aktiflik seviyesi seçiniz.<br>';
    }

    if (errorMessage) {
        document.getElementById('result').innerHTML = errorMessage;
        document.getElementById('result').style.color = 'red';
        return;
    }
    
    let bmi = calculateBMI(height, weight);
    let dailyCalories = calculateDailyCalories(weight, height, gender, age, activityLevel);
    let weightLossCalories = dailyCalories - 500;

    let result = `BMI Değeriniz: ${bmi.toFixed(1)}<br>`;
    result += `Önerilen Günlük Kalori: ${dailyCalories.toFixed(0)} kcal<br>`;
    result += `Kilo Kaybı İçin Önerilen Günlük Kalori: ${weightLossCalories.toFixed(0)} kcal`;
    
    document.getElementById('result').innerHTML = result;
    document.getElementById('result').style.color = 'black';
});

function calculateBMI(height, weight) {
    return weight / ((height / 100) ** 2);
}

function calculateDailyCalories(weight, height, gender, age, activityLevel) {
    let bmr;
    
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    let activityMultipliers = {
        1: 1.2,
        2: 1.375,
        3: 1.55,
        4: 1.725
    };
    
    return bmr * activityMultipliers[activityLevel];
}
