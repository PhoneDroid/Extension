const ⵠ = {};


{
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
      getDelta
  */

  ⵠ.getDelta = (type) => ⵠ.getImage(`Icons/delta/${ type }.png`);


  /*
      getImage
  */

  ⵠ.getImage = (path) => {
    return window
      .MbApi
      .getExtResPath(`deltablock/imgs/${ path }`,'deltablock')
  };


  /*
      Supported Devices
  */

  ⵠ.supportedDevices = [
    'arduino_leonardo',
    'arduino_mega',
    'arduino_mega2560',
    'arduino_micro',
    'arduino_nano',
    'arduino_nano_old',
    'arduino_uno',
    'arduino_yun'
  ];
}


/*
    Backlog
*/

{
  ⵠ.backlog = {
    log: [],
    warn: [],
    error: []
  };

  ⵠ.log = (...args) => ⵠ.backlog.log.push(...args);

  ⵠ.warn = (...args) => ⵠ.backlog.warn.push(...args);

  ⵠ.error = (...args) => ⵠ.backlog.error.push(...args);
}


/*
    Style
*/

{
  const sheet = document.createElement('style');
  sheet.textContent = `
    /* Body */

    .gui_body-wrapper {
      background-color: #195a84 !important;
    }


    /* Devices / Sprites / Background */

    .target-panel_wrapper {
      background-color: #3f7799 !important;
    }

    .target-panel_tab-list > li {
      color: #EAEAEA;
      font-weight: bold;
    }


    /* Scrollbar */

    .blocklyToolboxDiv > ::-webkit-scrollbar {
      background-color: #195a84 !important;
    }


    /* Grid */

    .blocklySvg {
      background-color: #3f7799 !important;
    }


    /* Categories */

    .scratchCategoryMenu {
      background-color: #3f7799 !important;
    }

    .blocks_blocks .blocklyToolboxDiv {
      width: fit-content !important;
    }

    .blocks_blocks .scratchCategoryMenuItem {
      padding: 0.875rem 5px 0.4375rem 5px !important;
    }

    .scratchCategoryMenuRow {
      min-width: 100% !important;
      width: fit-content !important;
    }

    .scratchCategoryMenuItem.categorySelected {
      background-color: #195a84 !important;
    }

    .blocks_blocks .scratchCategoryMenuItem:not(.categorySelected) .scratchCategoryMenuItemLabel {
      color: #EAEAEA !important;
      font-weight: bold !important;
    }


    /*  Flyout  */
    .blocklyFlyoutBackground {
      fill: #3F7799 !important;
    }



    /*  Borders  */

    .stage_stage {
      border: 1px solid #4D90B7 !important;
    }

    .editor-panel_wrapper {
      border: 1px solid #4D90B7 !important;
    }

    .blocks_blocks .blocklyFlyout {
      border-color: #4D90B7 !important;
    }

    .blocks_blocks .blocklyToolboxDiv {
      border-color: #4D90B7 !important;
    }
  `;

  document.head.append(sheet);
}


/*
    Load
*/

{
  ⵠ.script = {};

  ⵠ.script.load = (path) => (callback) => {
    const
      script = document.createElement('script'),
      url = window.MbApi.getExtResPath(`deltablock/${ path }`,'deltablock');

    script.type = 'application/javascript';
    script.src = url;
    script.addEventListener('load',callback);

    document.head.appendChild(script);
  };

  ⵠ.script.loadAll = (paths = []) => (callback) => {

    function next(){
      let path = paths.shift();

      if(path){
        ⵠ.script.load(path)(next);
      } else {
        callback();
      }
    }

    next();
  };
}


try {
  ⵠ.script.loadAll([
    '/libs/Utils.js',
    '/libs/proto/Map.js',
    '/libs/addressed/Addressable.js',
    '/libs/addressed/Array.js',
    '/libs/addressed/Set.js',
    '/libs/addressed/Map.js',
    '/libs/Flow.js'
  ])(() => {
    ⵠ.log('All Dependencies Loaded');


    resetOn('.stop-all_stop-all > span',"STOP");
    resetOn('.green-flag_green-flag > span',"START");

    function resetOn(selector,msg){
      document
      .querySelector(selector)
      .addEventListener('click',() => {
        ⵠ.warn(msg);

        ⵠ.Array.reset();
        ⵠ.Set.reset();
        ⵠ.Map.reset();
      });
    }
  });
} catch (e) {
  ⵠ.error(e);
}


/*
    Translations
*/

const translations = {
  en: {
    deltablock: 'ⵠ',
    extensionName: 'ⵠ',
    extensionDescription: 'Delta adds a variety of functions related to programming.',

    arduino_pin_mode: 'pin: ( [pin] ) mode: ( [mode] )',
    arduino_pin_digital_state: 'pin: ( [pin] ) state: ( [state] )',
    arduino_pin_to_float: 'toFloat ( [input] )',

    ⵠ_string: 'String',
    string_replace   : '[input] .replace ( [match] with [replacement] )',
    string_includes  : '[input] .includes ( [match] )',
    string_index_of  : '[input] .indexOf ( [match] )',
    string_substring : '[input] .substring ( from [from] to [to] )',

    ⵠ_array: 'Array',
    array_clear_all    : 'clearAll',
    array_new          : 'new Array ( [array] )',
    array_push         : '[array] .push ( [value] )',
    array_pop          : '[array] .pop ()',
    array_pop_return   : '[array] .pop ()',
    array_shift        : '[array] .shift()',
    array_shift_return : '[array] .shift()',
    array_unshift      : '[array] .unshift ( [value] )',
    array_value_at     : '[array] .valueAt ( [index] )',
    array_length       : '[array] .length()',
    array_concat       : '[input_1] + [input_2] → [output]',

    ⵠ_set: 'Set',
    set_init     : 'new Set ( [set] ) with ( [init] )',
    set_clear_all: 'clearAll',
    set_new      : 'new Set ( [set] )',
    set_add      : '[set] .add ( [value] )',
    set_remove   : '[set] .remove ( [value] )',
    set_contains : '[set] .contains ( [value] )',
    set_size     : '[set] .size()',
    set_clear    : '[set] .clear()',
    set_value_at : '[set] .valueAt ( [index] )',

    ⵠ_map: 'Map',
    map_init     : 'new Map ( [map] ) with ( [init] )',
    map_clear_all: 'clearAll',
    map_new      : 'new Map ( [map] )',
    map_put      : '[map] .put ( [key] , [value] )',
    map_delete   : '[map] .delete ( [key] )',
    map_has      : '[map] .has ( [key] )',
    map_size     : '[map] .size()',
    map_clear    : '[map] .clear()',
    map_get      : '[map] .get ( [key] )',

    ⵠ_crypt: 'Crypt',
    crypt_uuid: 'generate UUID',

    ⵠ_math: 'Math',
    math_min   : 'min ( [a] , [b] )',
    math_max   : 'max ( [a] , [b] )',
    math_limit : 'limit [input] to ( [min] , [max] )',
    math_negate: '- [input]',

    ⵠ_logic: 'Logic',
    logic_false        : 'False',
    logic_true         : 'True',
    logic_ternary      : 'if [condition] then [then] else [otherwise]',
    logic_ternary_true : 'if [condition] then [then]',
    logic_ternary_false: 'if [condition] else [otherwise]',

    ⵠ_flow: 'Flow',
    flow_event: 'on [event]',
    flow_call : 'call [event]'
  }
};


/*
    Blocks
*/

try {
  ⵠ.categories = [];


  /*
      Category
  */

  class Category {
    constructor(id,{ color , icon }){
      this.blocks = [];
      this.id = id;
      this.color = color;

      if(icon)
        this.icon = ⵠ.getDelta(icon);

      ⵠ.categories.push(this);
    };


    /*
        export | Object
    */

    export(){
      const { id , color , icon } = this;

      const blocks = this.exportBlocks();

      return {
        name: `ⵠ_${ id }`,
        colors: [ color ],
        menuIconURI: icon || '',
        blockIcon: (icon ? {
          type: 'image',
          width: 28,
          height: 26,
          src: icon
        } : null),
        menus: {},
        blocks
      };
    };


    /*
        block
    */

    block({ id , type , run , state , args , code , sections }){
      const block = {};

      block.id = id;
      block.type = type;
      block.run = run || δ;
      block.args = args;
      block.state = state;
      block.code = code || '';
      block.sections = sections || {};
      block.isDevice = valid(code) || valid(sections);
      block.getId = () => `${ this.id }_${ id }`;

      this.blocks.push(block);

      return this;
    };


    /*
        exportBlocks | ['']
    */

    exportBlocks(){
      const { id: cid } = this;

      return this
        .blocks
        .map(({ id , type , run , state , args = [] , code , sections }) => {
          const ags = {};

          args.forEach(({ id , type , example }) => {
            ags[id] = {
              type: type,
              defaultValue: example
            };
          });

          return {
            opcode: `${ cid }_${ id }`,
            blockType: type,
            gap: 12,
            codes: {},
            hidden: false,
            branchCount: 0,
            platform: ['mblockpc'],
            blockState: state,
            checkboxInFlyout: false,
            arguments: ags,

            disableOnline: false,
            disableOffline: false,
            generatorCode: false,
            // sort: 0,
            handler: {
              onAdd: () => {},
              onRemove: () => {},
              onMonitor: () => { ⵠ.log('onMonitor'); },
              onRun: (...args) => {
                try {
                  return run(...args);
                } catch (e){
                  ⵠ.error(
                    `onRunError in <${ id }>
                    func:
                    `,run,'\n',e);
                }

                return false;
              }
            codes: {
              arduinoc: {
                code: code,
                sections: sections
              }
            }
          };
        });
    };
  }


  /*
      Arduino
  */

  {
    new Category('arduino',{
      color: '#6BA3FF',
      icon: 'Arduino'
    })


    /*
        Pin Mode
    */

    .block({
      id: 'pin_mode',
      type: 'command',
      args: [{
        id: 'pin',
        type: 'number',
        example: "2"
      },{
        id: 'mode',
        type: 'string',
        example: 'output'
      }],
      code: `pinMode(/*{{
        (() => {
          let pin = this.pin;

          if(/^"[\\s\\S]*"$/.test(pin))
            pin = pin.substring(1,pin.length - 1);

          let temp = parseInt(pin);

          if(isNaN(temp)){
            return 'String(' + pin + ').toFloat()';
          } else {
            return temp < 0 ? 0 : temp;
          }
        })()
      }}*/,/*{{
        (() => {
          let mode = this.mode;

          if(/^[a-z_][a-z0-9_]*$/i.test(mode))
            return 'convertMode(String(' + mode + '))';
          else {
            mode = mode
              .toLowerCase()
              .substring(1,mode.length - 1);

            // ⵠ.warn(mode,mode == 'in',mode == 'input');

            return (mode == 'in' || mode == 'input') ? 'INPUT' : 'OUTPUT';
          }
        })()
      }}*/);`,
      sections: {
        declare:
          'bool convertMode(String mode){\n' +
          '  mode.toLowerCase();\n' +
          '  return (mode == "in" || mode == "input") ? INPUT : OUTPUT;\n' +
          '}\n'
      }
    })


    /*
        Set Digital
    */

    .block({
      id: 'pin_digital_state',
      type: 'command',
      args: [{
        id: 'pin',
        type: 'number',
        example: "2"
      },{
        id: 'state',
        type: 'string',
        example: 'high'
      }],
      code: `digitalWrite(/*{{
          (() => {
            let pin = this.pin;

            if(/^"[\\s\\S]*"$/.test(pin))
              pin = pin.substring(1,pin.length - 1);

            let temp = parseInt(pin);

            if(isNaN(temp)){
              return 'String(' + pin + ').toFloat()';
            } else {
              return temp < 0 ? 0 : temp;
            }
          })()
        }}*/,/*{{
          (() => {
            let state = this.state;

            // ⵠ.log('[' + state + ']');

            switch(true){
            case state === 'true':
              return 'HIGH';
            case state === 'false':
              return 'LOW';
            // case /^[a-z_][a-z0-9_]*$/i.test(state):
              // return 'convertState(String(' + state + '))';
            case /^"[\\s\\S]*"$/.test(state):
              state = state
                .toLowerCase()
                .substring(1,state.length - 1);

              return (state == 'high' || state == '1' || state == 'true') ? 'HIGH' : 'LOW';
            default:
              return 'convertState(String(' + state + '))';
            }
          })()
        }}*/);`,
      sections: {
        declare:
          'bool convertState(String state){\n' +
          '  state.toLowerCase();\n' +
          '  return (state == "true" || state == "1" || state == "high") ? HIGH : LOW;\n' +
          '}\n'
      }
    })


    /*
        To Float
    */

    .block({
      id: 'pin_to_float',
      type: 'number',
      args: [{
        id: 'input',
        type: 'string',
        example: "string"
      }],
      code: `String(/*{ input }*/).toFloat()`
    });
  }


  /*
      Flow
  */

  {
    new Category('flow',{
      color: '#68D4FF',
      icon: 'Flow'
    })


    /*
        Event
    */

    .block({
      id: 'event',
      type: 'hat',
      args: [{
        id: 'event',
        type: 'string',
        example: "event"
      }],
      run: ({ event }) => {
        return ⵠ.Flow.check(event);
      }
    })


    /*
        Call
    */

    .block({
      id: 'call',
      type: 'command',
      args: [{
        id: 'event',
        type: 'string',
        example: "event"
      }],
      run: ({ event },app) => {
        ⵠ.Flow.call(event,app);
      }
    });
  }


  /*
      Logic
  */

  {
    new Category('logic',{
      color: '#FF6B74',
      icon: 'Red'
    })


    /*
        False
    */

    .block({
      id: 'false',
      type: 'boolean',
      run: () => false,
      code: 'false'
    })

    /*
        True
    */

    .block({
      id: 'true',
      type: 'boolean',
      run: () => true,
      code: 'true'
    })


    /*
        Ternary
    */

    .block({
      id: 'ternary',
      type: 'string',
      args: [{
        id: 'condition',
        type: 'boolean',
        example: "condition"
      },{
        id: 'then',
        type: 'string',
        example: "123"
      },{
        id: 'otherwise',
        type: 'string',
        example: "456"
      }],
      run: ({ condition , then , otherwise }) => {
        return condition ? then : otherwise;
      },
      code: `(/*{ condition }*/) ? (/*{ then }*/) : (/*{ otherwise }*/)`
    })


    /*
        Ternary True
    */

    .block({
      id: 'ternary_true',
      type: 'string',
      args: [{
        id: 'condition',
        type: 'boolean',
        example: "condition"
      },{
        id: 'then',
        type: 'string',
        example: "123"
      }],
      run: ({ condition , then  }) => {
        return condition ? then : '';
      },
      code: `(/*{ condition }*/) ? (/*{ then }*/) : ''`
    })

    /*
        Ternary False
    */

    .block({
      id: 'ternary_false',
      type: 'string',
      args: [{
        id: 'condition',
        type: 'boolean',
        example: "condition"
      },{
        id: 'otherwise',
        type: 'string',
        example: "456"
      }],
      run: ({ condition , otherwise }) => {
        return condition ? '' : otherwise;
      },
      code: `(/*{ condition }*/) ? '' : (/*{ otherwise }*/)`
    });
  }


  /*
      String
  */

  {
    new Category('string',{
      color: '#FF6BAD',
      icon: 'Original'
    })


    /*
        Replace
    */

    .block({
      id: 'replace',
      type: 'string',
      args: [{
        id: 'input',
        type: 'string',
        example: "Something"
      },{
        id: 'match',
        type: 'string',
        example: "thing"
      },{
        id: 'replacement',
        type: 'string',
        example: "one"
      }],
      run: ({ input , match , replacement }) => {
        const regex = new RegExp(match,'g');
        return input.replace(regex,replacement);
      }
    })


    /*
        Substring
    */

    .block({
      id: 'substring',
      type: 'string',
      args: [{
        id: 'input',
        type: 'string',
        example: "Javascript"
      },{
        id: 'from',
        type: 'number',
        example: 4
      },{
        id: 'to',
        type: 'number',
        example: 10
      }],
      run: ({ input , from , to }) => {
        return input.substring(from,to);
      }
    })


    /*
        Includes
    */

    .block({
      id: 'includes',
      type: 'boolean',
      args: [{
        id: 'input',
        type: 'string',
        example: "Earth"
      },{
        id: 'match',
        type: 'string',
        example: "art"
      }],
      run: ({ input ,match }) => {
        const regex = new RegExp(match);
        return regex.test(input);
      }
    })


    /*
        Index Of
    */

    .block({
      id: 'index_of',
      type: 'number',
      args: [{
        id: 'input',
        type: 'string',
        example: "Me and you"
      },{
        id: 'match',
        type: 'string',
        example: "you"
      }],
      run: ({ input ,match }) => {
        return input.indexOf(match);
      }
    });
  }


  /*
      Array
  */

  {
    new Category('array',{
      color: '#FF976B',
      icon: 'Orange'
    })


    /*
        Clear All
    */

    .block({
      id: 'clear_all',
      type: 'command',
      run: () => {
        ⵠ.Array.clearAll();
      }
    })


    /*
        New
    */

    .block({
      id: 'new',
      type: 'command',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      }],
      run: ({ array }) => {
        ⵠ.Array.new(array);
      }
    })


    /*
        Push
    */

    .block({
      id: 'push',
      type: 'command',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      },{
        id: 'value',
        type: 'string',
        example: "someValue"
      }],
      run: ({ array , value }) => {
        ⵠ.Array.push(array,value);
      }
    })


    /*
        Pop
    */

    .block({
      id: 'pop',
      type: 'command',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      }],
      run: ({ array }) => {
        ⵠ.Array.pop(array);
      }
    })


    /*
        Pop & Return
    */

    .block({
      id: 'pop_return',
      type: 'string',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      }],
      run: ({ array }) => {
        return ⵠ.Array.pop(array);
      }
    })


    /*
        Pop
    */

    .block({
      id: 'shift',
      type: 'command',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      }],
      run: ({ array }) => {
        ⵠ.Array.shift(array);
      }
    })


    /*
        Shift & Return
    */

    .block({
      id: 'shift_return',
      type: 'string',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      }],
      run: ({ array }) => {
        return ⵠ.Array.shift(array);
      }
    })


    /*
        Unshift
    */

    .block({
      id: 'unshift',
      type: 'command',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      },{
        id: 'value',
        type: 'string',
        example: "someValue"
      }],
      run: ({ array , value }) => {
        ⵠ.Array.unshift(array,value);
      }
    })


    /*
        Value At
    */

    .block({
      id: 'value_at',
      type: 'string',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      },{
        id: 'index',
        type: 'number',
        example: "0"
      }],
      run: ({ array , index }) => {
        return ⵠ.Array.valueAt(array,index);
      }
    })


    /*
        Length
    */

    .block({
      id: 'length',
      type: 'string',
      args: [{
        id: 'array',
        type: 'string',
        example: "myArray"
      }],
      run: ({ array }) => {
        return ⵠ.Array.length(array);
      }
    })


    /*
        Concat
    */

    .block({
      id: 'concat',
      type: 'command',
      args: [{
        id: 'input_1',
        type: 'string',
        example: "anArray"
      },{
        id: 'input_2',
        type: 'string',
        example: "anotherArray"
      },{
        id: 'output',
        type: 'string',
        example: "someArray"
      }],
      run: ({ input_1 , input_2 , output }) => {
        return ⵠ.Array.concat(input_1,input_2,output);
      }
    });
  }


  /*
      Set
  */

  {
    new Category('set',{
      color: '#FFDA6B',
      icon: 'Set'
    })


    /*
        Clear All
    */

    .block({
      id: 'clear_all',
      type: 'command',
      run: () => {
        ⵠ.Set.clearAll();
      }
    })


    /*
        New
    */

    .block({
      id: 'new',
      type: 'command',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      }],
      run: ({ set }) => {
        ⵠ.Set.new(set);
      }
    })


    /*
        Init
    */

    .block({
      id: 'init',
      type: 'command',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      },{
        id: 'init',
        type: 'string',
        example: "these,are,5,seperate,values"
      }],
      run: ({ set , init }) => {
        ⵠ.Set.init(set,init);
      }
    })


    /*
        Add
    */

    .block({
      id: 'add',
      type: 'command',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      },{
        id: 'value',
        type: 'string',
        example: "someValue"
      }],
      run: ({ set , value }) => {
        ⵠ.Set.add(set,value);
      }
    })


    /*
        Remove
    */

    .block({
      id: 'remove',
      type: 'command',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      },{
        id: 'value',
        type: 'string',
        example: "someValue"
      }],
      run: ({ set , value }) => {
        ⵠ.Set.remove(set,value);
      }
    })


    /*
        Clear
    */

    .block({
      id: 'clear',
      type: 'command',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      }],
      run: ({ set }) => {
        ⵠ.Set.clear(set);
      }
    })


    /*
        Size
    */

    .block({
      id: 'size',
      type: 'number',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      }],
      run: ({ set }) => {
        return ⵠ.Set.size(set);
      }
    })


    /*
        Value At
    */

    .block({
      id: 'value_at',
      type: 'string',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      },{
        id: 'index',
        type: 'number',
        example: 0
      }],
      run: ({ set , index }) => {
        return ⵠ.Set.valueAt(set,index);
      }
    })


    /*
        Contains
    */

    .block({
      id: 'contains',
      type: 'boolean',
      args: [{
        id: 'set',
        type: 'string',
        example: "mySet"
      },{
        id: 'value',
        type: 'string',
        example: "someValue"
      }],
      run: ({ set , value }) => {
        return ⵠ.Set.contains(set,value);
      }
    });
  }


  /*
      Map
  */

  {
    new Category('map',{
      color: '#B96BFF',
      icon: 'Map'
    })


    /*
        Clear All
    */

    .block({
      id: 'clear_all',
      type: 'command',
      run: () => {
        ⵠ.Map.clearAll();
      }
    })


    /*
        New
    */

    .block({
      id: 'new',
      type: 'command',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      }],
      run: ({ map }) => {
        ⵠ.Map.new(map);
      }
    })


    /*
        New & Init
    */

    .block({
      id: 'init',
      type: 'command',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      },{
        id: 'init',
        type: 'string',
        example: "[x]: 2,[y]: 4,[something]: test"
      }],
      run: ({ map , init }) => {
        ⵠ.Map.init(map,init);
      }
    })


    /*
        Put
    */

    .block({
      id: 'put',
      type: 'command',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      },{
        id: 'key',
        type: 'string',
        example: "someKey"
      },{
        id: 'value',
        type: 'string',
        example: "someValue"
      }],
      run: ({ map , key , value }) => {
        ⵠ.Map.put(map,key,value);
      }
    })


    /*
        Delete
    */

    .block({
      id: 'delete',
      type: 'command',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      },{
        id: 'key',
        type: 'string',
        example: "aKey"
      }],
      run: ({ map , key }) => {
        ⵠ.Map.delete(map,key);
      }
    })


    /*
        Clear
    */

    .block({
      id: 'clear',
      type: 'command',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      }],
      run: ({ map }) => {
        ⵠ.Map.clear(map);
      }
    })


    /*
        Size
    */

    .block({
      id: 'size',
      type: 'number',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      }],
      run: ({ map }) => {
        return ⵠ.Map.size(map);
      }
    })


    /*
        Get
    */

    .block({
      id: 'get',
      type: 'string',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      },{
        id: 'key',
        type: 'string',
        example: "someKey"
      }],
      run: ({ map , key }) => {
        return ⵠ.Map.get(map,key);
      }
    })


    /*
        Has
    */

    .block({
      id: 'has',
      type: 'boolean',
      args: [{
        id: 'map',
        type: 'string',
        example: "myMap"
      },{
        id: 'key',
        type: 'string',
        example: "someKey"
      }],
      run: ({ map , key }) => {
        return ⵠ.Map.has(map,key);
      }
    });
  }


  /*
      Math
  */

  {
    new Category('math',{
      color: '#6BA3FF',
      icon: 'Blue'
    })


    /*
        Min
    */

    .block({
      id: 'min',
      type: 'number',
      args: [{
        id: 'a',
        type: 'number',
        example: 0
      },{
        id: 'b',
        type: 'number',
        example: 10
      }],
      run: ({ a , b }) => {
        return a > b ? b : a;
      }
    })


    /*
        Max
    */

    .block({
      id: 'max',
      type: 'number',
      args: [{
        id: 'a',
        type: 'number',
        example: 0
      },{
        id: 'b',
        type: 'number',
        example: 10
      }],
      run: ({ a , b }) => {
        return a > b ? a : b;
      }
    })


    /*
        Limit
    */

    .block({
      id: 'limit',
      type: 'number',
      args: [{
        id: 'input',
        type: 'number',
        example: -2
      },{
        id: 'min',
        type: 'number',
        example: 0
      },{
        id: 'max',
        type: 'number',
        example: 5
      }],
      run: ({ input , min , max }) => {
        if(input < min)
          return min;

        if(input > max)
          return max;

        return input;
      }
    })


    /*
        Negate
    */

    .block({
      id: 'negate',
      type: 'number',
      args: [{
        id: 'input',
        type: 'number',
        example: 0
      }],
      run: ({ input }) => {
        return - input;
      }
    });
  }


  /*
      Crypt
  */

  {
    new Category('crypt',{
      color: '#696969',
      icon: 'Gray'
    })


    /*
        UUID
    */

    .block({
      id: 'uuid',
      type: 'string',
      run: () => {
        return uuid();
      }
    });
  }
} catch (e) { ⵠ.error(e) }


define(['exports'],(exports) => {
  exports.default = class {

    /*
        getInfo
    */

    getInfo(){
      const targets = [];

      ⵠ.supportedDevices.forEach((target) => {
        targets.push({
          name: target,
          options: {
            upload: {
              middlewares: [{
                name: 'arduino',
                params: { sources: [] }
              }]
            }
          }
        });
      });

      return {
        id: 'deltablock',
        version: '1.0.0',
        snippets: {
          arduinoc: {}
        },
        generators: [],
        translationMap: translations,
        disabledOnline: [],
        mustLoginBlocks: [],
        disabledOffline: [],
        excludeBlocks: [],
        generatorStartBlocks: [],
        platform: ['mblockpc'],
        feature: ['worker'],
        codeTypes: ['arduinoc'],
        targets: [...targets,{
          name: 'sprites',
          options: {
            upload: {}
          }
        }],
        categories: ⵠ.categories.map((category) => category.export())
      };
    };


    /*
        getHandler
    */

    getHandler(){
      return {
        onLoad: function(app,target){
          ⵠ.log('[EH]: onLoad');
        },
        onUnload: function(){
          ⵠ.log('[EH]: onUnload');
        },
        onConnect: function(app,{ id }){
          ⵠ.log('[EH]: onConnect');
        },
        onDisconnect: function(app,{ id }){
          ⵠ.log('[EH]: onDisconnect');
        },
        onStopAll: function(app,{ id }){
          ⵠ.log('[EH]: onStopAll');
        },
        beforeChangeUploadMode: function(app,{ id }){
          ⵠ.log('[EH]: beforeChangeUploadMode');
        },
        beforeChangeDebugMode: function(app,{ id }){
          ⵠ.log('[EH]: beforeChangeDebugMode');
        },
        afterChangeUploadMode: function(app,{ id }){
          ⵠ.log('[EH]: afterChangeUploadMode');
        },
        afterChangeDebugMode: function(app,{ id }){
          ⵠ.log('[EH]: afterChangeDebugMode');
        },
        onSelect: function(app,device){
          ⵠ.log('[EH]: onSelect');
          ⵠ.log('is Device: ',ⵠ.isDevice(device));

          if(ⵠ.isDevice(device))
            app.workspace.disableBlocks(
              ...ⵠ
              .categories
              .map(({ blocks }) => {
                return blocks
                  .filter((block) => !block.isDevice)
                  .map((block) => `deltablock.${ block.getId() }`)
                  .flat();
              }).flat());
        },
        onUnselect: function(app,device){
          ⵠ.log('[EH]: onUnselect',device);
        },
        beforeCodeUpload: function(app,{ id }){
          ⵠ.log('[EH]: beforeCodeUpload');
        },
        afterCodeUpload: function(app,{ id }){
          ⵠ.log('[EH]: afterCodeUpload');
        },
        onRead: function(app,{ id }){
          // ⵠ.log('[EH]: onRead');
        },
        onSignIn: function(){
          ⵠ.log('[EH]: onSignIn');
        },
        onSignOut: function(){
          ⵠ.log('[EH]: onSignOut');
        }
      };
    };
  }
});
