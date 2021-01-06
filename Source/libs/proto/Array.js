/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / Array.js
*/

try {

  const proto = Array.prototype;
  proto.multiply = multiply;
  proto.unique = unique;
  proto.negate = negate;
  proto.first = first;
  proto.count = count;
  proto.add = add;


  /*
      Unique
  */

  function unique(){
    return [...new Set(this)];
  };


  /*
      Multiply
  */

  function multiply(factor = 1){
    return this.map((value) => value * factor);
  };


  /*
      Negate
  */

  function negate(){
    return this.map((value) => - value);
  };


  /*
      Add
  */

  function add(amount = 0){
    let mapper = (value) => value + amount;

    if(isArray(amount))
      mapper = (value,index) => value + amount[index];

    return this.map(mapper);
  };


  /*
      Count
  */

  function count(counter){
    return this
      .filter(counter)
      .length;
  };


  /*
      First
  */

  function first(){
    return this[0];
  };


  /*
      Over
  */

  Array.over = (from,to) => {
    const r = [...(function*(){
      let index = from;

      while(index <= to)
        yield index++;
    })()];

    ⵠ.log(r);

    return r;
  };

} catch (e) { ⵠ.error(e); }

finish('libs/proto/Array.js');
