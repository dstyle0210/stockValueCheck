const fs = require("fs");
const codeList = fs.readFileSync("./codeList.txt"); // 가져올 종목코드
/*
* RIM 데이터 추출 : 구글 스프레드 시트
*/

const getRIM = async (page) => {
    await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit#gid=443321519");

    // 키보드 복사기능 사용
    await page.evaluate(async function(){
        var cItems = await navigator.clipboard.read();
        return null;
    });

    // RIM 데이터 복사 실행
    var count = 1;
    for await(let code of codeList){
        console.log(`${count++} / ${codeList.length}`);
        await getData(code);
    };
};


const getData = (code) => {

}

module.exports = getRIM;