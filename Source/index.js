const ⵠ = {
  script: {},
  root: window.MbApi.getExtResPath('','')
};


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
      Is
  */

  isFunc = (value) => typeof value === 'function';
  isArray = (value) => typeof value === 'array';


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
  const { root , script } = ⵠ;


  /*
      Load Internal
  */

  script.loadInternal = (path) => script.load(`${ root }deltablock/${ path }`);


  /*
      Load
  */

  script.load = (path) => (callback) => {
    try {
      const script = document.createElement('script');

      script.src = path;
      script.type = 'application/javascript';
      script.addEventListener('load',callback);

      document.head.appendChild(script);
    } catch (e) { ⵠ.error(e); }
  };


  /*
      Load All
  */

  script.loadAll = (paths = [],internal = true) => (callback) => {
    const loader = script[internal ? 'loadInternal' : 'load'];

    try {
      function next(){
        let path = paths.shift();

        if(path){
          loader(path)(next);
        } else {
          callback();
        }
      }

      next();
    } catch (e) { ⵠ.error(e); }
  };
}


try {
  ⵠ.script.loadAll([
    'libs/Utils.js',
    'libs/proto/String.js',
    'libs/proto/Array.js',
    'libs/proto/Map.js',
    'libs/addressed/Addressable.js',
    'libs/addressed/Array.js',
    'libs/addressed/Set.js',
    'libs/addressed/Map.js',
    'libs/Flow.js',
    'lang/arduinoc/Lang.js',
    'lang/arduinoc/String.js',
    'lang/arduinoc/Logic.js',
    'lang/arduinoc/Var.js',
    'lang/arduinoc/Array.js',
    'lang/arduinoc/Set.js',
    'lang/arduinoc/Pin.js'
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


    /*
        Load External Scripts
    */

    try {
      ⵠ.script.load(`${ ⵠ.root }../Scripts/Scripts.js`)(() => {
        if(typeof Scripts !== 'undefined'){
          const paths = Scripts
            .map((path) => `${ ⵠ.root }../Scripts/${ path }`);

          ⵠ.script.loadAll(paths,false)(() => {
            ⵠ.log(`External scripts loaded`);
          });
        }
      });
    } catch (e) { ⵠ.error(e); }
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

    ⵠ_arduino: 'Arduino',
    arduino_pin_mode: 'set Mode of ( [pin] ) to ( [mode] )',
    arduino_pin_digital_state: 'set State of ( [pin] ) to ( [state] )',
    arduino_pin_to_float: 'toFloat ( [input] )',
    arduino_var_new: '[type] [name]',
    arduino_var_set: '[name] = [value]',
    arduino_var_set_literal: '>> [name] = [value]',
    arduino_var_assign: '[name] [operator] [value]',
    arduino_var_get: '[name]',
    arduino_var_for: 'from: ( [from] ) to: ( [to] ) index: ( [index] )',

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
    logic_compare      : '[a] [operator] [b]',

    ⵠ_flow: 'Flow',
    flow_event: 'on [event]',
    flow_call : 'call [event]',

    variable_type_int: "Int",
    variable_type_bool: "Bool",
    variable_type_byte: "Byte",
    variable_type_char: "Char",
    variable_type_long: "Long",
    variable_type_short: "Short",
    variable_type_float: "Float",
    variable_type_double: "Double",
    variable_type_string: "String",

    assignment_type_plus: "+=",
    assignment_type_minus: "-=",
    assignment_type_minus_reversed: "=-",
    assignment_type_multiply: "*=",
    assignment_type_divide: "/=",
    assignment_type_mod: "%=",
    assignment_type_power: "^=",

    compare_equal: "==",
    compare_unequal: "!=",
    compare_less: "<",
    compare_less_equal: "<=",
    compare_greater: ">",
    compare_greater_equal: ">="
  }
};


/*
    Blocks
*/

try {
  ⵠ.categories = [];


  /*
      Stringify Funcs
  */

  function δFunc(func){
    return `/*{{(() => ${ ('' + func).substring(6) })()}}*/`;
  };

  const δRefer = (value) => isFunc(value) ? δFunc(value) : value;


  /*
      Category
  */

  class Category {
    constructor(id,{ color , icon }){
      this.blocks = [];
      this.menus = {};
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

      const
        blocks = this.exportBlocks(),
        menus = this.menus;

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
        blocks,
        menus
      };
    };


    /*
        block
    */

    block({ id , type , run , state , args , code , sections = {} }){
      const block = {};

      block.id = id;
      block.type = type;
      block.run = run || δ;
      block.args = args;
      block.state = state;
      block.code = δRefer(code) || '';
      block.getId = () => `${ this.id }_${ id }`;

      block.sections = {
        declare: δRefer(sections.declare)
      };

      block.isDevice = valid(code) || Object.keys(sections).length > 0;
      block.isSprite = valid(run);

      this.blocks.push(block);

      return this;
    };


    /*
        Menu
    */

    menu(type,items){
      this.menus[type] = items;

      return this;
    };


    /*
        Label
    */

    label(name){
      const id = uuid();

      this.block({
        id: id,
        type: 'button'
      });

      translations['en'][`${ this.id }_${ id }`] = name;
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

          args.forEach(({ id , type , example , menu }) => {
            ags[id] = {
              type,
              menu,
              defaultValue: example
            };
          });

          return {
            opcode: `${ cid }_${ id }`,
            blockType: type,
            gap: 12,
            codes: {},
            hidden: false,
            branchCount: type === 'conditional' ? 1 : 0,
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
            },
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
        PIN
    */

    .label('Pin:')


    /*
        Pin Mode
    */

    .block({
      id: 'pin_mode',
      type: 'command',
      args: [{
        id: 'pin',
        type: 'string',
        example: "2"
      },{
        id: 'mode',
        type: 'string',
        example: 'output'
      }],
      code: () => ArduinoC.pin_mode(this),
      sections: {
        declare: () => ArduinoC.pin_toMode + ArduinoC.pin_toPin
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
        type: 'string',
        example: "2"
      },{
        id: 'state',
        type: 'string',
        example: 'high'
      }],
      code: () => ArduinoC.pin_state(this),
      sections: {
        declare: () => ArduinoC.pin_toState + ArduinoC.pin_toPin
      }
    })



    /*
        MATH
    */

    .label('Math')


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
    })



    /*
        VARIABLE
    */

    .label('Variable:')


    /*
        new Var
    */

    .block({
      id: 'var_new',
      type: 'command',
      args: [{
        id: 'type',
        type: 'fieldMenu',
        menu: 'variable_type',
        example: "bool"
      },{
        id: 'name',
        type: 'string',
        example: "variable"
      }],
      code: () => ArduinoC.var_new(this)
    })


    /*
        Variable Types
    */

    .menu('variable_type',[
      {
        text: 'variable_type_bool',
        value: 'bool'
      },{
        text: 'variable_type_byte',
        value: 'byte'
      },{
        text: 'variable_type_char',
        value: 'char'
      },{
        text: 'variable_type_double',
        value: 'double'
      },{
        text: 'variable_type_float',
        value: 'float'
      },{
        text: 'variable_type_int',
        value: 'int'
      },{
        text: 'variable_type_long',
        value: 'long'
      },{
        text: 'variable_type_short',
        value: 'short'
      },{
        text: 'variable_type_string',
        value: 'String'
      }
    ])


    /*
        set Var
    */

    .block({
      id: 'var_set',
      type: 'command',
      args: [{
        id: 'name',
        type: 'string',
        example: "variable"
      },{
        id: 'value',
        type: 'string',
        example: "value"
      }],
      code: () => ArduinoC.var_set(this),
      sections: {
        declare: () => ArduinoC.var_types
      }
    })



    /*
        set Literal
    */

    .block({
      id: 'var_set_literal',
      type: 'command',
      args: [{
        id: 'name',
        type: 'string',
        example: "variable"
      },{
        id: 'value',
        type: 'string',
        example: "value"
      }],
      code: () => ArduinoC.var_set_literal(this),
      sections: {
        declare: () => ArduinoC.var_types
      }
    })


    /*
        assign Var
    */

    .block({
      id: 'var_assign',
      type: 'command',
      args: [{
        id: 'name',
        type: 'string',
        example: "variable"
      },{
        id: 'operator',
        type: 'fieldMenu',
        menu: 'assignment_types',
        example: "plus"
      },{
        id: 'value',
        type: 'string',
        example: "value"
      }],
      code: () => ArduinoC.var_assign(this),
      sections: {
        declare: () => ArduinoC.var_types
      }
    })


    /*
        Assigment Types
    */

    .menu('assignment_types',[
      {
        text: 'assignment_type_plus',
        value: 'plus'
      },{
        text: 'assignment_type_minus',
        value: 'minus'
      },{
        text: 'assignment_type_minus_reversed',
        value: 'minus_reverse'
      },{
        text: 'assignment_type_multiply',
        value: 'multiply'
      },{
        text: 'assignment_type_divide',
        value: 'divide'
      },{
        text: 'assignment_type_mod',
        value: 'mod'
      },{
        text: 'assignment_type_power',
        value: 'power'
      }
    ])


    /*
        get Var
    */

    .block({
      id: 'var_get',
      type: 'string',
      args: [{
        id: 'name',
        type: 'string',
        example: "variable"
      }],
      code: () => ArduinoC.var_get(this)
    })



    /*
        FLOW
    */

    .label('Flow:')


    /*
        For
    */

    .block({
      id: 'var_for',
      type: 'conditional',
      args: [{
        id: 'from',
        type: 'number',
        example: "0"
      },{
        id: 'to',
        type: 'number',
        example: "10"
      },{
        id: 'index',
        type: 'string',
        example: "index"
      }],
      code: δFunc(() => ArduinoC.var_for(this)) + '{\n\n  /*{ $BRANCH1 }*/\n}'
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
      code: () => ArduinoC.logic_ternary(this)
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
      code: () => ArduinoC.logic_ternary_true(this)
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
      code: () => ArduinoC.logic_ternary_false(this)
    })


    /*
        Compare
    */

    .block({
      id: 'compare',
      type: 'boolean',
      args: [{
        id: 'a',
        type: 'string',
        example: "123"
      },{
        id: 'operator',
        type: 'fieldMenu',
        menu: 'compare_operators',
        example: 'equal'
      },{
        id: 'b',
        type: 'string',
        example: "456"
      }],
      run: ({ a , operator , b }) => {
        switch(operator){
        case 'equal':
          return a == b;
        case 'unequal':
          return a != b;
        case 'less':
          return a < b;
        case 'greater':
          return a > b;
        case 'less_equal':
          return a <= b;
        case 'greater_equal':
          return a >= b;
        default:
          return false;
        }
      },
      code: () => ArduinoC.logic_compare(this)
    })


    /*
        Compare Operators
    */

    .menu('compare_operators',[
      {
        text: 'compare_equal',
        value: 'equal'
      },{
        text: 'compare_unequal',
        value: 'unequal'
      },{
        text: 'compare_less',
        value: 'less'
      },{
        text: 'compare_less_equal',
        value: 'less_equal'
      },{
        text: 'compare_greater_equal',
        value: 'greater_equal'
      },{
        text: 'compare_greater',
        value: 'greater'
      }
    ]);
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
      },
      code: () => ArduinoC.string_replace(this),
      sections: {
        declare: () => ArduinoC.string_replacer()
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
        return input.sub(from,to);
      },
      code: () => ArduinoC.string_substring(this),
      sections: {
        declare: () => ArduinoC.string_substringer()
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
      },
      code: () => ArduinoC.string_includes(this),
      sections: {
        declare: () => ArduinoC.string_includer()
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
      },
      code: () => ArduinoC.string_index_of(this),
      sections: {
        declare: () => ArduinoC.string_indexer()
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      sections: {
        declare: () => ArduinoC.set_class
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
      },
      code: `min(/*{ a }*/,/*{ b }*/)`
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
      },
      code: `max(/*{ a }*/,/*{ b }*/)`
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
      },
      code: `contrain(/*{ input }*/,/*{ min }*/,/*{ max }*/)`
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
      },
      code: `-(/*{ input }*/)`
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
          else
            app.workspace.disableBlocks(
              ...ⵠ
              .categories
              .map(({ blocks }) => {
                return blocks
                  .filter((block) => !block.isSprite)
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
