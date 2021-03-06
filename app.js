const tileDisplay =document.querySelector('.tile-container')
const keyboard=document.querySelector('.key-container')
const messageDisplay=document.querySelector('.message-container')


const key=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G',
				'H','J','K','L','Z','X','C','V','B','N','M','ENTER','CLEAR'];

let wordle='SUPER'
const getWordle=()=>{
fetch("http://localhost:3000/word").then(res => res.json())
	.then(json=> {
		console.log(json)
		wordle=json.toUpperCase()
	})
}

getWordle()


const guessRows=[
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','','']
]

let currentRow=0;
let currentTile=0;
let isGameOver=false

//handling key press
const handleClick=(letter)=>{
	if(letter === 'CLEAR')
	deleteLetter()
	else if(letter === 'ENTER'){
	checkWord(guessRows[currentRow].join(""))
	}
	else
	addLetter(letter)
}


//Checking word funtion

const checkWord=(word)=>{
fetch(`http://localhost:3000/check/?word=${word}`).then((res)=>res.json()).then(json=>{
  console.log(json)
  if(json == 'Entry word not found'){
 showMessage("Word not found in list")
  }
  else{
if(currentTile === 5 ){
	    if(word == wordle){
		filpTile()
		showMessage('Magnificent !')
	    isGameOver=true
	    return 
		}
	else{
	filpTile()
	//checking if it last row
	if(currentRow >= 5){
	isGameOver=false
	showMessage('Game Over')
	return 
	}
		//moving to next row
		if(currentRow <5)
		{
			currentRow++;
			currentTile=0
		}
	}
}
}
})
}



// message function 
const showMessage=(message)=>{
const messageElement=document.createElement('p')
messageElement.textContent=message
messageDisplay.append(messageElement)
if(message !== 'Magnificent !'){
setTimeout(()=>{
messageDisplay.removeChild(messageElement)
},2000)
}
}


//adding color to tile

const filpTile=()=>{
const rowTiles=document.querySelector('#guessRow-'+currentRow).childNodes
	rowTiles.forEach((tile,index)=>{
	const dataLetter = tile.getAttribute('data')
	const key=document.querySelector('#'+dataLetter)
		if(dataLetter == wordle[index]){
		tile.classList.add('green-overlay')
        key.classList.add('green-overlay-keyboard')
		}
		else if(wordle.includes(dataLetter))
		{
			tile.classList.add('yellow-overlay')
			key.classList.add('yellow-overlay-keyboard')
		}
		else{
		tile.classList.add('wrong-overlay')
        key.classList.add('wrong-overlay-keyboard')
		}
	})

}


// adding letter to tile function 

const addLetter=(letter)=>{
if(currentTile < 5 && currentRow < 6)	{
const tile=document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
tile.textContent=letter
guessRows[currentRow][currentTile]=letter
tile.setAttribute('data',letter)
currentTile++
}
}


//Deleting letter from tile

const deleteLetter=()=>{
if(currentTile > 0 && !isGameOver){
currentTile--;
guessRows[currentRow][currentTile]=''
const tile=document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
tile.textContent=''
}
}

//Displaying Keyboard
key.forEach(key => {
const buttonElement=document.createElement('button')
buttonElement.textContent=key
buttonElement.setAttribute('id',key)
buttonElement.addEventListener('click',()=>handleClick(key))
keyboard.append(buttonElement)
}
)

//Displaying tile
guessRows.forEach((guessRow,guessRowIndex)=>{
const rowElement=document.createElement('div')
	rowElement.setAttribute('id','guessRow-'+guessRowIndex)
	guessRow.forEach((guess,guessIndex)=>{
	  const tileElement=document.createElement('div')
		tileElement.setAttribute('id','guessRow-'+guessRowIndex+'-tile-'+guessIndex)
		tileElement.classList.add('tile')
		rowElement.append(tileElement)
	})

	tileDisplay.append(rowElement)
})

