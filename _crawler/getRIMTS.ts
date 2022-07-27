const fs = require("fs");
type StockData = {
    code:string,
    cap:string, // 적정 시가총액
    rim:string, // RIM
    equity:string, // 자본
    stocks:string, // 주식수
    profit:string, // 순이익
    dividend:string, // 배당금
    psr:string // 총영업이익률
}
module.exports = async (page:any) => {
    let result : StockData[] = [];

    async function getData(stockCode:string) : Promise<StockData> {
        const getResult = async (stockCode:string):Promise<string> => {
            await page.keyboard.type(`'${stockCode}`);
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,5000)});
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
            await new Promise((res)=>{setTimeout(res,500)});

            let res:string = await page.evaluate(async () => {
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
        }

        let resultText = await getResult(stockCode);
        if((/(undefined)|(loading)|(DIV)/gi).test(resultText)){
            // 종목코드 초기화
            await page.keyboard.press('ArrowUp');
            await page.keyboard.type(`'0000000`);
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,3000)});
            await page.keyboard.press('ArrowUp');

            // 다시 종목적용
            await getData(stockCode);
            return;
        };

        await page.keyboard.press('ArrowUp');
        await new Promise((res)=>{ setTimeout(res,1000); });

        let stockData : StockData = {
            code:stockCode,
            cap:resultText.split("\t")[0], // 적정 시가총액
            rim:resultText.split("\t")[1], // RIM
            equity:resultText.split("\t")[2], // 자본
            stocks:resultText.split("\t")[3], // 주식수
            profit:resultText.split("\t")[4], // 순이익
            dividend:resultText.split("\t")[5], // 배당금
            psr:resultText.split("\t")[6], // 총영업이익률
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
    result.push(await getData("035420"));

    console.log(result);
}