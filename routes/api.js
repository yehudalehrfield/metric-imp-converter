"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let string;
    if (!initNum && !initUnit) {
      string = "invalid number and unit";
      res.send(string);
    } else if (!initNum) {
      string = "invalid number";
      res.send(string);
    } else if (!initUnit) {
      string = "invalid unit";
      res.send(string);
    } else {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      });
    }
  });
};
