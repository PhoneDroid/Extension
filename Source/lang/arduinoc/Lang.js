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
      Pack
  */

  lang.pack = (path) => (func) => {
    lang[path] = `(${ '' + func })()`;
    ⵠ.warn(`(${ '' + func })()`)
  };
}
