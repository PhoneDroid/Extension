/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    Flow.js
*/


try {

  ⵠ.Flow = {};


  const
    awaiting = new Map(),
    events = new Set();


  /*
      Exe
  */

  function exe({ workspace }){
    workspace.runBlocks(`deltablock.flow_event`);
  };


  /*
      Call
  */

  function call(event,app,add = true){
    if(!events.has(event)){
      events.add(event);
      exe(app);
      
      setTimeout(() => {
        events.delete(event);
        retry(app);
      },100);

      return true;
    }

    if(add)
      awaiting.set(uuid(),event);

    return false;
  }


  /*
      Retry
  */

  function retry(app){
    const test = (event) => call(event,app,false);

    awaiting
    .filter(test)
    .allKeys()
    .forEach((id) => awaiting.delete(id));
  }


  /*
      Call
  */

  ⵠ.Flow.call = (event,app) => call(event,app);


  /*
      Check
  */

  ⵠ.Flow.check = (event) => events.has(event);

} catch (e){ ⵠ.error(e); }

finish('libs/Flow.js');
