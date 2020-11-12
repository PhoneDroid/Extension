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


  /*
      Substring
  */

  lang.reg('string_substring')(({ input , from , to }) => {
    const substring = lang.func('string_substring');
    return `${ substring }(${ input },${ from },${ to })`;
  });


  /*
      Substringer
  */

  lang.string_substringer = () => {
    const substring = lang.func('string_substring');
    return `
template<typename T1,typename T2,typename T3>
String ${ substring }(T1 input,T2 from,T3 to){
  String i = String(input);
  int
    f = toInt(from),
    t = toInt(to);

  return i.substring(f,t < 0 ? i.length - t : t);
}
    `;
  };


  /*
      Includes
  */

  lang.reg('string_includes')(({ input , match }) => {
    const includes = lang.func('string_includes');
    return `${ includes }(${ input },${ match })`;
  });


  /*
      Includer
  */

  lang.string_includer = () => {
    const includes = lang.func('string_includes');
    return `
template<typename T1,typename T2>
String ${ includes }(T1 input,T2 match){
  String
    i = String(input),
    m = String(match);

  return i.indexOf(m) != -1;
}
    `;
  };


  /*
      Index Of
  */

  lang.reg('string_index_of')(({ input , match }) => {
    const index_of = lang.func('string_index_of');
    return `${ index_of }(${ input },${ match })`;
  });


  /*
      Includer
  */

  lang.string_indexer = () => {
    const indexof = lang.func('string_index_of');
    return `
template<typename T1,typename T2>
String ${ indexof }(T1 input,T2 match){
  return String(input).indexOf(String(match)) != -1;
}`;
  };
}
