/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Lang.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Lang.js');

  const lang = ArduinoC = {};

  const
    reg_string = /^"[\S\s]*"$/,
    reg_number = /^((((-?[1-9]\d*(\.\d+)?)|(\.\d+))([eE]-?\d+)?)|(B[01]+)|(0x[0-9a-fA-F]+))$/;


  /*
      Reg
  */

  lang.reg = (name) => (func) => {
    lang[name] = (self) => {
      try {
        return func(self);
      } catch (e) {
        ⵠ.error(e);
        return '';
      }
    };
  };


  /*
      Is Empty
  */

  lang.isEmpty = (value) => value === 'None';


  /*
      Is String
  */

  lang.isString = (value) => reg_string.test(value);


  /*
      Is Number
  */

  lang.isNumber = (value) => reg_number.test(value);


  /*
      Pack
  */

  lang.pack = (path) => (func) => {
    lang[path] = `(${ '' + func })()`;
    ⵠ.warn(`(${ '' + func })()`)
  };
}
