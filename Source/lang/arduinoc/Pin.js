/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    lang / arduinoc / Pin.js
*/

{
  ⵠ.log('Loading lang/arduinoc/Pin.js');

  const lang = ArduinoC;


  /*
      Resolve Pin
  */

  function resolvePin(pin){
    return (wrap) => {
      switch(true){
      case lang.isEmpty(pin):
        return '';
      case /^"(\d+,)*(\d+)"$/.test(pin):
        return pin
          .allMatches(/\d+/g)
          .unique()
          .map(wrap)
          .join('');
      case /^"\d-\d"$/.test(pin):
        return Array
          .over(...pin
            .sub(1,-1)
            .split('-')
            .map((v) => parseInt(v)))
          .map(wrap)
          .join('');
      default:
        return wrap(`toPin(${ pin })`);
      }
    };
  };


  /*
      To Pin
  */

  lang.pin_toPin = `
template <typename Type> int toPin(Type value){
  return cast(0,value);
}
  `;


  /*
      Mode
  */

  lang.reg('pin_mode')(({ pin , mode }) => {

    /*  State  */

    if(lang.isString(mode)){
      let m = mode
        .toLowerCase()
        .sub(1,-1)
        .is('input','in');

      mode = m ? 'INPUT' : 'OUTPUT';
    } else {
      mode = `toMode(${ mode })`;
    }


    /*  Pin  */

    return resolvePin(pin)((pin) => {
      return `pinMode(${ pin },${ mode });\n`;
    });
  });


  /*
      To Mode
  */

  lang.pin_toMode = `
template<typename Type> bool toMode(Type mode){
  String m = String(mode);
  m.toLowerCase();
  return (m == "in" || m == "input") ? INPUT : OUTPUT;
}
  `;


  /*
      State
  */

  lang.reg('pin_state')(({ pin , state }) => {
    false && ⵠ.warn(`
      pin: [${ pin }]
      state: [${ state }]
    `);

    const wrap = (pin) => {
      return `digitalWrite(${ pin },${ state });\n`;
    };


    /*  State  */

    switch(true){
    case state === 'true':
      state = 'HIGH';
      break;
    case state === 'false':
      state = 'LOW';
      break;
    case lang.isString(state):
      const s = state
        .toLowerCase()
        .substring(1,state.length - 1);

      state = 'LOW';

      if(s.is('high','1','true'))
        state = 'HIGH';
      break;
    default:
      state = `toState(${ state })`;
    }


    /*  Pin  */

    return resolvePin(pin)(wrap);
  });


  /*
      To State
  */

  lang.pin_toState = `
template<typename Type> bool toState(Type state){
  String s = String(state);
  s.toLowerCase();
  return (s == "true" || s == "1" || s == "high") ? HIGH : LOW;
}
  `;
}
