/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Var.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Var.js');

  const lang = ArduinoC;


  const vars = new Map();


  /*
      Namify
  */

  function namify(original = ''){
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

  lang.var_set = ({ name , value }) => {
    ⵠ.warn(`name: ${ name }\nvalue: ${ value }`);

    name = namify(name);

    return `${ name } = cast(${ name },${ value })`;
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
int getType(int value){ return 0; }
int getType(bool value){ return 1; }
int getType(byte value){ return 2; }
int getType(char value){ return 3; }
int getType(long value){ return 4; }
int getType(float value){ return 5; }
int getType(short value){ return 6; }
int getType(double value){ return 7; }
int getType(String value){ return 8; }

template <typename Type,typename Input>
Type cast(Type type,Input input){
  String value = String(input);

  switch(getType(type)){
  case 0: return value.toInt();
  case 1: return value == "true" ? true : false;
  case 2: return (byte) value.toInt();
  case 3: return value.charAt(0);
  case 4: return atol(value.c_str());
  case 5: return value.toFloat();
  case 6: return (short) value.toInt();
  case 7: return value.toDouble();
  case 8: return value;
  }
};
`;
}
