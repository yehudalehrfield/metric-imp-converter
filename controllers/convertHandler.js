function ConvertHandler() {
  
  let units = {
    'mi': 'km',
    'gal': 'L',
    'lbs': 'kg',
    'km': 'mi',
    'L': 'gal',
    'kg': 'lbs'
  }
  // maybe combine the two objects into one - key: unit, value: [full unit, return/conversion full unit]
  let unitsFull = {
    'mi': 'miles',
    'gal': 'gallons',
    'lbs': 'pounds',
    'km': 'kilometers',
    'L': 'liters',
    'kg': 'kilograms'
  }
  
  this.getNum = function(input) {
    let result;
    // get raw input number (all chars before alphabetic)
    let rawNumInput = input.split(/[a-z]/i)[0];
    // split into array by /'s
    let numInputArr = rawNumInput.split('/');
    // Checks: 
    // 1. more than two elems - invalid (null)
    // 2. one elem - check if empty (value = 1) or zero (null) or invalid (null)
    // 3. two elems - check validity of both elems and perform division
    if (numInputArr.length > 2) {
      return null
    } else if (numInputArr.length == 1) {
      let numCheck = numInputArr[0]
      result = (numCheck == '') ? 1 : (isNaN(numCheck) || numCheck == '0') ? null : numCheck; 
    } else {
      let validNumer = !isNaN(numInputArr[0])
      let validDenom = !isNaN(numInputArr[1])
      result = (!validNumer || !validDenom) ? null : (numInputArr[0]/numInputArr[1]).toFixed(5);
    }
    return Number(result);
  };
  
  this.getUnit = function(input) {
    const unitRegex = /\D+$/ //get substring from right of string after (optional) digits
    if (!unitRegex.test(input)) return null; // if no unit, return null
    let result = input.match(unitRegex)[0].toLowerCase(); //convert input string to lower case
    result = (result == 'l') ? 'L' : result; // convert liter to 'L' instead of 'l'
    // return null if invalid unit 
    return (units.hasOwnProperty(result)) ? result : null; 
  };
  
  this.getReturnUnit = function(initUnit) {
    // get corresponding unit
    let result = units[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    // get full unit
    let result = unitsFull[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let conversionFactor = 0;

    // get appropriate conversion factor
    switch (initUnit.toLowerCase()) {
      case 'gal': 
        conversionFactor = galToL;
        break;
      case 'l':
        conversionFactor = 1/galToL;
        break;
      case 'lbs':
        conversionFactor = lbsToKg;
        break;
      case 'kg':
        conversionFactor = 1/lbsToKg;
        break;
      case 'mi':
        conversionFactor = miToKm;
        break;
      case 'km':
        conversionFactor = 1/miToKm;
        break;
      default:
        conversionFactor = 1;
    }
    
    // perform conversion
    let result = initNum*conversionFactor;
    
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
     
    return result;
  };
  
}

module.exports = ConvertHandler;
