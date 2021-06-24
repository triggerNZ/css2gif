const puppeteer = require('puppeteer')
const GifEncoder = require('gif-encoder-2');
const { createCanvas, loadImage } = require('canvas')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const globalBrowser = puppeteer.launch({ headless: true })

async function getAnimations(browser, html, css, height, width, selector, n, delay, playbackRate) {
    console.debug('got browser')
    const pages = await browser.pages()
    console.debug('got pages')
    const page = pages[0]
    await page._client.send('Animation.setPlaybackRate', { playbackRate: playbackRate });
    page.setViewport({ height, width })
  
    // Set page + image
    const htmlString = `<html><head><style type="text/css">${css}</style></head><body>${html}</body></html>`
    await page.setContent(htmlString)
    console.debug('set content, waiting for selector')
    await page.waitForSelector(selector)
    console.debug('got selector')
  
    let buffs = []
    for (let i = 0; i < n; i++) {
        const buff = await page.screenshot({ omitBackground: true })
        buffs.push(buff);
        await sleep(delay)
    }
    return buffs;
}

async function shutdown() {
    await (await globalBrowser).close()
}

async function makeGif(bufs, w, h, delay) {
    const encoder = new GifEncoder(w, h)
    encoder.start();
    encoder.setDelay(delay)
    for (let buf of bufs) {
        const canvas = createCanvas(w, h)
        const ctx = canvas.getContext('2d')
        const image = await loadImage(buf)
        ctx.drawImage(image, 0, 0)
        encoder.addFrame(ctx);
    }
    encoder.finish()
    const buffer = encoder.out.getData()
    return buffer

}

module.exports = {
    getAnimations,
    shutdown,
    globalBrowser,
    makeGif
}