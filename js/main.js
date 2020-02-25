let result =0;
let previousOperator;
let buffer ="0";
const screen = document.querySelector(".viewer");



function buttonClicked(value)
{
    console.log("buttonClicked");
    
    /*isNaN Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number). */ 
    /*parseFloat Converts a string to an integer.*/
    if (isNaN(parseFloat(value)))
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
        buffer+=value;
    }
}

function handleMath(value) 
{
    if (buffer === "0") 
    {
      // do nothing
      return;
    }
    const intBuffer = parseFloat(buffer);
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
    else if (previousOperator === "*") 
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
            flushOperation(parseFloat(buffer));
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
        case "*":
        case "/":
            handleMath(value);
            break;
        case ".":
          if ( buffer.length == 0)     //no leading ".", use "0."
            { 
              buffer="0.";
            } 
            else
            {  
              buffer+=".";
            }
            break;
            
        }
  }

  function reRender() {
    screen.innerText = buffer;
  }

  function init() {
      console.log("init");
    
    document
      .querySelector(".calculator")
      .addEventListener("click", function(event) {
        buttonClicked(event.target.innerText);
      });
  }
  
  init();


