let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let apikey = "4b70ff4c-5435-48ec-839f-eaf4ee7406dd";
let notFound = document.querySelector(".not_found");
let def=document.querySelector(".def");
let audiobox=document.querySelector('.audio')
let loading=document.querySelector('.loading')


searchBtn.addEventListener("click", function (e) {

    e.preventDefault();
//clear data

audiobox.innerHTML=''
notFound.innerText=''
def.innerText=''

    //get input Data
    let word = input.value;

    //call api data
    if (word === "") {
        alert("word is required");
        return;
    }

    getData(word);
    //
});


async function getData(word) {
   loading.style.display='block';
    //ajax call

    const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`
    );

    const data = await response.json();

    if (!data.length) {
   loading.style.display='none';

        notFound.innerText = "No Result Found";
        return;
    }

    //if result is suggestion

    if (typeof data[0] === "string") {
   loading.style.display='none';
        
        let heading = document.createElement("h3");
        heading.innerText = "Did you mean?";
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add("suggested");
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });
        return;
    }
    //result found
    loading.style.display='none';

    let defination = data[0].shortdef[0];
def.innerText=defination

//sounds
let soundName=data[0].hwi.prs[0].sound.audio;

if(soundName){
    renderSound(soundName)
}

    console.log(data);
}

function renderSound(soundName){
        // https://media.merriam-webster.com/soundc11
    // https://media.merriam-webster.com/soundc11
    let subfolder=soundName.charAt(0)  
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;
    let aud=document.createElement('audio')
    aud.src=soundSrc
    aud.controls=true
    audiobox.appendChild(aud)

}
