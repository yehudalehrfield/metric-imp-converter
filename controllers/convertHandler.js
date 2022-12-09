function ConvertHandler() {
  
  let units = {
    'mi': 'km',
    'gal': 'l',
    'lbs': 'kg',
    'km': 'mi',
    'l': 'gal',
    'kg': 'lbs'
  }
  // maybe combine the two objects into one - key: unit, value: [full unit, return/conversion full unit]
  let unitsFull = {
    'mi': 'miles',
    'gal': 'gallons',
    'lbs': 'kilograms',
    'km': 'kilometers',
    'l': 'liters',
    'kg': 'kilograms'
  }
  
  this.getNum = function(input) {
    const numRegex = /^\d+/ //get num from left of string after (optional) digits
    let result = input.match(numRegex)[0];
    
    // return null if input number <=0, 1 if no input number, or input number
    return ((result || 1) <= 0) ? null : (result || 1);
  };
  
  this.getUnit = function(input) {
    const unitRegex = /\D+$/ //get unit from right of string after (optional) digits
    let result = input.match(unitRegex)[0]; 

    return (units.hasOwnProperty(result)) ? result : null; // only return valid units
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = units[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = unitsFull[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let conversionFactor = 0;

    if (!initNum) return 'invalid number';
    if (!initUnit) return 'invalid unit';
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
    
    let result = initNum*conversionFactor;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${spellOutUnit(initUnit)} converts to ${returnNum} ${spellOutUnit(returnUnit)} `;
     
    return result;
  };
  
}

module.exports = ConvertHandler;
