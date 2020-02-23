(
    function(){
        //Defines that JavaScript code should be executed in "strict mode".
        "use strict;"

        // Shortcut to get elements
        var el = function(element) {
            // If passed an ID...
            if (element.charAt(0) == "#") { 
            // ... returns single element
            return document.querySelector(element);
        }
            // Otherwise, returns a nodelist
            return document.querySelectorAll(element); 
        };

        // Variables
        var viewer = el(".viewera"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".number"), // List of numbers
        ops = el(".operation"), // List of operators
        theNum = "", // Current number
        oldNum = "", // First number
        resultNum, // Result
        operator;

        var setNum = function() {
            // If a result was displayed, reset number
            if (resultNum) { 
              theNum = this.getAttribute("data-number");
              resultNum = "";
               // Otherwise, add digit to previous number (this is a string!)
            } else {
              theNum += this.getAttribute("data-number");
            }
            // Display current number
            viewer.innerHTML = theNum; 
          };

       // When: Equals is clicked. Calculate result
        var displayNum = function() {

            // Convert string input to numbers
            oldNum = parseFloat(oldNum);
            theNum = parseFloat(theNum);

            // Perform operation
            switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

            // If equal is pressed without an operator, keep number and continue
            default:
                resultNum = theNum;
            }

            // If NaN or Infinity returned
            if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) { 
                // If result is not a number; set off by, eg, double-clicking operators
                resultNum = "You broke it!";
            } else { 
                // If result is infinity, set off by dividing by zero
                resultNum = "Look at what you've done";
                // Break calculator
                el('.calculator').classList.add("broken"); 
                // And show reset button
                el('.reset').classList.add("show"); 
            }
            }

            // Display result, finally!
            viewer.innerHTML = resultNum;
            equals.setAttribute("data-result", resultNum);
            // Now reset oldNum & keep result
            oldNum = 0;
            theNum = resultNum;
        };  
        // When: Clear button is pressed. Clear everything
        var clearAll = function() {
            oldNum = "";
            theNum = "";
            viewer.innerHTML = "0";
            equals.setAttribute("data-result", resultNum);
        };

        /* The click events */

        // Add click event to numbers
        for (var i = 0, l = nums.length; i < l; i++) {
            nums[i].onclick = setNum;
        }

        // Add click event to operators
        for (var i = 0, l = ops.length; i < l; i++) {
            ops[i].onclick = moveNum;
        }

        // Add click event to equal sign
        equals.onclick = displayNum;

        // Add click event to clear button
        el(".clear").onclick = clearAll;

        // Add click event to reset button
        el(".reset").onclick = function() {
            window.location = window.location;
        };

    }());
