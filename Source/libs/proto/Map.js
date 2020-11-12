/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / Map.js
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


  /*
      Get Or Insert
  */

  proto.getOrInsert = function(key){
    return (supplier = δ) => {
      return optional(this.get(key))((id) => id,() => {
        const value = supplier(key);
        this.set(key,value);
        return value;
      });
    };
  };
}
