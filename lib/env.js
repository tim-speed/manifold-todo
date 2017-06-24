/* globals __TEST__ */
const isTest = typeof __TEST__ !== 'undefined' && __TEST__
const isBrowser = !isTest && typeof window !== 'undefined'

export default {
  isTest,
  isBrowser
}
