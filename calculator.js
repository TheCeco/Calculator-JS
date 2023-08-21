const input = document.getElementById('number-input');

input.addEventListener('input', function () {
    console.log(input.value)
});

const numbers = document.getElementsByClassName('number');

for (let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', function () {
        input.value += numbers[i].children[0].textContent
    });
};

const operations = document.getElementsByClassName('operation')

operations[0].addEventListener('click', function() {
    input.value = '';
});

operations[1].addEventListener('click', function() {
    num = Number(input.value);
    
    result = num / 100;
    input.value = String(result);
});