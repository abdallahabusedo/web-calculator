let displayNumber =0;
let firstNumber =0;
let secondNumber =0;
let result =0;
let previousOperator;
let buffer ="0";
const screen = document.querySelector(".viewer");



/*function display_Number(element)
{
    document.getElementById("viewer").innerHTML = displayNumber;
}*/

function buttonClicked(value)
{
    /*isNaN Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number). */ 
    /*parseInt Converts a string to an integer.*/
    if (isNaN(parseInt(value)))
    {
        handleSymbol(value);
    }
    else 
    {
        handleNumber(value);
    }
    reRender();
}

function handleNumber(value)
{
    if (buffer ==="0") 
    {
        buffer=value;
    }
    else 
    {
        buffer+=value
    }
}

function handleMath(value) 
{
    if (buffer === "0") 
    {
      // do nothing
      return;
    }
    const intBuffer = parseInt(buffer);
    if (result === 0) 
    {
        result = intBuffer;
    } 
    else 
    {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) 
{
    if (previousOperator === "+") 
    {
      result += intBuffer;
    } 
    else if (previousOperator === "-") 
    {
      result -= intBuffer;
    } 
    else if (previousOperator === "×") 
    {
      result *= intBuffer;
    }
    else 
    {
      result /= intBuffer;
    }
  }

  function handleSymbol(value) 
  {
        switch (value) 
        {
        case "C":
            buffer = "0";
            result = 0;
            break;
        case "=":
            if (previousOperator === null) 
            {
            // need two numbers to do math
            return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = result;
            result = 0;
            break;
        case "←":
            if (buffer.length === 1) 
            {
            buffer = "0";
            } 
            else 
            {
            buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
        }
  }

  function reRender() {
    screen.innerText = buffer;
  }

  function init() {
    document
      .querySelector(".init();")
      .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
      });
  }
  
  init();


