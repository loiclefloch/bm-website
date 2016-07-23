/**
* Eslint configuration.
* 0 = off, 1 = warn, 2 = error
*/
var WARNING = 1;
var OFF = 0;
var ERROR = 2;

/* see https://github.com/airbnb/javascript. We extends airbnb style. */

module.exports = {
  root: true,

  parser: 'babel-eslint',

  /**
  * We use airbnb eslint plugin
  * https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
  */
  extends: 'airbnb',

  plugins: [
    'flowtype',
    'react'
    // https://www.npmjs.com/package/eslint-plugin-flowtype
  ],

  env: {
    jquery : true
  },

  settings: {
    react: {
      pragma: 'React',  // Pragma to use, default to 'React'
      version: '0.14.0' // React version, default to the latest React stable release
    },

    'import/ignore': [
      'node_modules',
      '\\.(json|css|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$',
    ],
    'import/extensions': ['.js'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      },
      // see https://github.com/tleunen/eslint-import-resolver-babel-module-alias
      'babel-module-alias': {}
    }
  },
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true
    }
  },
  rules: {
    // disable requiring trailing commas. see http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': OFF,

    // see https://github.com/eslint/eslint/blob/master/docs/rules/no-underscore-dangle.md
    'no-underscore-dangle': OFF,

    // flow type
    'flowtype/require-parameter-type': WARNING,
    'flowtype/require-return-type': [
      OFF,
      'always',
      {
        'annotateUndefined': 'never'
      }
    ],
    'flowtype/space-after-type-colon': [
      WARNING,
      'never' // webstorm reindent without space :
    ],
    'flowtype/space-before-type-colon': [
      WARNING,
      'never'
    ],
    'flowtype/type-id-match': [
      WARNING,
      '^([A-Z][a-z0-9]+)+Type$'
    ],
    'react/jsx-handler-names': [
      WARNING,
      {
        eventHandlerPrefix: 'on',
        eventHandlerPropPrefix: 'on',
      }
    ],
    'no-case-declarations': OFF, // http://eslint.org/docs/rules/no-case-declarations
    'react/sort-comp': [
      /*
       *  https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
       *  https://github.com/airbnb/javascript/blob/7684892951ef663e1c4e62ad57d662e9b2748b9e/packages/eslint-config-airbnb/rules/react.js#L122-L134
       */
      //
      ERROR,
      {
        order: [
          'static-methods',
          'lifecycle',
          'getters',
          'everything-else',
          'events',
          'rendering'
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount'
          ],
          rendering: [
            '/^render.+$/',
            'render'
          ],
          getters: [
            '/^get.+$/'
          ],
          events: [
            '/^on.+$/',
            '/^handle.+$/'
          ]
        }
      }
    ]
  }
};
