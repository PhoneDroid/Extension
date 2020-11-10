/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / Array.js
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


  /*
      Over
  */

  Array.over = (from,to) => {
    const r =  [...(function*(){
      let index = from;

      while(index <= to)
        yield index++;
    })()];

    ⵠ.log(r);

    return r;
  };
}
