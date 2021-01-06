/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / Map.js
*/

try {

  const proto = Map.prototype;
  proto.ⵠGet = ⵠGet;
  proto.getOrInsert = getOrInsert;
  proto.getOrDefault = getOrDefault;



  /*
      ⵠGet
  */

  function ⵠGet(key){
    return optional(this.get(key));
  };


  /*
      Get Or Insert
  */

  function getOrInsert(key){
    return (supplier = δ) => {
      return optional(this.get(key))((id) => id,() => {
        const value = supplier(key);
        this.set(key,value);
        return value;
      });
    };
  };


  /*
      Get Or Default
  */

  function getOrDefault(key,def){
    return this.get(key) || def;
  };


  /*
      All Keys / Values
  */

  function allKeys(){
    return [...this.keys()];
  };

  function allValues(){
    return [...this.values()];
  };


  /*
      Map From Object
  */

  Map.fromObject = (object) => {
    return new Map(Object.entries(object));
  };

} catch (e) { ⵠ.error(e); }

finish('libs/proto/Map.js');
