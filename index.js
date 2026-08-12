const radioInputs = document.querySelectorAll('.options')
radioInputs.forEach(option => {
    option.addEventListener('click', function () {
        radioInputs.forEach(option => {
            option.parentElement.classList.remove('lime-bg')
            console.log('clicked')
            this.parentElement.classList.add('lime-bg')
        })
    })
})
const mortgageTerm = document.querySelector('.two input')
mortgageTerm.addEventListener('input', () => {
    if (mortgageTerm.value > 100) {
        mortgageTerm.value = 100
    }
})
const interestRate = document.querySelector('.three input')
interestRate.addEventListener('input', () => {
    if (interestRate.value > 100) {
        interestRate.value = 100
    }
})
const submitButton = document.querySelector('.calculate-btn')
submitButton.addEventListener('click', function (event) {
    event.preventDefault()
    const floatInputs = document.querySelectorAll('input[type="float"]')
    floatInputs.forEach(input => {
        const error = input.closest('div').parentElement.querySelector('.error-message')
        const unit = input.closest('div').querySelector('.unit-box')
        const inputContainer = input.closest('div').parentElement.querySelector('.input-container')
        if (input.value.trim() === '' || Number(input.value.trim()) === 0) {
            error.classList.add('block')
            error.classList.remove('none')
            unit.classList.add('error2')
            inputContainer.classList.add('error')
            input.addEventListener('focus', function () {
                inputContainer.classList.remove('error')
                unit.classList.remove('error2')
            })
        }
        else {
            error.classList.remove('block')
            error.classList.add('none')
        }
    })
    const radioInput = document.querySelector('input[type="radio"]:checked')
    const error = document.querySelector('input[type="radio"]').closest('div').parentElement.querySelector('.error-message')

    if (!radioInput) {
        error.classList.add('block')
        error.classList.remove('none')
    }
    else {
        error.classList.remove('block')
        error.classList.add('none')
    }

    const amount = Number(document.querySelector('#amount').value)
    const term = Number(document.querySelector('#term').value)
    const rate = Number(document.querySelector('#rate').value)
    let monthlyRate, monthlyTotal
    if (radioInput.id === 'repayment') {
        monthlyRate = (rate / 100) / 12
        const noMonthlyPayments = term * 12
        const numerator = amount * (monthlyRate * (1 + monthlyRate) ** noMonthlyPayments)
        const denominator = (((1 + monthlyRate) ** noMonthlyPayments) - 1)
        monthlyTotal = (numerator / denominator)
        const formattedMonthlyTotal = monthlyTotal.toLocaleString('en-GB', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
        console.log(formattedMonthlyTotal)
        document.querySelector('#monthly-repayment').textContent = '£' + formattedMonthlyTotal
        const grossTotal = (monthlyTotal * term * 12)
        const formattedGrossTotal = grossTotal.toLocaleString('en-GB', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
        console.log(formattedGrossTotal)
        document.querySelector('#total-repayment').textContent = '£' + formattedGrossTotal
    }
    if (radioInput.id === 'interest-only') {
        monthlyRate = (rate / 100) / 12
        monthlyTotal = monthlyRate * amount
        const formattedMonthlyTotal = monthlyTotal.toLocaleString('en-GB', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
        console.log(typeof monthlyRate)
        document.querySelector('#monthly-repayment').textContent = '£' + formattedMonthlyTotal
        const grossTotal = (rate / 100) * amount * term
        const formattedGrossTotal = grossTotal.toLocaleString('en-GB', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
        console.log(formattedGrossTotal)
        document.querySelector('#total-repayment').textContent = '£' + formattedGrossTotal
    }
    if (String(amount) !== '' && amount !== 0 && String(term) !== '' && term !== 0 && String(rate) !== '' && rate !== 0 && !document.querySelector('input[name = "mortgage-type"]:checked')) {
        document.querySelector('.complete').classList.remove('none')
        document.querySelector('.complete').classList.add('flex')
        document.querySelector('.right').classList.remove('flex')
        document.querySelector('.right').classList.add('none')
    }
})

const clear = document.querySelector('#clear-btn')
clear.addEventListener('click', () => {
    const checkedLabel = document.querySelector('input[type="radio"]:checked').parentElement
    checkedLabel.classList.remove('lime-bg')
    document.querySelector('.complete').classList.remove('flex')
    document.querySelector('.complete').classList.add('none')
    document.querySelector('.right').classList.remove('none')
    document.querySelector('.right').classList.add('flex')
})
