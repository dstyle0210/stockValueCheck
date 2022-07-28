const fs = require("fs");
const {chromium,devices} = require("playwright");
var result = [];
var browser,page;

const rim = require("./getRIMTS"); // RIM 데이터 추출

// TODO : TS로 변환 시키기
// TODO : 크롤링 후 firebase 에 자동 업데이트 까지

(async () => {
    browser = await chromium.launch({
        headless:false
    });
    page = await browser.newPage();

    var codeList = fs.readFileSync("./_crawler/codeList.txt"); // 가져올 종목코드
    codeList = codeList.toString().split("\r\n");

    var rimResult = await rim(page,codeList);

    // 임시 : 파일링 저장 처리 => 나중에 firebase 로 업데이트 필요
    await fs.writeFileSync("./src/data/rimData.json",JSON.stringify(rimResult),"utf8");
    
    await browser.close();
})();