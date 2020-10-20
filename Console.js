/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://sites.google.com/view/deltablock/
    Email: JDK.FHWS@gmail.com

    Console
*/


try {
  let outer,inner;

  window.addEventListener('load',() => {
    outer = document.createElement('div');
    inner = document.createElement('div');

    outer.id = 'CONSOLE';

    outer.appendChild(inner);
    document.body.appendChild(outer);
  });


  Console = {};


  /*
      CLEAR
  */

  Console.clear = () => {
    while(inner.firstChild)
  		inner.removeChild(inner.lastChild);
  };


  /*
      APPEND
  */

  Console.append = (msgs = [],{ border }) => {
    const msg = document.createElement('div');
    msg.className = 'msg';

    if(border)
      msg.style.borderColor = border;

    let txt = '';

    msgs.forEach((msg) => {
      txt += `${ msg.toString ? msg.toString() : (msg + '') }   `;
    });

    msg.innerText = txt;

    inner.appendChild(msg);
  };


  /*
      LOG
  */

  ⵠ.log = (...args) => {
    Console.append(args,{
      border: '#ffffff69'
    });
  };

  /*
      WARN
  */

  ⵠ.warn = (...args) => {
    Console.append(args,{
      border: '#d79e18fc'
    });
  };


  /*
      ERROR
  */

  ⵠ.error = (...args) => {
    Console.append(args,{
      border: '#ce1d1de3'
    });
  };


  const style = document.createElement('style');

  style.innerHTML = `
    #CONSOLE {
      position: fixed;
      right: 0;
      top: 0;
      width: fit-content;
      height: fit-content;

      backgroundColor: black;
      border-radius: 10px;
      border: 1px solid white;

      overflow: hidden;

      z-index: 99999;
    }

    #CONSOLE > * {
      backgroundColor: #DDDDDD;
      min-height: 300px;
      min-width: 500px;

      overflow-y: scroll;
      overflow-x: hidden;

      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: stretch;

      padding: 3px;
    }

    #CONSOLE > * > .msg {
      padding: 1px 8px;

      color: white;
      border: 1px solid white;
      border-radius: 6px;
      margin-bottom: 2px;
      font-family: Tahoma, Geneva, sans-serif;
    }
  `;

  document.head.appendChild(style);
} catch (e){
  window.e = e;
}
