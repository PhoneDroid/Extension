/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    addressed / Set.js
*/


try {

  ⵠ.addressable('Set')({
    def: () => new Set()
  })((sets,{ sanitize , retrieve }) => {

    /*
        Init
    */

    ⵠ.Set.init = (id,init = '') => {
      sanitize(id)(() => {
        const set = new Set();
        sets.set(id,set);

        init
        .split(/,/g)
        .forEach((bit) => {
          set.add(bit);
        });
      });
    };


    /*
        Add
    */

    ⵠ.Set.add = (id,value) => {
      retrieve(id)((set) => {
        set.add(value);
      });
    };


    /*
        Remove
    */

    ⵠ.Set.remove = (id,value) => {
      retrieve(id)((set) => {
        set.delete(value);
      });
    };


    /*
        Size
    */

    ⵠ.Set.size = (id) => {
      let size = 0;

      retrieve(id)((set) => {
        size = set.size;
      });

      return size;
    };


    /*
        Value At
    */

    ⵠ.Set.valueAt = (id,index) => {
      let value;

      retrieve(id)((set) => {
        value = [...set.values()][index];
      });

      return value || '';
    };


    /*
        Clear
    */

    ⵠ.Set.clear = (id) => {
      retrieve(id)((set) => {
        set.clear();
      });
    };


    /*
        Contains
    */

    ⵠ.Set.contains = (id,value) => {
      let result = false;

      retrieve(id)((set) => {
        result = set.has(value);
      });

      return result;
    };
  });
} catch (e) { ⵠ.error(e); }

finish('libs/addressed/Set.js');
