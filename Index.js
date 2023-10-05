const fs = require("fs");
const http = require("http")
const request= require("request")
//To read the html file
const readFrondEnd=fs.readFileSync("home.html","utf-8")
//show two digit decimal

const showTwodec=(val)=>{
    val.toFixed(2);
}
//create new server
const server =http.createServer((req,res)=>{
    if (req.url=="/") {
    request( "https://api.openweathermap.org/data/2.5/weather?lat=11.1017815&lon=77.345192&appid=da5dcd2c4ec044e5ad31fa089be445be").
    on("data",(chunkdata)=>{
        var obj = JSON.parse(chunkdata);
        var objArr = [obj]
        var result= readFrondEnd.replace("{%temp%}",((objArr[0].main.temp)-273.15).toFixed(2))
        result = result.replace("{%tempmin%}", ((objArr[0].main.temp_min)-273.15).toFixed(2))
        result = result.replace("{%tempmax%}", ((objArr[0].main.temp_max)-273.15).toFixed(2))
        result = result.replace("{%city%}", objArr[0].name)
        result = result.replace("{%country%}", objArr[0].sys.country)
        result= result;
        res.write(result)
        }
    )
    .on("end",()=>{
        console.log("App Running Successfully Oh yess")
        res.end();
    })
}
})
server.listen("9999","127.0.0.1",()=>{
    console.log("Server is Ready to go...")
})