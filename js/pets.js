window.onload = function(){


      // function add shelter consrtuctor
      function shelterObj (){
        shelter = {};
        shelter.pets = new Map ();
        shelter.slider = {slideIndex: 1,
            plusSlide: function() {showSlides(this.slideIndex += 1)},
            minusSlide: function() {showSlides(this.slideIndex -= 1)},
        };
        shelter.paginationPage = 1;
        };

        function offScroll(){
          let body = document.querySelector("#body");
          body.style ='overflow-y:hidden;';
        };

        function onScroll(){
          let body = document.querySelector("#body");
          body.style ='';
        };


        function burger(){
          let burger = document.querySelector("#contain");
          let element = document.querySelector("#header");
          let menu = document.querySelector("#menu");
          let bg = document.querySelector("#backgraund");
                      
          burger.addEventListener('click', () => {
              element.classList.toggle('open');
              menu.classList.toggle('open');
              burger.classList.toggle('change');
              bg.classList.toggle('bg');
          });
          window.addEventListener("click", e =>{
              const target = e.target;
              if (!target.closest('#contain') && !target.closest('#menu')) {
                  element.classList.remove('open');
                  burger.classList.remove('change');
                  bg.classList.remove('bg');
                  menu.classList.remove('open');
                };
          });
      };

  function displayNoneCard(number){
    let card = document.getElementsByClassName("pets_cards_conteiner");
    for (let i =0; i <card[0].children.length; i++){
      card[0].children[i].style = "display: flex;"
    }
    for (let i =number; i <card[0].children.length; i++){
      card[0].children[i].style = "display: none;"
    };
  };
  
  function mediaQeuries(){
    let media1280 = window.matchMedia('(min-width: 1280px)');
    let media768 = media = window.matchMedia('(min-width: 768px)');

    if ((media1280.matches)) {
        displayNoneCard(8);
        paginationPage(8,6);
    };
    if (!(media1280.matches) && (media768.matches)) {
        displayNoneCard(6);
        paginationPage(6,8);
        burger();
    };
    if (!(media768.matches)) {
        displayNoneCard(3);
        paginationPage(3,16);
    };
};

// fetch("https://github.com/rolling-scopes-school/1991artem-JSFE2022Q1/blob/gh-pages/shelterJSFE2022Q1/json/pets.json")
//   .then(response => response.json())
//   .then(json => console.log(json));

async function readJson() {
// let response = await fetch("https://github.com/rolling-scopes-school/1991artem-JSFE2022Q1/blob/gh-pages/shelterJSFE2022Q1/json/pets.json",
     try{ 
       let response = await fetch('json/pets.json', 
      {
          method: "GET", // POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          body: undefined, // string, FormData, Blob, BufferSource или URLSearchParams
          referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer,
          // или URL с текущего источника
          referrerPolicy: "origin-when-cross-origin", // no-referrer, origin, same-origin...
          mode: "cors", // same-origin, no-cors
          credentials: "same-origin", // omit, include
          cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
          redirect: "follow", // manual, error
          integrity: "", // контрольная сумма
          keepalive: false, // true
          signal: undefined, // AbortController, чтобы прервать запрос
          window: window // null
        });
        if (response.ok){
          let petsList = await response.json();
          petsList.forEach((element,index) => {
              shelter.pets.set(index, new Map(Object.entries(element)));
          });

        } else{
          console.log("Ошибка HTTP: " + response.status);
        };
      } catch (e){
        console.log("Error response:   " + e)
      }
};


function popup(){
  let petsCard = document.querySelectorAll(".pets_card");
  let petsBtn = document.querySelectorAll(".btn");
  for (let i =0; i < petsBtn.length; i++){
    petsCard[i].addEventListener('click', () => {
        let id = petsBtn[i].id;
        let popup = document.querySelector(".popup");
        let popup_bg = document.querySelector(".popup__bg");
        let img_popup= document.querySelector(".img_popup");
        let content_popup= document.querySelector(".text_popup");
        img_popup.src = shelter.pets.get(+id).get("img");
        content_popup.children[0].innerHTML = shelter.pets.get(+id).get("name");
        content_popup.children[1].innerHTML = shelter.pets.get(+id).get("type");
        content_popup.children[2].innerHTML = shelter.pets.get(+id).get("description");
        content_popup.children[3].children[0].childNodes[1].innerHTML = shelter.pets.get(+id).get("age");
        content_popup.children[3].children[1].childNodes[1].innerHTML = shelter.pets.get(+id).get("inoculations");
        content_popup.children[3].children[2].childNodes[1].innerHTML = shelter.pets.get(+id).get("diseases");
        content_popup.children[3].children[3].childNodes[1].innerHTML = shelter.pets.get(+id).get("parasites");

        popup_bg.classList.add("active");
        popup.classList.add("active");
        offScroll();
});

  };
};

function closePopup (){
  let closeBtn = document.querySelector(".close");
  let popup = document.querySelector(".popup");
  let popup_bg = document.querySelector(".popup__bg");
  closeBtn.addEventListener("click", ()=>{
      popup_bg.classList.remove("active");
      popup.classList.remove("active");
      onScroll();
  });
  window.addEventListener("click", e =>{
    const target = e.target;
    if (!target.closest('.popup') && !target.closest('.pets_card')) {
        popup_bg.classList.remove("active");
        popup.classList.remove("active");
        onScroll();
      }
});
};

function paginationArray(card, page){
  let array = [];
  for (let i = 0; i < page; i++){
  let element =[];
    while (element.length<card){
        let numPets = Math.floor(Math.random() * 8);
            if(element.indexOf(numPets)==-1){
         element.push(numPets);
        };
  };
  array.push (element);
  }
return array;
};

function disabled (page) {
  let navigator = document.querySelector (".pets_navigator");
  if(shelter.paginationPage != page){
    navigator.children[3].classList.remove("disabled");
    navigator.children[4].classList.remove("disabled");
    navigator.children[3].disabled = false;
    navigator.children[4].disabled = false;
  } else{
    navigator.children[3].classList.add("disabled");
    navigator.children[4].classList.add("disabled");
    navigator.children[3].disabled = true;
    navigator.children[4].disabled = true;
  };
  if(shelter.paginationPage != 1){
    navigator.children[0].classList.remove("disabled");
    navigator.children[1].classList.remove("disabled");
    navigator.children[0].disabled = false;
    navigator.children[1].disabled = false;
  } else{
    navigator.children[0].classList.add("disabled");
    navigator.children[1].classList.add("disabled");
    navigator.children[0].disabled = true;
    navigator.children[1].disabled = true;
  };
}

function paginationPage(card, page){
  let navigator = document.querySelector (".pets_navigator");
  disabled(page);
  pets_cards_conteiner (card, page);
  navigator.children[3].addEventListener ('click', () =>{
    shelter.paginationPage += 1;
    navigator.children[2].innerHTML = shelter.paginationPage;
    disabled(page);
    pets_cards_conteiner (card, page);
  });
  navigator.children[1].addEventListener ('click', () =>{
    shelter.paginationPage -= 1;
    navigator.children[2].innerHTML = shelter.paginationPage;
    disabled(page);
    pets_cards_conteiner (card, page);
  });
  navigator.children[4].addEventListener ('click', () =>{
    shelter.paginationPage = page;
    navigator.children[2].innerHTML = shelter.paginationPage;
    disabled(page);
    pets_cards_conteiner (card, page);
  });
  navigator.children[0].addEventListener ('click', () =>{
    shelter.paginationPage = 1;
    navigator.children[2].innerHTML = shelter.paginationPage;
    disabled(page);
    pets_cards_conteiner (card, page);
  });
};

function pets_cards_conteiner (card, page){
  let cards_conteiner = document.querySelector(".pets_cards_conteiner");
  let array = paginationArray(card, page);
  for (let i = 0; i < card; i++){
    try{
      let num = array[shelter.paginationPage-1][i]
      cards_conteiner.children[i].children[0].src = shelter.pets.get(num).get("img");
      cards_conteiner.children[i].children[1].innerHTML = shelter.pets.get(num).get("name");
      cards_conteiner.children[i].children[2].id =num;
    } catch (e){
      console.log(e)
      cards_conteiner.children[i].children[0].src = "img/RSS.png";
      cards_conteiner.children[i].children[1].innerHTML = "RSSchool";
    }
    
  }
};

async function unload(){
  await shelterObj ();
  await readJson();
  mediaQeuries();
  burger();
  popup();
  closePopup();
}

unload();
}
