/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / Set.js
*/

try {

  const proto = Set.prototype;
  proto.toArray = toArray;
  proto.filter = filter;
  proto.count = count;
  proto.map = map;



  /*
      Filter
  */

  function filter(filter){
    return this
      .toArray()
      .filter(filter);
  };


  /*
      Map
  */

  function map(mapper){
    return this
      .toArray()
      .map(mapper);
  };


  /*
      Count
  */

  function count(counter){
    return this
      .toArray()
      .count(counter);
  };


  /*
      To Array
  */

  function toArray(){
    return new Array(...this);
  };


  /*
      From
  */

  Set.from = (...values) => new Set(values);

} catch (e) { ⵠ.error(e); }

finish('libs/proto/Set.js');
