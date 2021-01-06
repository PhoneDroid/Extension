/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    Console.js
*/


Console = {};

try {

  let html_base = `
    <Console>
      <Tools>
        <input type='text' playerholder='Execute cmds here'>
        <button onclick='Console.clear()'>Clear</button>
        <button onclick='Console.close()'>Close</button>
      </Tools>
      <Log></Log>
    </Console>
  `;

  let open,outer,inner;

  function init(){
    const container = create();
    container.innerHTML = html_base;
    document.body.appendChild(container);

    outer = query('Console');
    inner = query('Console > Log');
    input = query('Console > Tools > input');


    outer.hide();


    input.onkeyup = (event) => {
      if(event.key !== 'Enter')
        return;

      const cmd = input.value;

      console.log(`> ${ cmd }`);
      const result = eval(`(${ cmd })`);
      input.value = '';

      console.log(`>>`,result);
    };



    open = create();
    open.id = 'open';
    open.innerHTML = 'Console';
    open.onclick = () => Console.open();
    open.appendTo(document.body);


    stylesheet('Console.css');
  };


  if(document.readyState === 'complete')
    init();
  else
    window.addEventListener('load',init);



  /*
      Clear
  */

  Console.clear = () => inner.clear();


  /*
      Open / Close
  */

  Console.close = () => {
    outer.hide();
    open.show();
  };

  Console.open = () => {
    outer.show();
    open.hide();
  };



  /*
      Append
  */

  Console.append = (msgs = [],{ border }) => {
    const msg = document.createElement('Msg');

    if(border)
      msg.style.borderColor = border;

    let txt = '';

    msgs.forEach((msg) => {
      txt += convert(msg);
    });

    function convert(msg){
      let txt = '';

      try {
        switch(true){
        case msg === null:
          txt = 'null';
        break;
        case msg === undefined:
          txt = 'undefined';
        break;
        case typeof msg === 'boolean':
        case typeof msg === 'number':
          txt += msg;
        break;
        case msg instanceof Map:
          let entries = [];

          msg.forEach((v,k) => {
            entries.push(`${ k }: <${ v + '' }>`);
          });

          txt += `Map: {
          ${ entries.join('\n') }
          }`;
          break;
        case msg instanceof Set:
        case msg instanceof Array:
          txt +=
          `[
          ${
            msg
            .map((v) => `[${ typeof v }]: ${ convert(v) }`)
            .join('\n')
          }
          ]`;
          break;
        case msg instanceof Error:
          let stack = new Error().stack;
          txt += `${ msg }\n${ stack }`;
        case typeof msg === 'string':
          txt += msg;
          break;
        default:
          try {
            Object
            .keys(msg)
            .forEach((key) => {
              txt += `[${ key }]: <${ msg[key] }>\n`;
            });

            methods(msg).forEach((method) => {
              txt += `> ${ method }: ${ msg[method] }\n`;
            });

          } catch (e) {
            txt += msg;
          }
        }
      } catch (e) {
        txt += msg;
        txt += ' ERROR: ' + e;
      }

      txt += '    ';
      return txt;
    }

    msg.innerText = txt;

    if(inner.childNodes.length > 0)
      inner.insertBefore(msg,inner.childNodes[0]);
    else
      inner.appendChild(msg);

    {
      const nodes = inner.childNodes;

      if(nodes.length > 400)
        nodes[nodes.length - 1].remove();
    }
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

  ⵠ.backlog.error.forEach((v) => ⵠ.error(v));
  ⵠ.backlog.warn.forEach((v) => ⵠ.warn(v));
  ⵠ.backlog.log.forEach((v) => ⵠ.log(v));
  ⵠ.backlog = undefined;


  function methods(object){
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object));
  };

} catch (e) { ⵠ.error(e); }

finish('libs/Console.js');
