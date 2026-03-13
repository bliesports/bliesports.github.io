// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyB0PdRozDzBzSyuuNIRG67xg-W3UJBfJD8",
  authDomain: "bliesports.firebaseapp.com",
  projectId: "bliesports",
  storageBucket: "bliesports.firebasestorage.app",
  messagingSenderId: "880767104142",
  appId: "1:880767104142:web:5edbe111f42f16ab1545df",
  measurementId: "G-T1PHQ0Z45M"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ================= ELEMENTLER =================
const sideMenu = document.getElementById('sideMenu');
const hamburger = document.getElementById('hamburger');
const cartSidebar = document.getElementById('cartSidebar');

// ================= HAMBURGER MENÜ AÇ/KAPA =================
if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Tıklamanın dışarı sızmasını engeller
    sideMenu.classList.toggle('open');
    // Menü açılırken sepeti kapatalım çakışmasınlar kral
    if (cartSidebar) cartSidebar.style.right = "-350px"; 
  });
}

// Menü dışına tıklandığında menüyü kapat (Mobil için çok önemli)
document.addEventListener('click', (e) => {
  if (sideMenu && !sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.classList.remove('open');
  }
});

// ================= FONKSİYONLAR =================

// Logo tıklandığında yukarı kaydır
function scrollToTop(){
  window.scrollTo({ top:0, behavior: 'smooth' });
}

// Menü aksiyonları (Giriş, Kayıt, Destek)
function menuAction(action){
  sideMenu.classList.remove('open'); // Aksiyon seçince menüyü kapat
  if(action === 'login' || action === 'register'){
    alert(action === 'login' ? 'Giriş paneline yönlendiriliyorsunuz...' : 'Kayıt paneline yönlendiriliyorsunuz...');
  } else if(action === 'support'){
    alert('Destek ekibine bağlanılıyor...');
  }
}

// Çıkış Yap
function logout(){
  auth.signOut().then(()=>{
    alert('Başarıyla çıkış yapıldı!');
    location.reload(); // Sayfayı yenile ki menü güncellensin
  });
}

// Hesap Sayfasına Git
function goToAccount(){
  const user = auth.currentUser;
  if(user){
    window.location.href = "https://accounts.bliesports.github.io/tr/my-account?email=" + encodeURIComponent(user.email);
  } else {
    alert("Kanka önce bi' giriş yapman lazım!");
  }
}

// Sayfa yüklenince kontrol
window.addEventListener('load', ()=>{ 
    console.log("BLI Esports Sistemi Hazır | Google Onayı Aktif");
});
