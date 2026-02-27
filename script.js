// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB0PdRozDzBzSyuuNIRG67xg-W3UJBfJD8",
  authDomain: "bliesports.firebaseapp.com",
  projectId: "bliesports",
  storageBucket: "bliesports.firebasestorage.app",
  messagingSenderId: "880767104142",
  appId: "1:880767104142:web:5edbe111f42f16ab1545df",
  measurementId: "G-T1PHQ0Z45M"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

// Menü paneli
const menuPanel = document.getElementById('sideMenu'); // SideMenu olarak güncelledik

// Hamburger menü aç/kapa
function toggleDropdown(){
  if(menuPanel.classList.contains('open')){
    menuPanel.classList.remove('open');
  } else {
    menuPanel.classList.add('open');
  }
}

// Menü butonları
function menuAction(action){
  if(action === 'login' || action === 'register'){
    openModal(action);
  } else if(action === 'support'){
    alert('Destek sayfası (demo)');
  } else if(action === 'account'){
    goToAccount();
  }
}

// Modal aç/kapa
function openModal(type){
  const modal = document.getElementById('modal');
  if(modal) {
    modal.style.display='flex';
    document.getElementById('modalTitle').innerText = type==='login' ? 'Giriş Yap' : 'Kayıt Ol';
  }
}

function closeModal(){
  const modal = document.getElementById('modal');
  if(modal) modal.style.display='none';
}

// Çıkış yap
function logout(){
  auth.signOut().then(()=>{
    alert('Çıkış yapıldı!');
    updateMenu();
  });
}

// Kullanıcı avatar tıklama yönlendirme
function goToAccount(){
  const user = auth.currentUser;
  if(user){
    const email = user.email;
    window.location.href = "https://accounts.bliesports.github.io/tr/my-account?email=" + encodeURIComponent(email);
  } else {
    alert("Lütfen önce giriş yapın!");
  }
}

// Sayfa yüklenince menüyü güncelle
window.addEventListener('load', ()=>{ 
    console.log("Sistem hazır, Google onayı aktif");
});

// Logo tıklandığında ana sayfaya scroll
function scrollToTop(){
  window.scrollTo({ top:0, behavior: 'smooth' });
}
