/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    default / Array.js
*/

{
  ⵠ.log('Loading proto/Array.js');

  const proto = Array.prototype;


  /*
      Unique
  */

  proto.unique = function(){
    return [...new Set(this)];
  };
}
