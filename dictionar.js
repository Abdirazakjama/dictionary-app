document.querySelector("#search-btn").addEventListener('click', async() =>{
  let word = document.querySelector('#search-input');
  let option = document.querySelector('#search-option').value;
  let result = document.querySelector("#results")

  let response = await fetch("/dictionar.json");

  let words = await response.json();

  const wordData = words.find(w => w.word === word.value)


if(!wordData){
  result.innerHTML = `<p>word not found`;
  word.value = ""
  return
}

let html = `<h1>word:${wordData.word}</h1><br>`

if(option == "definition" || option == "All"){
  html += `<p><strong>Definition:</strong>${wordData.definition}
  </P><br>`
}
if(option == "examples" || option == "All"){
  html += `<p><strong>examples:<br></strong>${wordData.examples.join('<br>') }</p><br>`
}
if(option == "synonyms" || option == "All"){
  html += `<p><strong>synonyms:<br></strong>${wordData.synonyms.join('<br>') }</p><br>`
}
if(option == "antonyms" || option == "All"){
  html += `<p><strong>antonyms:<br></strong>${wordData.antonyms.join('<br>') }</p><br>`
}

html  += `<input type="checkbox" id="memorize-${wordData.word}">momorize this word`

result.innerHTML = html

let memorizewords = JSON.parse(localStorage.getItem('memorizeWords')) || [];
const memorizeIndex = memorizewords.map(e => e.word).indexOf(wordData.word)
document.querySelector(`#memorize-${wordData.word}`).checked
= memorizeIndex > -1 


document.querySelector(`#memorize-${wordData.word}`).addEventListener('change',(e)=>{

  

  let memorizewords = JSON.parse(localStorage.getItem('memorizeWords')) || [];

  if(e.target.checked){
    const index = memorizewords.map(e => e.word).indexOf(wordData.word)
    if(index === -1){
       memorizewords.push(wordData)
    }
   
  }else{
    //ckeck from the list
    //remove from the list

    const index = memorizewords.map(e => e.word).indexOf(wordData.word)
    

    if(index > -1){
      memorizewords.splice(index ,1)
    }

    

  }

  localStorage.setItem('memorizeWords',JSON.stringify(memorizewords))
});



})