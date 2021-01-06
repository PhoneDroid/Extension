/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Lang.js
*/

{

  const lang = ArduinoC = {};

  const
    reg_string = /^"[\S\s]*"$/,
    reg_number = /^((((-?[1-9]\d*(\.\d+)?)|(\.\d+))([eE]-?\d+)?)|(B[01]+)|(0x[0-9a-fA-F]+))$/;

  let
    func_counter = 0,
    funcs = new Map();


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
  };


  /*
      Func
  */

  lang.func = (name) => {
    return funcs.getOrInsert(name)(() => {
      return `f_${ lang.namify('' + func_counter++) }`;
    });
  };


  /*
      Namify
  */

  lang.namify = (name = '') => {
    let
      num,
      hash = 0,
      sign = '',
      binary = 61,
      hashed = '';

    const
      table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      convert = (index) => hashed = table[index] + hashed;

    if(name.length !== 0)
      for(let c = 0;c < name.length;c++){
        let code = name.charCodeAt(c);
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

    return sign + hashed;
  };
}

finish('lang/arduinoc/Lang.js');
