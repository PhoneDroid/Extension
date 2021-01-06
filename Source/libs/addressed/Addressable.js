/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    addressed / Addressable.js
*/

try {

  ⵠ.addressable = (namespace) => ({ def }) => (callback) => {
    const
      bits = new Map(),
      bit = ⵠ[namespace] = {};


    /*
        Sanitize
    */

    const sanitize = (id) => (callback) => {
      const chars = id.match(/[^\p{L}_@#0-9-]+/gu) || [];

      if(chars.length < 1)
        callback();
      else
        ⵠ.error(`ID contains illegal chars: ${
          chars
          .map((char) => `[ ${ char } ]`)
          .join(',')
        }`);
    };


    /*
        Retrieve
    */

    const retrieve = (id) => (success,failure = δ) => {
      sanitize(id)(() => {
        bits.ⵠGet(id)(success,failure);
      },failure);
    };


    /*
        New
    */

    bit.new = (id) => {
      sanitize(id)(() => {
        bits.set(id,def());
      });
    };


    /*
        Reset
    */

    bit.reset = () => {
      bit.clearAll();
    };


    /*
        Clear All
    */

    bit.clearAll = () => {
      ⵠ.log(`Clearing all <${ namespace }>`);
      bits.clear();
    };


    try {
      callback(bits,{ sanitize , retrieve });
    } catch (e) { ⵠ.error(e); }
  };
} catch (e){ ⵠ.error(e); }

finish('libs/addressed/Addressable.js');
