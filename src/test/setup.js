import 'zone.js'
import { JSDOM } from 'jsdom'
import chai from 'chai'
import { mount, shallow, render } from 'enzyme'
import sinon from 'sinon'
import nightmare from 'nightmare'
import visit from 'test/utils/visit'
import sourcemap from 'source-map-support'

sourcemap.install()

// jsdom
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
)
global.window = dom.window
global.document = window.document

global.navigator = {
  userAgent: 'node.js'
}

// chai
global.assert = chai.assert
global.expect = chai.expect

// enzyme
global.mount = mount
global.shallow = shallow
global.render = render

// sinon
global.sinon = sinon

// nightmare
global.nightmare = nightmare
global.visit = visit
