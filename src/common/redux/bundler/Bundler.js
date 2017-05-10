import { autobind } from 'core-decorators'
import Bundle from './Bundle'

@autobind
export default class Bundler {
  bundles: Bundle[] = []
  reducers = {}

  addBundle (bundle) {
    // add to bundles
    this.bundles.push(bundle)
  }

  addReducer (key, reducer) {
    if (key in this.reducers) {
      throw new Error(`A reducer with key ${key} does already exist`)
    }
    if (typeof reducer !== 'function') {
      throw new Error('Reducer must be a (pure) function')
    }
    this.reducers[key] = reducer
  }

  add (...bundles) {
    bundles.forEach(bundle => {
      this.addBundle(bundle)
    })
  }

  getBundledReducers () {
    const reducers = this.bundles.reduce(
      (bundledReducers, bundle) => {
        bundledReducers[bundle.getName()] = bundle.callReducer
        return bundledReducers
      },
      {
        ...this.reducers
      }
    )
    return reducers
  }

  getBundledComponents () {
    return this.bundles.reduce((bundledComponents, bundle) => {
      bundledComponents[bundle.getName()] = bundle.getComponents()
      return bundledComponents
    }, {})
  }
}
