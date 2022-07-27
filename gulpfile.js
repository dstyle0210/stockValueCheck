const {src,dest,task,watch} = require("gulp");
const ts = require("gulp-typescript");
task("default", function (done) {
    return watch("./_crawler/*.ts",{usePolling:true}).on("change",(tsPath,stats)=>{
        console.log(`${tsPath} :: 변환중`);
        return src(tsPath)
        .pipe(ts({
            "target": "esnext",
            "module": "commonjs",
            "lib": ["esnext", "dom"]
        })).on("error",(e)=>{console.log(e);})
        .pipe(dest("./")).on("end",()=>{
            console.log(`${tsPath} :: 변환됨`);
        })
    }).on("ready",()=>{
        done();
    });
});