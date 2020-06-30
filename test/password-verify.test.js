const expect = require('chai').expect,
      sinon = require('sinon'),
      {verifyPassword} = require('../password-verify.js')

var chai = require('chai'),
    sinonChai = require('sinon-chai')

chai.use(sinonChai)

describe('verifyPassword', () => {
  it('given a failing rule, returns errors', () => {
    const fakeRule = input => ({passed: false, reason: 'fake reason'})
    const errs = verifyPassword('abc', [fakeRule])
    expect(errs[0]).to.be.equal('error fake reason')
  })
})

describe('verifyPassword with sion', () => {
  it('given a failing rule, returns errors', () => {
    const fakeRule = sinon.fake.returns({ passed: false, reason: 'fake reason'})
    
    var errs = verifyPassword('abc', [fakeRule])
    errs = verifyPassword('def', [fakeRule])
    
    expect(errs[0]).to.be.equal('error fake reason')
    expect(fakeRule).to.have.been.calledTwice
  })
})