/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    default / Map.js
*/

{
  ⵠ.log('Loading proto/Map.js');

  const proto = Map.prototype;


  /*
      ⵠGet
  */

  proto.ⵠGet = function(key){
    return optional(this.get(key));
  };
}
