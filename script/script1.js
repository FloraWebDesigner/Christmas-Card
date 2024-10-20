window.onload = onLoad;
function onLoad() {

    let currFocus = null;
    let preResult = null;
    let isRaffling = false;
    let num = 0;
    let snowURL;
    let btnSubmit = document.querySelector('.submit');
    let btnReset = document.querySelector('.reset');
    let btnGetLuckySnowflake = document.querySelector('.luckySnowflake');
    let theme = document.getElementById("theme");
    let validBox = document.querySelector(".validBox");
    let btnConfirm = document.getElementById("confirm");
    let btnCancel = document.getElementById("cancel");
    let alert = document.querySelector(".alert");
    let isProcessing = false;

    let colorSession = document.querySelector('.color');
    let snowSession = document.querySelector('.snow-img');
    let buttonSession = document.querySelector('.button');
    let music = document.getElementById("music");
    let snowpage = document.querySelector(".snowpage");
    let myForm=document.querySelector(".myForm");
    let playAgain = document.getElementById("playAgain");

    btnSubmit.onclick = formSubmit;
    btnReset.onclick = formReset;
    btnGetLuckySnowflake.onclick = luckySnowflake;
    playAgain.onclick=formAgain;
    /* theme.innerHTML = ""; */

    loadHeader();
    loadBody();
    function loadHeader() {
        let numString = 0;
        let myTheme = "Create your Snow Theme";
        theme.innerHTML = '';
        window.loadingInterval = setInterval(function () {
            if (numString < myTheme.length) {
                const span = document.createElement('span');
                span.textContent = myTheme[numString];
                span.classList.add('showup-animation');
                span.style.animationDelay = `${numString * 0.1}s`;
                theme.appendChild(span);
                numString++;
            }
            else {
                clearInterval(window.loadingInterval);
            }
        }, 80);

    }


    function loadBody() {
        myForm.classList.remove("disappear");
         myForm.classList.add("top-appear");
        if (snowpage) {
            snowpage.classList.remove("top-appear");
        }
        if (colorSession) {
            colorSession.classList.add('leftappear');
            console.log('Added appear to color session');
        }
        if (snowSession) {
            snowSession.classList.add('rightappear');
            console.log('Added appear to snow session');
        }
        if (buttonSession) {
            buttonSession.classList.add('leftappear2');
            console.log('Added appear to button session');
        }
        document.body.classList.add('colorfulBG');
        console.log('Added background');
    }

    function playAudio() {
        music.play();
    }

    function pauseAudio() {
        music.pause();
    }

    function showAlert(text) {
        validBox.style.display = "flex";
        alert.innerHTML = text;
    }

    function hideAlert() {
        validBox.style.display = "none";
    }

    function formSubmit(event) {
        event.preventDefault();
        isProcessing = true;
        let isValid = true;
        let color1 = document.getElementById('DIYcolor1').value;
        let color2 = document.getElementById('DIYcolor2').value;
        // color validation
        if (color1 === '#091a22' && color2 === '#091a22') {
            isValid = false;
            showAlert("You haven't choose any color. The system will keep the current background.");
            console.log("CHOOSE COLOR alert should come up");
            btnCancel.onclick = function () {
                hideAlert();
                console.log("CHOOSE COLOR: Y");
                isProcessing = false;
            }
            btnConfirm.onclick = function () {
                console.log("CHOOSE COLOR: N");
                hideAlert();
                isValid = true;
                if (!color1) { color1 = '#091a22'; }
                if (!color2) { color2 = '#091a22'; }
                checkSnowPattern();
            };
        }
        else {
            checkSnowPattern();
        }

        function checkSnowPattern() {
            if (num === 0) {
                isValid = false;
                console.log("CHOOSE CARD alert should come up.");
                showAlert("You haven't choose any snow pattern. Are you sure you want to process? Note: The system will create a default page for you.");
                btnCancel.onclick = function () {
                    console.log("CHOOSE COLOR: Y");
                    hideAlert();
                    isProcessing = false;
                };
                btnConfirm.onclick = function () {
                    console.log("CHOOSE COLOR: N");
                    hideAlert();
                    num = 1;
                    isValid = true;
                    console.log("choose #" + num + " snow pattern for the user.");
                    proceedWithSubmission();
                };
            }
            else {
                proceedWithSubmission();
            }
        }

        function proceedWithSubmission() {
            if (!isValid) {
                isProcessing = false;
                return;
            }
            sendPlane();
            playAudio();
            console.log('form is submitted.')
            document.body.style.backgroundImage = 'linear-gradient(to bottom right,' + color1 + ',' + color2 + ')';
            createdSnowPage();
            isProcessing = false;
        }


    }


    function formAgain(){
        snowpage.style.display="none";
        loadHeader();
        loadBody();
        formReset();       
    }

    function formReset() {
        // background reset
        document.body.style.backgroundImage = '';
        document.getElementById('DIYcolor1').value = '#091a22';
        document.getElementById('DIYcolor2').value = '#091a22';
        document.body.classList.add('colorfulBG');
        cardReset();
        /*  resetShow(); */
        hoverBack();
        deletedSnowPage();
        pauseAudio();
    }

    function cardReset() {
        let cards = document.querySelectorAll('.card');
        const imgSelected = document.querySelector('.card:nth-child(' + num + ') .back img')
        if (imgSelected) {
            imgSelected.classList.remove('snowSelected');
        }
        num=0;
        cards.forEach(function (card) {
            card.classList.remove('flipped');
            card.classList.remove('focus');
            card.classList.remove('selected');
            card.classList.remove('snowSelected');
        });
    }


    function sendPlane() {
        //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_animation
        const plane = document.querySelector('.plane');
        plane.style.animation = 'flyaway 2s linear';
        console.log('flyaway runs.')
    }

    function luckySnowflake() {
        console.log("get lucky snow.");
        if (btnGetLuckySnowflake) {
            if (!isRaffling) {
                // stop hover animation
                stopShow();
                // flip the cards  
                let cards = document.querySelectorAll('.card');
                cards.forEach(function (card) {
                    card.classList.add('flipped');
                });
                console.log('Flipped the cards.')
                // clear past interval
                if (window.myInterval) {
                    clearInterval(window.myInterval);
                }
                isRaffling = true;
                window.myInterval = setInterval(function () { setFocus() }, 200);
            }
            else {
                resetShow();
                stopFocus();
                isRaffling = false;

            }
        }
    }
    // remove animation while raffling
    function stopShow() {
        document.querySelectorAll('.card .back:hover img').forEach(function (img) {
            img.style.animation = 'none';
        });

    }
    // get back hover animation after raffling
    function resetShow() {
        document.querySelectorAll('.card .back:hover img').forEach(function (img) {
            img.style.animation = '';
        });
        console.log('Hover animation reset.');
    }


    function hoverBack() {
        document.querySelectorAll('.card .back').forEach(function (backElement) {

            const img = backElement.querySelector('img');
            img.style.animation = 'none';

            void img.offsetWidth;

            img.style.animation = '';
        });
        console.log('Hover animations reset.');
    }

    // show focused img by adding class
    function setFocus() {
        // disappear the past focus
        if (currFocus) {
            currFocus.classList.remove('focus');
            currFocus.classList.remove('selected');
        }
        // https://www.w3schools.com/howto/howto_js_add_class.asp
        num = getRandomFocus();
        currFocus = document.querySelector('.card:nth-child(' + num + ')');
        currFocus.classList.add('focus');
        resetShow();
        /* currFocus.classList.remove('back:hover img'); */

    }
    // show selected img and trigger the page creation
    function startAnimation(card) {
        if (card) {
            card.classList.remove('focus');
            card.classList.add('selected');
            card.classList.remove('flipped');
        }
        const imgSelected = document.querySelector('.card:nth-child(' + num + ') .back img')
        console.log(imgSelected);
        if (imgSelected) {
            imgSelected.classList.add('snowSelected');
        }

    }


    function createdSnowPage() {
        let wrapper = document.querySelector(".wrapper");
        console.log("user selected" + num);
        snowURL = './img/' + num + '.svg';
        console.log('url is ' + snowURL);
        // clear previous snowflake
        wrapper.innerHTML = '';
        if (num) {    // create 14 <div>
            for (let i = 0; i < 14; i++) {
                // <div id=number range>/div>
                let snowElem = document.createElement("div");
                // add class
                snowElem.className = 'selectedShape';
                let imgElem = document.createElement("img");
                imgElem.src = snowURL;
                imgElem.alt = 'Snowflake selected';
                snowElem.appendChild(imgElem);
                wrapper.appendChild(snowElem);
            }
        }
        myForm.classList.add("disappear");
        snowpage.style.display="flex";
        theme.innerHTML ="Enjoy Your Snow Season";


    }

    // delete snow fall
    function deletedSnowPage() {
        const snowFall = document.querySelectorAll(".selectedShape");
        console.log(snowFall);
        if (snowFall) {
            snowFall.forEach(function (element) {
                element.remove();
            });
        }
    }

    // stop raffling and get result
    function stopFocus() {
        if (window.myInterval) {
            clearInterval(window.myInterval);
            startAnimation(currFocus);
            console.log("user selected" + num);
        }
    }

    function getRandomFocus() {
        // math.random --> 1-6
        do {
            num = Math.floor(Math.random() * 6 + 1);
        } while (num === preResult);
        preResult = num;
        return num;
    }




}