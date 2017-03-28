var path = require('path')
var webpack = require('webpack');
// Postcss
var postcssNext = require('postcss-cssnext')
var postcssAssets = require('postcss-assets')
var stylelint = require('stylelint')
var doiuse = require('doiuse')
var reporter = require('postcss-reporter')
var use = require('postcss-use')

module.exports=function(config) {
  config.set({
    colors: true,
    singleRun: true,
    autoWatch: false,
    browsers: ['PhantomJS'],

    files: [
      'src/specs.ts'
    ],

    frameworks: [ 'mocha', 'chai-sinon' ],

    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],

    preprocessors: {
      'src/specs.ts': ['webpack']
    },

    plugins: [
      'karma-mocha',
      'karma-chai-sinon',
      'karma-webpack',
      'karma-coverage',
      'karma-remap-istanbul',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
    ],

    remapIstanbulReporter: {
      src: 'tmp/coverage/coverage-final.json',
      reports: {
        html: 'tmp/coverage/html',
      },
      timeoutNotCreated: 2000,
      timeoutNoMoreFiles: 2000,
    },

    coverageReporter: {
      reporters: [
        { type: 'json' },
      ],
      dir: 'tmp',
      subdir: 'coverage'
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
      },
      devtool: 'inline-source-map',
      noInfo: true,
      verbose: false,
      debug: false,
      plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('test')})
      ],
      module: {
        preLoaders: [
          {test: /\.tsx?$/, loader: 'tslint'}
        ],
        loaders: [
          {test: /\.tsx?$/, exclude: /node_modules/, loader: 'awesome-typescript', query: { babelOptions: { sourceMaps: 'inline' } }},
          {test: /\.json$/, loader: 'json'},
          {test: /\.css$/, include: /src/, loaders: ['style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]', 'postcss']},
          {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url?name=[name].[ext]'},
          {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=[name].[ext]"},
          {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'},
          {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'},
          {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
          {test: /\.ico$/, loader: 'file?name=[name].[ext]'}
        ],
        postLoaders: [
          {test: /^(.(?!\.spec))*\.tsx?$/, exclude: /specs.ts/, loader: 'istanbul-instrumenter'}
        ]
      },
      tslint: {
        emitErrors: true,
        failOnHint: true
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      postcss: () => [
        stylelint(),
        postcssNext(),
        postcssAssets({
          relative: true
        }),
        use({
          modules: [
            'postcss-property-lookup',
            'postcss-will-change',
            'postcss-short',
            'postcss-inline-svg',
            'postcss-center',
            'postcss-clearfix',
            'postcss-triangle'
          ]
        }),
        doiuse({
          browsers: ['ie >= 9', '> 5%'],
          ignore: ['css-transitions', 'css3-cursors']
        }),
        reporter({
          clearAllMessages: true,
          clearReportedMessages: true,
          throwError: true
        })
      ]
    },

    webpackMiddleware: {
      noInfo:true
    }
  });
};
