/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Logic.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Logic.js');

  const lang = ArduinoC;


  function wrap(input = ''){
    switch(true){
    case input === 'None':
      return '';
    case lang.isString(input):
      input = input.sub(1,-1);

      if(lang.isNumber(input))
        return input;

      return `"${ input }"`;
    default:
      return input;
    }
  };


  /*
      Ternary
  */

  lang.reg('logic_ternary')(({ condition , then , otherwise }) => {
    return `((${ condition }) ? (${ wrap(then) }) : (${ wrap(otherwise) }))`;
  });


  /*
      Ternary True
  */

  lang.reg('logic_ternary_true')(({ condition , then }) => {
    return `((${ condition }) ? (${ wrap(then) }) : '')`;
  });


  /*
      Ternary False
  */

  lang.reg('logic_ternary_false')(({ condition , otherwise }) => {
    return `((${ condition }) ? '' : (${ wrap(otherwise) }))`;
  });
}
