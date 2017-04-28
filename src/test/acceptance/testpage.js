describe('When visiting the testpage', () => {
  it('Shows a Test header', async () => {
    let page = visit('/test')
    let text = await page.evaluate(
      () => document.getElementsByTagName('h1')[0].textContent
    )
    .end()

    expect(text).to.equal('Test')
  })
})
