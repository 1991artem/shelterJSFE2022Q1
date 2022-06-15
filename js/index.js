window.onload = function (){

    // function add shelter consrtuctor
    function shelterObj (){
    shelter = {};
    shelter.pets = new Map ();
    shelter.slider = {slideIndex: 1,
        plusSlide: function() {showSlides(this.slideIndex += 1)},
        minusSlide: function() {showSlides(this.slideIndex -= 1)},
    };
    };


    // general slide fanction
    async function showSlides(n) {
        let slides = await document.querySelectorAll(".pets_card");
        if (n > shelter.pets.size-1) {
            shelter.slider.slideIndex = 0;
        }
        if (n < 0) {
            shelter.slider.slideIndex = shelter.pets.size-1;
        }
        let count = 0;
        let i = shelter.slider.slideIndex-1;

        while(count < 3){
            if (i > shelter.pets.size-1) {
                i = 0;
            }
            if (i < 0) {
                i = shelter.pets.size-1;
            }
            try {
                slides[count].children[0].src = shelter.pets.get(i).get("img");
                slides[count].children[1].innerHTML = shelter.pets.get(i).get("name");
                slides[count].children[2].id =i;
                count++;
                i++;  
            } catch (e) {
            console.log(e)
            slides[count].children[0].src = "img/RSS.png";
            slides[count].children[1].innerHTML = "RSSchool";
            count++;
            i++; 
            } 
            }
        }

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
            let element = document.querySelector("#header_content");
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
        let card = document.querySelectorAll(".pets_card");
        for (let i =0; i <card.length; i++){
            card[i].style = "display: flex;"
        }
        for (let i =number; i <card.length; i++){
            card[i].style = "display: none;"
        }
    }
      
      
    function mediaQeuries(){
        let media1280 = window.matchMedia('(min-width: 1280px)');
        let media768 = media = window.matchMedia('(min-width: 768px)');
    
        if ((media1280.matches)) {
            displayNoneCard(3);
        }
        if (!(media1280.matches) && (media768.matches)) {
            displayNoneCard(2);
        }
        if (!(media768.matches)) {
            displayNoneCard(1);
        }
    };

    async function readJson() {
        // let response = await fetch("https://github.com/rolling-scopes-school/1991artem-JSFE2022Q1/blob/main/shelterJSFE2022Q1/json/pets.json");
        try{ 
            let response = await fetch('json/pets.json', 
            {
                method: "GET", // POST, PUT, DELETE, etc.
                headers: {
                // значение этого заголовка обычно ставится автоматически,
                // в зависимости от тела запроса
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
                integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
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
              }
            } catch (e){
                console.log("Error response:   " + e)
              }
      };

      function popup(){
          let petsCard = document.querySelectorAll(".pets_card");
          let petsBtn = document.querySelectorAll(".btn");
          for (let i =0; i < petsCard.length; i++){
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

          }
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
      }

      async function unload(){
        await shelterObj();
        await readJson();
        mediaQeuries();
        burger();
        popup();
        closePopup ();
        showSlides(shelter.slider.slideIndex);
    };

      
      unload();
}
