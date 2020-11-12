/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / String.js
*/

{
  ⵠ.log('Loading lang/arduinoc/String.js');

  const lang = ArduinoC;





  /*
      Replace
  */

  lang.reg('string_replace')(({ input , match , replacement }) => {
    const replace = lang.func('string_replace');

    return `${ replace }(${ input },${ match },${ replacement })`;
  });


  /*
      Replacer
  */

  lang.string_replacer = () => {
    const replace = lang.func('string_replace');
    return `
// String Replace
template<typename T1,typename T2> String ${ replace }(String input,T1 match,T2 replacement){
  input.replace(String(match),String(replacement));
  return input;
}`;
  };
}
