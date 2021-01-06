/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    proto / html / Element.js
*/

{
  const proto = HTMLElement.prototype;
  proto.appendTo = appendTo;
  proto.clear = clear;
  proto.hide = hide;
  proto.show = show;


  /*
      Append To
  */

  function appendTo(element){
    element.appendChild(this);
  };


  /*
      Clear
  */

  function clear(){
    while(this.firstChild)
      this.removeChild(this.lastChild);
  };


  /*
      Hide
  */

  function hide(){
    this.style.display = 'none';
  };


  /*
      Show
  */

  function show(){
    this.style.display = '';
  };
}

finish('libs/proto/html/Element.js');
