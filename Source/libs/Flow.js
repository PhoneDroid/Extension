/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    Flow.js
*/


try {
  ⵠ.log('Loading Flow.js');

  ⵠ.Flow = {};


  const awaiting = new Map();
  const events = new Set();


  function exe(app){
    app.workspace.runBlocks(`deltablock.flow_event`);
  };

  function call(event,app,add = true){
    if(events.has(event)){
      add && awaiting.set(uuid(),event);
    } else {
      events.add(event);
      exe(app);
      setTimeout(() => {
        events.delete(event);
        retry(app);
      },100);

      return true;
    }

    return false;
  }

  function retry(app){
    awaiting.forEach((event,id) => {
      if(call(event,app,false))
        awaiting.delete(id);
    });
  }


  /*
      Call
  */

  ⵠ.Flow.call = (event,app) => call(event,app);


  /*
      Check
  */

  ⵠ.Flow.check = (event) => events.has(event);

} catch (e){
  ⵠ.error(e);
}
