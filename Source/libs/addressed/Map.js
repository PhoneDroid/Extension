/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    addressed / Map.js
*/


try {

  ⵠ.addressable('Map')({
    def: () => new Map()
  })((maps,{ sanitize , retrieve }) => {

    /*
        Init
    */

    ⵠ.Map.init = (id,init = '') => {
      sanitize(id)(() => {
        const map = new Map();
        maps.set(id,map);

        try {
          init
          .split(/,/g)
          .map((bit) => bit.trim())
          .map((bit) => bit.split(/:/))
          .forEach(([ key , value ]) => {
            key = key.substring(1,key.length - 1);
            map.set(key,value.trim());
          });
        } catch (e) { ⵠ.error(e); }
      });
    };


    /*
        Put
    */

    ⵠ.Map.put = (id,key,value) => {
      retrieve(id)((map) => {
        map.set(key,value);
      });
    };


    /*
        Remove
    */

    ⵠ.Map.remove = (id,key) => {
      retrieve(id)((map) => {
        map.delete(key);
      });
    };


    /*
        Size
    */

    ⵠ.Map.size = (id) => {
      let size = 0;

      retrieve(id)((map) => {
        size = map.size;
      });

      return size;
    };


    /*
        Get
    */

    ⵠ.Map.get = (id,key) => {
      let value;

      retrieve(id)((map) => {
        value = map.get(key);
      });

      return value || '';
    };


    /*
        Clear
    */

    ⵠ.Map.clear = (id) => {
      retrieve(id)((map) => {
        map.clear();
      });
    };


    /*
        Has
    */

    ⵠ.Map.has = (id,key) => {
      let result = false;

      retrieve(id)((map) => {
        result = map.has(key);
      });

      return result;
    };
  });
} catch (e) { ⵠ.error(e); }

finish('libs/addressed/Map.js');
