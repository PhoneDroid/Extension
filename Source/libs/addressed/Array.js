/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    addressed / Array.js
*/


try {

  ⵠ.addressable('Array')({
    def: () => []
  })((arrays,{ sanitize , retrieve }) => {

    /*
        Push
    */

    ⵠ.Array.push = (id,value) => {
      retrieve(id)((array) => {
        array.push(value);
      });
    };


    /*
        Pop
    */

    ⵠ.Array.pop = (id) => {
      let popped = '';

      retrieve(id)((array) => {
        popped = array.pop();
      });

      return popped;
    };


    /*
        Shift
    */

    ⵠ.Array.shift = (id) => {
      let shifted = '';

      retrieve(id)((array) => {
        shifted = array.shift();
      });

      return shifted;
    };


    /*
        Unshift
    */

    ⵠ.Array.unshift = (id,value) => {
      retrieve(id)((array) => {
        array.unshift(value);
      });
    };


    /*
        Value At
    */

    ⵠ.Array.valueAt = (id,index) => {
      let result = '';

      retrieve(id)((array) => {
        result = array[index];
      });

      return result;
    };


    /*
        Length
    */

    ⵠ.Array.length = (id) => {
      let length = 0;

      retrieve(id)((array) => {
        length = array.length;
      });

      return length;
    };


    /*
        Concat
    */

    ⵠ.Array.concat = (input1,input2,output) => {
      retrieve(input1)((arr1) => {
        retrieve(input2)((arr2) => {
          arrays.set(output,arr1.concat(arr2));
        });
      });
    };
  });
} catch (e) { ⵠ.error(e); }

finish('libs/addressed/Array.js');
