const fs = require("fs");
const {chromium,devices} = require("playwright");
var result = [];
var browser,page;
(async () => {

    var codeList = fs.readFileSync("./codeList.txt");
    codeList = codeList.toString().split("\r\n");
    
    browser = await chromium.launch({
        headless:false
    });
    page = await browser.newPage();

    // await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit?usp=sharing");
    await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit#gid=1417125328");

    await page.evaluate(async function(){
        var cItems = await navigator.clipboard.read();
        return null;
    });

    var count = 1;
    for await(let code of codeList){
        console.log(`${count++} / ${codeList.length}`);
        await getData(code);
    };

    await fs.writeFileSync("stockData.js","var data="+JSON.stringify(result),"utf8");
    
    await browser.close();
    
})();



function getData(stockCode){
    return new Promise(async function(resolve,reject){
        await page.keyboard.type(`'${stockCode}`);
        await page.keyboard.press('Enter');

        await new Promise((res)=>{setTimeout(res,6000)});

        await page.keyboard.down('Shift');
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

        var resultText = await page.evaluate(async function(){
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

        if((/(undefined)|(loading)|(DIV)/gi).test(resultText)){
            await page.keyboard.press('ArrowUp');
            await page.keyboard.type(`'0000000`);
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,3000)});

            await page.keyboard.press('ArrowUp');
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
        }


        var stock = {
            min:resultText.split("\t")[5],
            max:resultText.split("\t")[6]
        };

        if(stock.min < -0.31 || stock.max > 0.31){
            var data = {
                code:stockCode,
                percent:"편차오류",
                high:"편차오류"
            };
        }else{
            var data = {
                code:stockCode,
                mdd:resultText.split("\t")[0],
                highprice:resultText.split("\t")[1],
                percent:resultText.split("\t")[2],
                highpercent:resultText.split("\t")[3],
                rsi:resultText.split("\t")[4],
            };
        };
        // console.log(data);
        result.push(data);
        await page.keyboard.press('ArrowUp');
        await new Promise((res)=>{ setTimeout(res,1000); });
        resolve();
    })
}