import env from './env'

const defaultConfig = require('../config.default')
let userConfig
try {
  userConfig = require('../config')
} catch (ex) { }

/**
 * Helper used for merging config objects
 */
function recursiveObjectTreeApply(objDefault, objOverride) {
  for (const prop in objOverride) {
    const val = objOverride[prop]
    if (typeof val === 'object' && val) {
      if (val instanceof Array) {
        // TODO: Array merging?
        objDefault[prop] = val
      } else {
        let valDefault = objDefault[prop]
        // Default to empty obj when undefined
        if (valDefault === undefined) {
          objDefault[prop] = valDefault = {}
        }
        recursiveObjectTreeApply(valDefault, val)
      }
    } else {
      objDefault[prop] = val
    }
  }
}

// Layer the config
let config = {}
recursiveObjectTreeApply(config, defaultConfig)
recursiveObjectTreeApply(config, userConfig)
if (env.isTest) {
  // Load test config overrides
  recursiveObjectTreeApply(config, require('../config.test'))
}

export default config
