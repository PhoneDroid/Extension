/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://sites.google.com/view/deltablock/
    Email: JDK.FHWS@gmail.com
*/


{
  /*
      Classes
  */


  ⵠ.struc = {};

  const
    invalid = (value) => typeof value === 'undefined' || value === null,
    valid = (value) => ! invalid(value),
    call = (value) => (success,failure) => {
      return (valid(value) ? success : failure)(value);
    };


  ⵠ.struc.List = class Collection extends Map {

    /*  Get   */

    ⵠGet(key){
      return call(this.get(key));
    }

  };

}

{
  /*
      Array
  */


  ⵠ.Array = {};

  const arrays = new Map();


  /*
      new Array
  */

  ⵠ.Array.new = (id) => {
    sanitizeID(id)((id) => {
      arrays.set(id,new Array());
    });
  }


  /*
      push Value
  */

  ⵠ.Array.pushValue = (id,value) => {
    sanitizeID(id)((id) => {
      arrays.ⵠGet(id)((array) => {
        array.push(value);
      },() => {
        console.log(`Unkown array, ID: <${ id }>`);
      });
    });
  };


  /*
      pop
  */

  ⵠ.Array.pop = (id) => {
    sanitizeID(id)((id) => {
      arrays.ⵠGet(id)((array) => {
        array.pop();
      },() => {
        console.log(`Unkown array, ID: <${ id }>`);
      });
    });
  };



  /*
      sanitizeID
  */

  function sanitizeID(id = ''){
    return (callback) => {
      const chars = id.match(/[^\p{L}_0-9-]+/gu) ?? [];

      if(chars < 1)
        callback(id);
      else
        console.error(`ID contains illegal chars: ${
          chars
          .map((char) => `[ ${ char } ]`)
          .join(',')
        }`);
    }
  }
}
