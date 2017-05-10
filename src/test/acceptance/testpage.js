describe('When visiting the testpage', () => {
  it('Shows Online', async () => {
    const page = visit('/test')
    const text = await page
      .evaluate(() => document.querySelector(
        `div#root > div:nth-child(1) >
        h1:nth-child(1) > span:nth-child(1)`
      ).textContent)
      .end()

    expect(text).to.equal('Online')
  })
})
