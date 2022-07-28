module.exports = async (page, codeList) => {
    let result = []; // 최종리턴
    const keyboard = page.keyboard; // 키보드 코드단축
    let recursionCount = 0; // 오류시 재귀 돌릴때 카운트 (10번 이상이면 아웃처리)
    // 실제 동작 시작(스프레드 시트 접속)
    await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit#gid=443321519");
    console.log("1");
    // 키보드 복사기능 사용
    await page.evaluate(async () => {
        await navigator.clipboard.read();
        return null;
    });
    console.log("2");
    /**
     * (snippet) 시간지연 함수
     * @param {number} ms : 지연시간 밀리초
     * @return null
     */
    function delay(ms) {
        return new Promise((res) => { setTimeout(res, ms); });
    }
    /**
     * 스프레드시트에서 데이터 가져오기
     * @async
     * @param {string} stockCode : 적용할 종목코드(숫자 6자리 string)
     * @return {Promise<StockData | null>}
     */
    async function getData(stockCode) {
        const getResult = async (stockCode) => {
            await keyboard.type(`'${stockCode}`);
            await keyboard.press('Enter');
            await delay(5000);
            await keyboard.down('Shift');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.press('ArrowRight');
            await keyboard.up('Shift');
            await keyboard.press('Control+C');
            await delay(500);
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
            await keyboard.press('ArrowUp');
            await keyboard.type(`'0000000`);
            await keyboard.press('Enter');
            await delay(3000);
            await keyboard.press('ArrowUp');
            // 다시 종목적용 (재귀)
            recursionCount++; // 재귀카운트 올림
            if (recursionCount < 10) {
                return await getData(stockCode);
            }
        }
        ;
        recursionCount = 0; // 재귀 안돌면 초기화;
        await keyboard.press('ArrowUp');
        await delay(1000);
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
    // RIM 데이터 복사 실행
    for (let code of codeList) {
        let data = await getData(code);
        if (data)
            result.push(data);
        console.log(data);
    }
    ;
    return result;
};
