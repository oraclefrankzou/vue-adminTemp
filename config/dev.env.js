'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  dev:{
    proxyTable: {
      "/api":{
        target:"http://10.0.0.5:9005/",
        changeOrigin:true,
        pathRewrite:{
          '^/api': '/api'
        }
      }},
  }
})
