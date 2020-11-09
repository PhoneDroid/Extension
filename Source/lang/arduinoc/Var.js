/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Var.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Var.js');

  const lang = ArduinoC;

  const operators = {
    assign: '=',
    plus: '+=',
    minus: '-=',
    minus_reverse: '=',
    multiply: '*=',
    divide: '/=',
    mod: '%=',
    power: '='
  };


  const vars = new Map();


  /*
      Namify
  */

  function namify(original = ''){
    if(original.startsWith('\"'))
      original = original.substring(1,original.length - 1);

    let hashed = vars.get(original);

    if(hashed)
      return hashed;

    hashed = '';

    let
      num,
      hash = 0,
      sign = '',
      binary = 61;

    const
      table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      convert = (index) => hashed = table[index] + hashed;

    if(original.length !== 0)
      for(let c = 0;c < original.length;c++){
        let code = original.charCodeAt(c);
        hash = (hash << 5) - hash
        hash += code;
        hash &= hash;
      }

    if(hash < 0)
      sign = 'Z';

    hash = Math.abs(hash);

    while(hash >= binary){
      num = hash % binary;
      hash = Math.floor(hash / binary);

      convert(num);
    }

    if(hash > 0)
      convert(hash);

    hashed = `v_${ sign + hashed }`;

    vars.set(original,hashed);

    return hashed;
  };


  /*
      New
  */

  lang.var_new = ({ type , name }) => {
    ⵠ.warn(`type: ${ type }\nname: ${ name }`);

    return `${ type } ${ namify(name) };`;
  };


  /*
      Set
  */

  lang.var_set = ({ name , operator , value }) => {
    ⵠ.warn(`name: ${ name }\nvalue: ${ value }`);

    name = namify(name);

    return `${ name } = cast(${ name },${ value });`;
  };


  /*
      Assign
  */

  lang.var_assign = ({ name , operator , value }) => {
    ⵠ.warn(`name: ${ name }\nvalue: ${ value }`);

    name = namify(name);

    let
      op = operators[operator],
      pre = '',
      post = '';

    if(operator === 'power')
      pre = `${ name } *`;

    if(operator === 'minus_reverse')
      post = ` - ${ name }`;

    return `${ name } ${ op } ${ pre }cast(${ name },${ value })${ post };`;
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

  lang.var_for = ({ from , to , index }) => {
    const
      d = to > from,
      v = namify(index);

    return `for(int ${ v } = ${ d ? from : to };${ v } ${ d ? '<' : '>' } ${ d ? to : from };${ v }${ d ? '++' : '--'})`;
  };
}
