/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    Meta.js
*/


try {

  const
    Meta = {},
    callers = new Map(),
    listeners = new Map();


  /*
      Call
  */

  Meta.call = (func,args) => {
    callers
    .getOrDefault(func,[])
    .forEach((caller) => caller(args));
  };


  /*
      On Call
  */

  Meta.onCall = (func,caller) => {
    const list = callers.getOrDefault(func,[]);
    list.push(caller);
    callers.set(func,list);
  };


  /*
      Listen
  */

  Meta.listen = (name) => {
    return listeners
      .getOrDefault(name,'');
  };


  /*
      On Listen
  */

  Meta.onListen = (name,value) => {
    listeners.set(name,value);
  };


  ⵠ.Meta = Meta;

} catch (e){ ⵠ.error(e); }

finish('libs/Meta.js');
