const fs = require("fs");
const {chromium,devices} = require("playwright");
var result = [];
var browser,page;

const rim = require("./getRIM"); // RIM 데이터 추출

(async ()=>{
    browser = await chromium.launch({
        headless:false
    });
    page = await browser.newPage();

    await rim.getRIM(page);

    await browser.close();
})();
export {rim};