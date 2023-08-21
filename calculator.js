const input = document.getElementById('number-input');

input.addEventListener('input', function () {
    const pattern = /^([\d]+)(\.?)([\d]+)$/

    if (!input.value.match(pattern) && input.value.length > 0){
        input.style.border = '1px solid red' 
        input.style.boxShadow = '0 0 5px red'
    } else {
        input.style.border = ''
        input.style.boxShadow = ''
    }
})


const numbers = document.getElementsByClassName('number');

for (let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', function () {
        if (input.value.startsWith('0')) {
            input.value = numbers[i].children[0].textContent
        } else {
            input.value += numbers[i].children[0].textContent
        }    
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

operations[6].addEventListener('click', function() {
    if (input.value.length > 0 && !input.value.includes('.')) {
        input.value = input.value + '.'
    }
})