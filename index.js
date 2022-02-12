const axios= require("axios").default;
const express= require("express")
const cors=require("cors");
const {query} = require("express");
const app=express()


app.use(cors())
app.get("/word",(req,res)=>{

const  options = {
  method: 'GET',
  url: 'https://random-words5.p.rapidapi.com/getRandom',
  params:{wordLength:5},
  headers: {
    'x-rapidapi-host': 'random-words5.p.rapidapi.com',
    'x-rapidapi-key': 'bbb0ee7e1bmsh75563afab5de7e9p1f8575jsn16daaae5adaa'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
	res.json(response.data)
}).catch(function (error) {
	console.error(error);
});

})

app.get('/check',(req,res)=>{
const word=req.query.word
const options = {
  method: 'GET',
  url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/reference/',
  params: {entry:word},
  headers: {
    'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
    'x-rapidapi-key': 'bbb0ee7e1bmsh75563afab5de7e9p1f8575jsn16daaae5adaa'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
	res.json(response.data.result_msg)
}).catch(function (error) {
	console.error(error);
});})

app.listen(3000,()=> console.log("server is up on port 3000"))

