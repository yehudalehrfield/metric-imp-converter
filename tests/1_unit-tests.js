const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Whole number', (done) => {
    let input = '123gal';
    assert.equal(convertHandler.getNum(input), 123);
    done();
  });
  test('Decimal number', (done) => {
    let input = '12.3mi';
    assert.equal(convertHandler.getNum(input), 12.3);
    done();
  });
  test('Fractional input', (done) => {
    let input = '3/5lbs';
    assert.equal(convertHandler.getNum(input), 3/5);
    done();
  });
  test('Fractional input with decimal', (done) => {
    let input = '12.25/4mi';
    assert.equal(convertHandler.getNum(input), 12.25/4);
    done();
  });
  test('Double fraction error', (done) => {
    let input = '3/2/3kg';
    assert.equal(convertHandler.getNum(input), null);
    done();
  });
  test('No numerical input', (done) => {
    let input = 'mi';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });
  test('Valid input units', (done) => {
    let input = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
    input.forEach(unit => assert.equal(convertHandler.getUnit(unit), unit));
    done();
  });
  test('Invalid input units', (done) => {
    // let validUnits = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
    let input = '123g'
    assert.equal(convertHandler.getUnit(input), null);
    done();
  });
  test('Valid return units', (done) => {
    let unitPairs = {
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs',
      'gal': 'l',
      'l': 'gal'
    };
    Object.keys(unitPairs).forEach(key => assert.equal(convertHandler.getReturnUnit(key),unitPairs[key]));
    done();
  });
  test('Return spelled out string', (done) => {
    let fullUnits = {
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'gal': 'gallons',
      'l': 'liters'
    };
    Object.keys(fullUnits).forEach(key => assert.equal(convertHandler.spellOutUnit(key),fullUnits[key]));
    done();
  });
  test('gal to L', (done) => {
    let input = 'gal'
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    assert.equal(
      convertHandler.convert(num,unit),
      3.78541
    );
    // assert.equal((convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input)),3.78541))
    done();
  });
  test('L to gal', (done) => {
    let input = 'L';
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    assert.equal(
      convertHandler.convert(num,unit),
      0.26417
    );
    // assert.equal((convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input)),0.26417))
    done();
  });
  test('mi to km', (done) => {
    let input = 'mi';
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    assert.equal(
      convertHandler.convert(num,unit),
      1.60934
    );
    // assert.equal((convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input)),1.60934))
    done();
  });
  test('km to mi', (done) => {
    let input = 'km';
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    assert.equal(
      convertHandler.convert(num,unit),
      0.62137
    );
    // assert.equal((convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input)),0.62137))
    done();
  });
  test('lbs to kg', (done) => {
    let input = 'lbs';
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    assert.equal(
      convertHandler.convert(num,unit),
      0.45359
    );
    // assert.equal((convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input)),0.45359))
    done();
  });
  test('kg to lbs', (done) => {
    let input = 'kg';
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    assert.equal(
      convertHandler.convert(num,unit),
      2.20462
    );
    // assert.equal((convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input)),2.20462))
    done();
  });

});