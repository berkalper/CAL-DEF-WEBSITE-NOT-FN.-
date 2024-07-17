document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let age = parseInt(document.getElementById('age').value);
    let activityLevel = parseInt(document.getElementById('activityLevel').value);

    // Hata mesajlarını göstermek için bir değişken tanımla
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
    let weightLossCalories = dailyCalories - 500; // Kilo kaybı için günlük kalori ihtiyacını 500 kalori azaltmak yaygın bir yaklaşımdır.

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
    // Basal Metabolic Rate (BMR) - Mifflin-St Jeor Equation
    let bmr;
    
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Erkekler için BMR
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161; // Kadınlar için BMR
    }
    
    // Aktiflik seviyesine göre kalori ihtiyacı çarpanları
    let activityMultipliers = {
        1: 1.2,   // Sedanter (çok az hareketli)
        2: 1.375, // Hafif aktif (hafif egzersiz yapılan)
        3: 1.55,  // Orta düzeyde aktif (günde 1 saat egzersiz)
        4: 1.725  // Çok aktif (günde 2 saat egzersiz)
    };
    
    // Aktiflik derecesine göre günlük kalori ihtiyacı hesaplama
    return bmr * activityMultipliers[activityLevel];
}
