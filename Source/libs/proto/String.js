/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / String.js
*/

try {

  const proto = String.prototype;
  proto.allMatches = AllMatches;
  proto.chars = Chars;
  proto.sub = Sub;
  proto.is = Is;


  /*
      All Matches
  */

  function AllMatches(regex){
    return this.match(regex) || [];
  };


  /*
      Sub
  */

  function Sub(from,to){
    return this.substring(from,to < 0 ? this.length + to : to);
  };


  /*
      Is
  */

  function Is(...values){
    if(isArray(values[0]))
      values = values[0];

    return values.includes(this.valueOf());
  };


  /*
      Chars
  */

  function Chars(){
    return [...this];
  };

} catch (e) { ⵠ.error(e); }

finish('libs/proto/String.js');
