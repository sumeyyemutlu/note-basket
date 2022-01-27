const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click',gorevSilTamamla)
document.addEventListener('DOMContentLoaded', localStorageOku)


function gorevSilTamamla(e) {
    const tiklanilanElemean = e.target;

    if(tiklanilanElemean.classList.contains('gorev-btn-tamamlandi')) {
  
        tiklanilanElemean.parentElement.classList.toggle('gorev-tamamlandi')
    }
    if(tiklanilanElemean.classList.contains('gorev-btn-sil')) {
        
        //confirm ile sile görev silindiğinde ekranda bir uyarı mesajı ve tamam iptal butonları çıkar
        if( confirm('Emin misiniz?')) {
            tiklanilanElemean.parentElement.classList.toggle('kaybol')//toggle ne araştır

            //localstoragesil fonk için deger aldık
            const silinecekGorev = tiklanilanElemean.parentElement.children[0].innerText;
     
            localStorageSil(silinecekGorev)
            tiklanilanElemean.parentElement.addEventListener('transitionend', function(){//kaybol efekti bitince remove işlmeini başlatır. addevent lisytiner ile
            tiklanilanElemean.parentElement.remove();
      
        
        })
    }
       
    }
}


function gorevEkle(e) {
    e.preventDefault();
    if(yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);

         //localstorage a kaydetme işlemi
        localStorageKaydet(yeniGorev.value)
        yeniGorev.value ='' //ekleme butonuna tıklandıktan sonra inputun içi boş kalır
    }
    else {
        alert('Boş görev eklenemez!')
    }
}

function localStorageKaydet(yeniGorev) {
    let gorevler;

    //localstorage de getitem ile gorevleri al eğer boşsa bir array oluştur (veri okumaya yarar)
    if(localStorage.getItem('gorevler') === null) {
        
        gorevler=[];
    }
    //eğer boş değilse json.parse ile json nesnelerini jss çevirmeye yarar sonra bunları gorevlerin içine attık
    else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.push(yeniGorev);//gorevlerin için inputa girilen değerleri push ettik 

    //stringify metotu js nesnesini alır ve onu string e dönüştürür
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
    }
function localStorageOku() {

    let gorevler;

    //localstorage de getitem ile gorevleri al eğer boşsa bir array oluştur (veri okumaya yarar)
    if(localStorage.getItem('gorevler') === null) {
        
        gorevler=[];
    }
    //eğer boş değilse json.parse ile json nesnelerini jss çevirmeye yarar
    else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.forEach(function(gorev) {
        gorevItemOlustur(gorev)

    });
}
function gorevItemOlustur(gorev) {
    //div oluşturma
    const gorevDiv = document.createElement('div')
    gorevDiv.classList.add('gorev-item')//div e class adı atadık

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');

    // li elemanlarına inputtan girilen değerleri ekledik
    gorevLi.innerText = gorev

    //gorev divin içinde görev li olduğu için html sayfasında içine attık
    gorevDiv.appendChild(gorevLi);

    // ul nin içinde görevdiv olduğu için içine attık
    gorevListesi.appendChild(gorevDiv);

    //tamamlandi butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');//class adı verdik
    gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>'//iconu html şeklinde ekledik

    gorevDiv.appendChild(gorevTamamBtn)//gorevdiv  butonun içinde old. için içine ekledik.

    //sil butonu ekleme 
    const gorevsilBtn = document.createElement('button');
    gorevsilBtn.classList.add('gorev-btn');
    gorevsilBtn.classList.add('gorev-btn-sil');//class adı verdik
    gorevsilBtn.innerHTML = '<i class="far fa-trash-alt"></i>'//iconu html şeklinde ekledik

    gorevDiv.appendChild(gorevsilBtn)//gorevdiv  butonun içinde old. için içine


}

function localStorageSil (gorev) {
    let gorevler;

    //localstorage de getitem ile gorevleri al eğer boşsa bir array oluştur (veri okumaya yarar)
    if(localStorage.getItem('gorevler') === null) {
        
        gorevler=[];
    }
    //eğer boş değilse json.parse ile json nesnelerini jss çevirmeye yarar
    else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    //splice ile gorev silme işlemi
    const silinecekElemanIndex =gorevler.indexOf(gorev);//indexof ile yazılan yazıların indexi alınır
    console.log(silinecekElemanIndex)

    //splice ile ilk önce nereden silmeye başlayacağımızı ve kaç tane sileceğimizi yazarız
    gorevler.splice(silinecekElemanIndex,1)

    //setitem: gorevleri localstorage e kaydetmeye yarar
    localStorage.setItem('gorevler', JSON.stringify(gorevler))
    


}