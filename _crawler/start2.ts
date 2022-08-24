/*! Nodejs */
const fs = require("fs");

/*! Firebase Setting */
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA-ecCqUPf-iFsUIHOIzwtgKxmhoos5cYk",
    authDomain: "stock-value-check.firebaseapp.com",
    databaseURL: "https://stock-value-check-default-rtdb.firebaseio.com",
    projectId: "stock-value-check",
    storageBucket: "stock-value-check.appspot.com",
    messagingSenderId: "167702380321",
    appId: "1:167702380321:web:a259625b44afe0a2e18860"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/*! Playwright */
const {chromium,devices} = require("playwright");
const rim = require("./getRIMTS"); // RIM 데이터 추출
const mdd = require("./getMDDTS"); // MDD 데이터 추출
var browser:any,page:any;
var result = [];


(async () => {
    browser = await chromium.launch({
        headless:false
    });
    page = await browser.newPage();

    var codeList = fs.readFileSync("./_crawler/codeList.txt"); // 가져올 종목코드
    codeList = codeList.toString().split("\r\n");

    var rimResult = await rim(page,codeList);
    var mddResult = await mdd(page,codeList);

    const resultData:{code:string}[] = [];
    codeList.forEach((code)=>{
        const rData = rimResult.find( data => data.code == code );
        const mData = mddResult.find( data => data.code == code );
        resultData.push(Object.assign({},rData,mData));
    });

    console.log(resultData);

    for(let stockData of resultData){
        await set(ref(db,"stocks/"+stockData.code),stockData);
        console.log(stockData.code+" RIM 등록완료");
    };
    
    await browser.close();
    process.exit();
})();