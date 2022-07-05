const fs = require("fs");
const {chromium,devices} = require("playwright");
var result = [];
var browser,page;

const rim = require("./getRIM"); // RIM 데이터 추출


(async () => {
    browser = await chromium.launch({
        headless:false
    });
    page = await browser.newPage();

    var codeList = fs.readFileSync("./_crawler/codeList.txt"); // 가져올 종목코드
    codeList = codeList.toString().split("\r\n");

    await rim(page,codeList);

    await browser.close();
})();