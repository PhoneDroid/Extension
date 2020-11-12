/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Var.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Var.js');

  const
    lang = ArduinoC,
    vars = new Map(),
    operators = {
      minus_reverse: '=',
      multiply: '*=',
      divide: '/=',
      assign: '=',
      minus: '-=',
      power: '=',
      plus: '+=',
      mod: '%='
    };


  /*
      Namify
  */

  function namify(original = ''){
    if(original.startsWith('\"'))
      original = original.substring(1,original.length - 1);

    return vars.getOrInsert(original)(() => {
      return `v_${ lang.namify(original) }`;
    });
  };


  /*
      New
  */

  lang.var_new = ({ type , name }) => {
    return `${ type } ${ namify(name) };`;
  };


  /*
      Set
  */

  lang.var_set = ({ name , value }) => {
    let v = namify(name);

    return `${ v } = cast(${ v },${ value });`;
  };


  /*
      Assign
  */

  lang.var_assign = ({ name , operator , value }) => {
    let
      op = operators[operator],
      v = namify(name),
      post = '',
      pre = '';

    switch(operator){
    case 'power':
      pre = `${ v } * `;
      break;
    case 'minus_reverse':
      post = ` - ${ v }`;
      break;
    }

    return `${ v } ${ op } ${ pre }cast(${ v },${ value })${ post };`;
  };


  /*
      Get
  */

  lang.var_get = ({ name }) => {
    return namify(name);
  };


  /*
      Types
  */

  lang.var_types = `
template <typename Input> int cast(int type,Input value){
  return String(value).toInt();
}

template <typename Input> double cast(double type,Input value){
  return String(value).toDouble();
}

template <typename Input> bool cast(bool type,Input value){
  return String(value) == "true" ? true : false;
}

template <typename Input> byte cast(byte type,Input value){
  return (byte) String(value).toInt();
}

template <typename Input> char cast(char type,Input value){
  return String(value).charAt(0);
}

template <typename Input> long cast(long type,Input value){
  return atol(String(value).c_str());
}

template <typename Input> float cast(float type,Input value){
  return String(value).toFloat();
}

template <typename Input> short cast(short type,Input value){
  return (short) String(value).toInt();
}

template <typename Input> String cast(String type,Input value){
  return String(value);
}
`;


  /*
      For
  */

  lang.var_for = ({ from , to , index }) => {
    const
      d = to > from,
      v = namify(index);

    return `for(int ${ v } = ${ d ? from : to };${ v } ${ d ? '<' : '>' } ${ d ? to : from };${ v }${ d ? '++' : '--'})`;
  };
}
