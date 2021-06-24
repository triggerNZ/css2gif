const {getAnimations, shutdown, globalBrowser, makeGif} = require('./index')
const fs = require('fs')

async function coffee() {
    const html = `
    <div id="container">
    <div class="steam" id="steam1"> </div>
    <div class="steam" id="steam2"> </div>
    <div class="steam" id="steam3"> </div>
    <div class="steam" id="steam4"> </div>

    <div id="cup">
        <div id="cup-body">
        <div id="cup-shade"></div>
        </div>
        <div id="cup-handle"></div>
    </div>

    <div id="saucer"></div>

    <div id="shadow"></div>
    </div>
    `

    const css = `
    body {
        background: #8acdeb;
    }
    #container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .steam {
        position: absolute;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        background-color: #fff;
        margin-top: -75px;
        margin-left: 75px;
        z-index: 0;
        opacity: 0;
    }
    
    #steam1 {
        -webkit-animation: steam1 4s ease-out infinite;
        animation: steam1 4s ease-out infinite;
    }
    
    #steam3 {
        -webkit-animation: steam1 4s ease-out 1s infinite;
        animation: steam1 4s ease-out 1s infinite;
    }
    
    @-webkit-keyframes steam1 {
        0% {transform: translateY(0) translateX(0) scale(0.25); opacity: 0.2;}
        100% {transform: translateY(-200px) translateX(-20px) scale(1); opacity: 0;}
    }
    
    @keyframes steam1 {
        0% {transform: translateY(0) translateX(0) scale(0.25); opacity: 0.2;}
        100% {transform: translateY(-200px) translateX(-20px) scale(1); opacity: 0;}
    }
    
    #steam2 {
        -webkit-animation: steam2 4s ease-out 0.5s infinite;
        animation: steam2 4s ease-out 0.5s infinite;
    }
    
    #steam4 {
        -webkit-animation: steam2 4s ease-out 1.5s infinite;
        animation: steam2 4s ease-out 1.5s infinite;
    }
    
    @-webkit-keyframes steam2 {
        0% {transform: translateY(0) translateX(0) scale(0.25); opacity: 0.2;}
        100% {transform: translateY(-200px) translateX(20px) scale(1); opacity: 0;}
    }
    
    @keyframes steam2 {
        0% {transform: translateY(0) translateX(0) scale(0.25); opacity: 0.2;}
        100% {transform: translateY(-200px) translateX(20px) scale(1); opacity: 0;}
    }
    
    #cup {
        z-index: 1;
    }
    
    #cup-body {
        position: absolute;
        height: 200px;
        width: 300px;
        border-radius: 0 0 150px 150px;
        background-color: #fff;
        margin: auto;
        display: inline-block;
        overflow: hidden;
        z-index: 1;
    }
    
    #cup-shade {
        position: relative;
        height: 300px;
        width: 200px;
        background-color: #F3F3F3;
        display: inline-block;
        margin-left: 42%;
        margin-top: -3px;
        transform: rotate(50deg);
        z-index: 1;
    }
    
    #cup-handle {
        position: relative;
        height: 75px;
        width: 80px;
        border-radius: 0 150px 150px 0;
        border: 15px solid #F3F3F3;
        margin-bottom: 95px;
        margin-left: 250px;
        display: inline-block;
        z-index: 0;
    }
    
    #saucer {
        position: absolute;
        height: 30px;
        width: 300px;  
        border-radius: 0 0 100px 100px;
        background-color: #F9F9F9;
        margin-top: -32px;
        margin-left: 5px;
        z-index: 2;
    }
    
    #shadow {
        height: 10px;
        width: 300px;
        border-radius: 50%;
        margin-top: -5px;
        margin-left: 6px;
        background-color: #7bb8d4;
    }
    `

    const bufs = await getAnimations(await globalBrowser, html, css, 400, 600, '#container', 60, 1, 2);
    const gif = await makeGif(bufs, 600, 400, 2);
    console.debug(gif)
    const outputFileName = `./output.gif`
    fs.writeFileSync(outputFileName, gif);
    console.log('done')
    await shutdown()
}


coffee()