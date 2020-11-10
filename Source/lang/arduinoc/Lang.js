/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Lang.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Lang.js');

  const lang = ArduinoC = {};


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

  lang.isString = (value) => /^"[\S\s]*"$/.test(value);



  /*
      Pack
  */

  lang.pack = (path) => (func) => {
    lang[path] = `(${ '' + func })()`;
    ⵠ.warn(`(${ '' + func })()`)
  };
}
