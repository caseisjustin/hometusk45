import express from "express"


const app = express()

app.use(express.json())

// await fetch("https://erp.student.najottalim.uz/login", {

// })
const result = await fetch("https://erp.student.najottalim.uz/login",
{
    report: "error",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({name: "hello", password: "helloworld"})
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })

console.log(result)

app.get("erp.student.najottalim.uz/login", (req, res)=>{
    console.log(req)
})

app.listen(4000, "https://erp.student.najottalim.uz:3000",()=>{
    console.log("OK")
})