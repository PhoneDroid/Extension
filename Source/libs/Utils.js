/*
    Copyright ⵠ(DeltaBlock) @ JDK, 2020

    Website: https://github.com/DeltaBlock/DeltaBlock
    Email: JDK.FHWS@gmail.com

    Utils.js
*/


ⵠ.log('Loading Utils.js');


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


/*
    is Device
*/

ⵠ.isDevice = (devsprite) => {
  const
    devices = ⵠ.supportedDevices,
    sprite = devsprite.tar.sprite;

  ⵠ.log(sprite.name);

  if(
    devices.includes(sprite.name)&&
    sprite.costumes_.length === 1
  ){
    const costume = sprite.costumes_[0];

    if(
      devices.includes(costume.name) &&
      costume.rotationCenterX === 47 &&
      costume.rotationCenterY === 55 &&
      costume.size[0] === 2 &&
      costume.size[1] === 2
    ){
      return true;
    }
  }

  return false;
};
