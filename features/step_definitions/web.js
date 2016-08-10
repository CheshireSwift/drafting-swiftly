module.exports = function() {
  this.When(/^I visit "([^"]*)"$/, function (url, callback) {
    this.visit('http://localhost:3000' + url, callback)
  })

  this.Then(/^I should see the heading "([^"]*)"$/, function (heading, callback) {
    this.browser.assert.success()
    this.browser.assert.text('h1', heading)
    callback()
  })
}
