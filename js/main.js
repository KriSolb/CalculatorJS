class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement
        this.currOpTextElement = currOpTextElement
        this.clear()
    }

    clear() {
        this.currOp = ""
        this.prevOp = ""
        this.operation = undefined
    }

    delete() {
        this.currOp = this.currOp.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currOp.includes(".")) return
        this.currOp = this.currOp.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOp === "") return
        if (this.prevOp !== "") {
            this.operate()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ""
    }

    operate() {
        let compute
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case "+":
                compute = prev + curr
                break
            case "-":
                compute = prev - curr
                break
            case "*":
                compute = prev * curr
                break
            case "/":
                compute = prev / curr
                break
            default:
                return
        }
        this.currOp = compute
        this.operation = undefined
        this.prevOp = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    displayValue() {
        this.currOpTextElement.innerText = this.getDisplayNumber(this.currOp)
        if (this.operation != null) {
            this.prevOpTextElement.innerText =
                `${this.getDisplayNumber(this.prevOp)} ${this.operation}`
        } else {
            this.prevOpTextElement.innerText = ""
        }
    }
}

const numButt = document.querySelectorAll("[data-number]")
const opButt = document.querySelectorAll("[data-operator]")
const clearButt = document.querySelector("[data-clear]")
const delButt = document.querySelector("[data-delete]")
const euqalsButt = document.querySelector("[data-equals]")
const prevOpTextElement = document.querySelector("[data-prev-op]")
const currOpTextElement = document.querySelector("[data-curr-op]")

const calculator = new Calculator(prevOpTextElement, currOpTextElement)

numButt.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.displayValue()
    })
})

opButt.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.displayValue()
    })
})

euqalsButt.addEventListener("click", button => {
    calculator.operate()
    calculator.displayValue()
})

clearButt.addEventListener("click", button => {
    calculator.clear()
    calculator.displayValue()
})

delButt.addEventListener("click", button => {
    calculator.delete()
    calculator.displayValue()
})