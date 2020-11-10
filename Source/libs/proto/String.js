/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / String.js
*/

{
  ⵠ.log('Loading proto/String.js');

  const proto = String.prototype;


  /*
      All Matches
  */

  proto.allMatches = function(regex){
    return this.match(regex) || [];
  };


  /*
      Sub
  */

  proto.sub = function(from,to){
    return this.substring(from,to < 0 ? this.length + to : to);
  };


  /*
      Is
  */

  proto.is = function(...values){
    if(isArray(values[0]))
      values = values[0];

    return values.includes(this.valueOf());
  };
}
