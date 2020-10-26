/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    Utils.js
*/


ⵠ.log('Loading Utils.js');


/*
    δ
*/

δ = () => {};


/*
    Valid
*/

  invalid = (value) => typeof value === 'undefined' || value === null;
  valid = (value) => ! invalid(value);


/*
    Call
*/

optional = (value) => (success,failure = δ) => {
  return valid(value) ? success(value) : failure();
};


/*
    UUID
*/

uuid = () => {
  const
    str = ([1e7]+-1e3+-4e3+-8e3+-1e11),
    processor = (c) => {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4)
        .toString(16);
    };

  return str.replace(/[018]/g,processor);
};
