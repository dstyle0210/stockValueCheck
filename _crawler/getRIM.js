const fs = require("fs");
/*
* RIM 데이터 추출 : 구글 스프레드 시트
*/
const getRIM = async (page) => {
    console.log("getRIM");
};

const getRIM2 = async (page) => {

    await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit#gid=443321519");

    // 키보드 복사기능 사용
    await page.evaluate(async function(){
        var cItems = await navigator.clipboard.read();
        return null;
    });

    // RIM 데이터 복사 실행
    var result = await getData(page , "035420");
    console.log(result);

    /*
    var count = 1;
    for await(let code of codeList){
        console.log(`${count++} / ${codeList.length}`);
        await getData(code);
    };
    */
};


const getData = (page , stockCode) => {

    const handMove = async () => {
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

        return await page.evaluate(async function(){
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
    }



    return new Promise(async function(resolve,reject){
        var resultText = await handMove();

        vaildResultText(resultText);

        if((/(undefined)|(loading)|(DIV)/gi).test(resultText)){
            console.log("재시작");
            await page.keyboard.press('ArrowUp');
            resultText = await handMove();
        };
        resolve(resultText);
        /*

        if((/(undefined)|(loading)|(DIV)/gi).test(resultText)){
            console.log("재시작");
            await page.keyboard.press('ArrowUp');
            await page.keyboard.type(`'${stockCode}`);
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,1000)});

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

            await new Promise((res)=>{setTimeout(res,1000)});

            resultText = await page.evaluate(async function(){
                var cItems = await navigator.clipboard.read();
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
            console.log(resultText);
        };

        var data = {
            code:stockCode,
            cap:resultText.split("\t")[0], // 적정 시가총액
            rim:resultText.split("\t")[1], // RIM
            equity:resultText.split("\t")[2], // 자본
            stocks:resultText.split("\t")[3], // 주식수
            profit:resultText.split("\t")[4], // 순이익
            dividend:resultText.split("\t")[5], // 배당금
            psr:resultText.split("\t")[6], // 총영업이익률
        };
        // console.log(data);
        result.push(data);
        await page.keyboard.press('ArrowUp');
        await new Promise((res)=>{ setTimeout(res,1000); });
        resolve();
        */
    })
}

module.exports = getRIM;