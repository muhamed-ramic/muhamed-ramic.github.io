// JavaScript source code
//document.getElementById("bt3").click();//to
//document.getElementById("bt3").click();


localStorage.removeItem("previousRandomSources");
function modalFunc()
{
    document.getElementById("myModal").style.display = "block";
    document.getElementsByClassName("close")[0].addEventListener("click", function ()
    {
        document.getElementById("myModal").style.display = "none";
    });
    var nizRezultatae = JSON.parse(localStorage.getItem("rezultatiNiz"));
    var nizPET = [], sortiraniNiz=[];
    for (var i = 0; i < nizRezultatae.length; i++)
        if (nizRezultatae[i] != null)
            nizPET.push(nizRezultatae[i]);

    nizPET.sort();
    var min = nizPET[0];
    for (var i = 0; i < nizPET.length; i++)
        for (var j = i + 1; j < nizPET.length - 1; j++)
        {
            var staraVrijednost;
            if(nizPET[i]<nizPET[j])
            {
                staraVrijednost = nizPET[i];
                nizPET[i] = nizPET[j];
                nizPET[j] = staraVrijednost;
            }
        }
    for (var i = 0; i < 5; i++)
        sortiraniNiz.push(nizPET[i]);

    
    var brojac = 1;
    for (var i = 0; i < sortiraniNiz.length; i++)
    {
        document.getElementById("idn").innerHTML += brojac + "." + " : " + sortiraniNiz[i] + "<br/>";
        brojac++;
    }


}
//play&&startTIMER
document.getElementById("bt1").addEventListener("click", start);
document.getElementById("bt2").addEventListener("click", modalFunc);

//playAgain

document.getElementById("again").addEventListener("click", clearImages);



//opening modal
document.getElementById("bt5").addEventListener("click", function () {
    document.getElementById("myModal2").style.display = "block";
});
document.getElementById("bt6").addEventListener("click", function () {
    document.getElementById("myModal3").style.display = "block";
});
//closing modal
document.getElementById("bt3").addEventListener("click", function () {
    document.getElementById("myModal2").style.display = "none";
});
document.getElementById("bt4").addEventListener("click", function () {
        document.getElementById("myModal3").style.display = "none";
    });

//modal functions

var nizSlikaZaUporedit = [], rezultat = 0;
var pocetnoVrijeme = document.getElementById("vrijeme").innerHTML;
var brojacPokrenuteIgre;
var sourcePravi = "images/mem_card.png";
var pokrenutaIgra = false;
var tipTwoOfKind = false, tipThreeOfKind = false;
var Interval;

function clearImages() {
    var nizTrenutnihSlika = divZaSmjestit.getElementsByTagName("img");
    for (var i = 0; i < nizTrenutnihSlika.length; i++) {
        nizTrenutnihSlika[i].src = sourcePravi;
        nizTrenutnihSlika[i].style = "opacity:1";
    }
    if (document.getElementById("vrijeme").innerHTML != "Time:0:00")
    {
        document.getElementById("vrijeme").innerHTML = "Time:1:59";
        clearInterval(Interval);
    }
}

function start()
{
    if (pokrenutaIgra)
        location.reload(true);
    if (document.getElementById("inpt1").checked || document.getElementById("inpt2").checked)
        pokrenutaIgra = true;
    //else if (document.getElementById("inpt1").checked == false || !document.getElementById("inpt2").checked == false) {
    //    tipTwoOfKind = true;
    //    pokrenutaIgra = true;
    //}
    Interval = setInterval(func, 1000);

    if (document.getElementById("inpt1").checked)
        tipTwoOfKind = true;
    else if (document.getElementById("inpt2").checked)
        tipThreeOfKind = true;
    brojacPokrenuteIgre = localStorage.getItem("brojIgara");
    if (brojacPokrenuteIgre == null)
        brojacPokrenuteIgre = 0;
    brojacPokrenuteIgre++;
    localStorage.setItem("brojIgara", brojacPokrenuteIgre);
}
function func()
{
    //TIMER
    var x = document.getElementById("vrijeme").innerHTML;
    var minuta = 0;
    var start = x.indexOf(":", 0);
    var sub = x.substr(start + 1, x.length - start);
    minuta = parseInt(sub[0]);
    //console.log(sub);
    var zadnjaDvotacka = sub.indexOf(":", 0);
    var zadnjaCifra = parseInt(sub[zadnjaDvotacka + 2]);
    zadnjaCifra--;

    //sub[zadnjaDvotacka + 2] = String(zadnjaCifra);

    var prvaCifra = parseInt(sub[zadnjaDvotacka + 1]);
    if (zadnjaCifra < 0) {
        prvaCifra--;
        zadnjaCifra = 9;
    }
    else if (prvaCifra == 0 && zadnjaCifra == 0 && minuta != 0) {
        minuta = 0;
        prvaCifra = 5;
        zadnjaCifra = 9;
    }
    x = "Time" + ":" + minuta.toString() + ":" + prvaCifra.toString() + "" + zadnjaCifra;
    if (document.getElementById("vrijeme").innerHTML != "Time:0:00")
      document.getElementById("vrijeme").innerHTML = x;

    if (document.getElementById("vrijeme").innerHTML == "Time:0:00") {
        document.getElementById("bt6").click();
        clearInterval(Interval);
        clearImages();//to refresh game
       

    }

}
//IMAGES IN 24 DIVS.
var divZaSmjestit = document.getElementById("id2");

var randomBroj = 0, boolvar = false;
var nizSlikaSource = [], nizOd12Sourcea = [];

    for (var i = 1; i <= 12; i++) {
        nizSlikaSource.push("Images/mem_" + i + ".png");
        if (i > 1)
            randomImageSourceAlgorithm();//calling twelve times it for having unique random sources, without duplicate.
    }


for (var i = 0; i < 24; i++) {
    var d = document.createElement("div");
    d.style.cssFloat = "left";
    d.setAttribute("id", "karte" + i);
    var karta = document.createElement("IMG");
    karta.setAttribute("class", "karta");
    karta.setAttribute("src", "images/mem_card.png");
    karta.setAttribute("width", "120");
    karta.setAttribute("height", "150");

    var karta2 = document.createElement("IMG");
    karta2.setAttribute("class", "karta");
    karta2.setAttribute("src", randomImageSourceAlgorithm());
    karta2.setAttribute("width", "120");
    karta2.setAttribute("height", "150");
    karta2.setAttribute("visibility", "hidden");
    karta.appendChild(karta2);

    d.appendChild(karta);
    d.setAttribute("class", "karte");
    divZaSmjestit.appendChild(d);


}
var niz = divZaSmjestit.getElementsByTagName("div");
var divoviUnutra = divZaSmjestit.getElementsByTagName("div");

//adding clickevents
for (var j = 0; j < divoviUnutra.length; j++) {
    divoviUnutra[j].addEventListener("click", (e) =>clickEvent(event));
}
var slika, slikaZaPromjenit, divZaPromjenit, nizProslihSource, z, y, idiDalje2 = false, dalje = false;



function randomImageSourceAlgorithm() {
    randomBroj = Math.round(Math.random() * 10 + 1, 0);
    var brojac = 0, staraVrijednost = -1, upitnaVrijednost = false, pronadjeno = false;
    nizProslihSource = JSON.parse(localStorage.getItem("previousRandomSources"));

    if (nizProslihSource == null) {
        nizProslihSource = [];
        z = 0;
        y = 0;
    }

        //ALGORITHM FOR HAVING A RANDOM SOURCE A ONCE IN ARRAY, TO HAVE ALL KIND OF ANIMALS.
        for (var i = 0; i < nizProslihSource.length; i++) {
            if (randomBroj != nizProslihSource[i])
                upitnaVrijednost = true;
            else if (randomBroj == nizProslihSource[i]) {
                randomBroj = Math.round(Math.random() * 10 + 1, 0);
                for (var j = 0; j < nizProslihSource.length; j++) {
                    do {
                        if (randomBroj != nizProslihSource[j])
                            upitnaVrijednost = true;
                        else if (randomBroj == nizProslihSource[j])
                            randomBroj = Math.round(Math.random() * 10 + 1, 0);

                    } while (upitnaVrijednost == false);
                }
            }
        }


        //FINDING DUPLICATE VALUES OF RANDOM SOURCE IF IT EXISTS.
        if (nizProslihSource.length == 11) {
            nizProslihSource.push(0);
            for (var i = 0; i <= 11; i++) {
                for (var j = 0; j < nizProslihSource.length; j++) {
                    if (i == nizProslihSource[j])
                        pronadjeno = true; // we found the numbers from 1-11 in my random source array
                }
                if (pronadjeno == false) //if we did not find
                {
                    //now goes finding duplicate values in my array.
                    for (var k = 0; k < nizProslihSource.length; k++) {
                        for (var l = 0; l < nizProslihSource.length; l++) {
                            if (k == l)
                                continue;
                            if (nizProslihSource[k] == nizProslihSource[l])
                                brojac++;
                            if (brojac > 0) {
                                nizProslihSource.splice(k, 1);
                                nizProslihSource.push(i);
                                brojac = 0;
                            }
                        }
                    }
                }
                pronadjeno = false;
            }
            dalje = true;
        }


        if (nizProslihSource.length < 13)
            nizProslihSource.push(randomBroj);




        localStorage.setItem("previousRandomSources", JSON.stringify(nizProslihSource));

        if (randomBroj != undefined) {
            var randomSource = "";
            if (dalje) {
                randomSource = nizSlikaSource[nizProslihSource[y]];
                y++;
                if (y == 12) {
                    dalje = false;
                    idiDalje2 = true;
                }
            }
            else if (dalje == false && idiDalje2) {
                if (z == 0) {
                    nizProslihSource = JSON.parse(localStorage.getItem("previousRandomSources"));
                    nizProslihSource.pop();
                    nizProslihSource.sort();
                    localStorage.setItem("previousRandomSources", JSON.stringify(nizProslihSource));
                }
                randomSource = nizSlikaSource[nizProslihSource[z]];
                z++;

            }
            return randomSource;
        }

    }

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
var vecOtkrivenaKarta = false, nizRezultatA,uradiJenom=false;
//var vecOtkrivenaKartaSource1 = "", vecOtkrivenaKartaSource2 = "";
//var xPozicijaOtkrivene, yPozicijaOtkrivene, xPozicijaOtkriveneDruge, YpozicijaOtkriveneDruge;
//var xPozicijaOtkriveneNiz = [], yPozicijaOtkriveneNiz = [];
//var vecOtkriveneKarteSource = [];

var stariNizSlika = [];
//function for handeling events
function clickEvent(n)
{
    //THREE OF KIND NOT YET FINISHED!
    if (tipTwoOfKind)
    {
        console.log(n);
        nizSlikaZaUporedit.push(n.target);
        if (n.target.alt == "" || n.target.alt != "")
        {
            n.target.src = n.target.lastElementChild.src;
            n.target.classList.add("transformationM");
        }
        if (nizSlikaZaUporedit.length % 2 == 0 && nizSlikaZaUporedit.length > 0)
        {
            var velicinaN = nizSlikaZaUporedit.length;
            if (nizSlikaZaUporedit[velicinaN - 1].src != nizSlikaZaUporedit[velicinaN - 2].src)
            {
                stariNizSlika.push(nizSlikaZaUporedit[velicinaN - 1].src);
                stariNizSlika.push(nizSlikaZaUporedit[velicinaN - 2].src);

                nizSlikaZaUporedit[velicinaN - 1].classList.add("transformationN");
                setTimeout(function () { nizSlikaZaUporedit[velicinaN - 1].src = sourcePravi; }, 1500);
                nizSlikaZaUporedit[velicinaN - 2].classList.add("transformationN");
                setTimeout(function () { nizSlikaZaUporedit[velicinaN - 2].src = sourcePravi; }, 1500);
                    
                nizSlikaZaUporedit[velicinaN - 1].alt = "changed";
                nizSlikaZaUporedit[velicinaN - 2].alt = "changed";
            }
            else if (nizSlikaZaUporedit[velicinaN - 1].src == nizSlikaZaUporedit[velicinaN - 2].src && nizSlikaZaUporedit[velicinaN-1].parentElement.id!=nizSlikaZaUporedit[velicinaN-2].parentElement.id)
            {
                nizSlikaZaUporedit[velicinaN - 1].style.opacity = "0.3";
                nizSlikaZaUporedit[velicinaN - 1].id = "CantClick";
                nizSlikaZaUporedit[velicinaN - 2].style.opacity = "0.3";
                nizSlikaZaUporedit[velicinaN - 2].id = "CantClick";
                rezultat++;

            }
            if (rezultat == 12)
            {
                document.getElementById("bt5").click();
                document.getElementById("trenutniRezultat").innerHTML = rezultat;
                clearImages();
            }
        }
        var x = localStorage.getItem("brojIgara");
        nizRezultatA = JSON.parse(localStorage.getItem("rezultatiNiz"));
        if (nizRezultatA == null)
            nizRezultatA = [];
        nizRezultatA[x] = rezultat;
        localStorage.setItem("rezultatiNiz", JSON.stringify(nizRezultatA));
        localStorage.setItem("rezultatii", JSON.stringify(nizRezultatA));

    }
    else if (tipThreeOfKind)
    {
        if (uradiJenom == false)
        {
            var slikePostojece = [], pomocniNiz = [];
            for (var i = 0; i < 8; i++)
            {
                pomocniNiz.push(i);
            }
            for (var i = 0; i < 8; i++)
                pomocniNiz.push(i);
            for (var i = 0; i < 8; i++)
                pomocniNiz.push(i);
            var x = 0;
            slikePostojece = divZaSmjestit.getElementsByTagName("img");
            for (var i = 0; i < slikePostojece.length; i++)
            {
                if (i % 2 != 0)
                    slikePostojece[i].src = nizSlikaSource[pomocniNiz[x++]];
            }
            uradiJenom = true;
        }
       
        nizSlikaZaUporedit.push(n.target);
        if (n.target.alt == "" || n.target.alt != "")
        {
            n.target.src = n.target.lastElementChild.src;
            n.target.classList.add("transformationM");
        }
        if (nizSlikaZaUporedit.length % 3 == 0 && nizSlikaZaUporedit.length > 0)
        {
            var velicinaN = nizSlikaZaUporedit.length;
            if (nizSlikaZaUporedit[velicinaN - 1].src != nizSlikaZaUporedit[velicinaN - 2].src && nizSlikaZaUporedit[velicinaN - 1].src != nizSlikaZaUporedit[velicinaN - 3].src
                && nizSlikaZaUporedit[velicinaN - 2].src != nizSlikaZaUporedit[velicinaN - 3].src)
            {
                stariNizSlika.push(nizSlikaZaUporedit[velicinaN - 1].src);
                stariNizSlika.push(nizSlikaZaUporedit[velicinaN - 2].src);
                stariNizSlika.push(nizSlikaZaUporedit[velicinaN - 3].src);

                nizSlikaZaUporedit[velicinaN - 1].classList.add("transformationN");
                setTimeout(function () { nizSlikaZaUporedit[velicinaN - 1].src = sourcePravi; }, 1500);
                nizSlikaZaUporedit[velicinaN - 2].classList.add("transformationN");
                setTimeout(function () { nizSlikaZaUporedit[velicinaN - 2].src = sourcePravi; }, 1500);
                nizSlikaZaUporedit[velicinaN - 3].classList.add("transformationN");
                setTimeout(function () { nizSlikaZaUporedit[velicinaN - 3].src = sourcePravi; }, 1500);


                nizSlikaZaUporedit[velicinaN - 1].alt = "changed";
                nizSlikaZaUporedit[velicinaN - 2].alt = "changed";
                nizSlikaZaUporedit[velicinaN - 3].alt = "changed";

            }
            else if (nizSlikaZaUporedit[velicinaN - 1].src == nizSlikaZaUporedit[velicinaN - 2].src && nizSlikaZaUporedit[velicinaN-1].src==nizSlikaZaUporedit[velicinaN-3].src &&
                nizSlikaZaUporedit[velicinaN - 2].src == nizSlikaZaUporedit[velicinaN - 3].src)
            {
                nizSlikaZaUporedit[velicinaN - 1].style.opacity = "0.3";
                nizSlikaZaUporedit[velicinaN - 1].id = "CantClick";
                nizSlikaZaUporedit[velicinaN - 2].style.opacity = "0.3";
                nizSlikaZaUporedit[velicinaN - 2].id = "CantClick";
                nizSlikaZaUporedit[velicinaN - 3].style.opacity = "0.3";
                nizSlikaZaUporedit[velicinaN - 3].id = "CantClick";
                rezultat += 3;
            }
            if(rezultat==24)
            {
                document.getElementById("bt5").click();
                document.getElementById("trenutniRezultat").innerHTML = rezultat;
                clearImages();
            }

        }

       
    }
    var x = localStorage.getItem("brojIgara");
    nizRezultatA = JSON.parse(localStorage.getItem("rezultatiNiz"));
    if (nizRezultatA == null)
        nizRezultatA = [];
    nizRezultatA[x] = rezultat;
    localStorage.setItem("rezultatiNiz", JSON.stringify(nizRezultatA));
    localStorage.setItem("rezultatii", JSON.stringify(nizRezultatA));


}
