const fs = require("fs");
module.exports = async (page) => {
    let result = [];
    async function getData(stockCode) {
        const getResult = async (stockCode) => {
            await page.keyboard.type(`'${stockCode}`);
            await page.keyboard.press('Enter');
            await new Promise((res) => { setTimeout(res, 5000); });
            await page.keyboard.down('Shift');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.up('Shift');
            await page.keyboard.press('Control+C');
            await new Promise((res) => { setTimeout(res, 500); });
            let res = await page.evaluate(async () => {
                var cItems = await navigator.clipboard.read(); // 복사해 놓은 정보 가져옴
                for (const cItem of cItems) {
                    for (const type of cItem.types) {
                        const blob = await cItem.getType(type);
                        // text
                        if (type === "text/plain") {
                            const text = await blob.text();
                            return text;
                        }
                    }
                }
            });
            return res;
        };
        let resultText = await getResult(stockCode);
        if ((/(undefined)|(loading)|(DIV)/gi).test(resultText)) {
            // 종목코드 초기화
            await page.keyboard.press('ArrowUp');
            await page.keyboard.type(`'0000000`);
            await page.keyboard.press('Enter');
            await new Promise((res) => { setTimeout(res, 3000); });
            await page.keyboard.press('ArrowUp');
            // 다시 종목적용
            await getData(stockCode);
            return null;
        }
        ;
        await page.keyboard.press('ArrowUp');
        await new Promise((res) => { setTimeout(res, 1000); });
        let stockData = {
            code: stockCode,
            cap: resultText.split("\t")[0],
            rim: resultText.split("\t")[1],
            equity: resultText.split("\t")[2],
            stocks: resultText.split("\t")[3],
            profit: resultText.split("\t")[4],
            dividend: resultText.split("\t")[5],
            psr: resultText.split("\t")[6], // 총영업이익률
        };
        return stockData;
    }
    // 실제 동작 시작
    await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit#gid=443321519");
    // 키보드 복사기능 사용
    await page.evaluate(async () => {
        await navigator.clipboard.read();
        return null;
    });
    // RIM 데이터 복사 실행
    let data = await getData("035420");
    if (data)
        result.push(data);
    console.log(result);
};
