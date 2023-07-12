let words = JSON.parse(localStorage.getItem('memorizeWords')) || [];

let startIndex = 0;
let count = 2;

function displayWord(){

    let wordsList = document.querySelector('#words-List');

    const batch = words.slice(startIndex, startIndex + count);
    startIndex += count;

    batch.forEach((word)=> {
        const wordData =`<h1>${word.word}</h1>

        <p><strong>Definition:</strong>${word.definition}
  </P><br>

  <p><strong>examples:<br></strong>${word.examples.join('<br>') }</p><br>

  <p><strong>synonyms:<br></strong>${word.synonyms.join('<br>') }</p><br>

  <p><strong>antonyms:<br></strong>${word.antonyms.join('<br>') }</p><br>
        `
          


           wordsList.innerHTML += wordData;
    });
 

    
}

displayWord();

window.addEventListener('scroll',()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        console.log("gmggh")
        displayWord();


    }
});