/*! Nodejs */
const fs = require("fs");

/*! Firebase Setting */
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set} from "firebase/database";

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

    // 임시 : 파일링 저장 처리 => 나중에 firebase 로 업데이트 필요
    // await fs.writeFileSync("./src/data/rimData.json",JSON.stringify(rimResult),"utf8");

    for(let stockData of rimResult){
        await set(ref(db,"stocks/"+stockData.code),stockData);
        console.log(stockData.code+" 등록완료");
    };
    
    await browser.close();
})();