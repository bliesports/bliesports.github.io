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
const menuPanel = document.getElementById('menuPanel');
menuPanel.style.display = 'none';

// Hamburger menü aç/kapa
function toggleDropdown(){
  if(menuPanel.style.display === 'block'){
    menuPanel.classList.remove('slide-in');
    menuPanel.classList.add('slide-out');
    setTimeout(()=> menuPanel.style.display='none', 300);
  } else {
    menuPanel.style.display='block';
    menuPanel.classList.remove('slide-out');
    menuPanel.classList.add('slide-in');
  }
}

// Menü butonları
function menuAction(action){
  toggleDropdown();

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
  modal.style.display='flex';
  modal.classList.remove('fade-out');
  modal.classList.add('fade-in');
  document.getElementById('modalTitle').innerText = type==='login' ? 'Giriş Yap' : 'Kayıt Ol';
}

function closeModal(){
  const modal = document.getElementById('modal');
  modal.classList.remove('fade-in');
  modal.classList.add('fade-out');
  setTimeout(()=> modal.style.display='none', 300);
}

// Modal form submit
function submitModal(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const type = document.getElementById('modalTitle').innerText;

  if(type==='Kayıt Ol'){
    auth.createUserWithEmailAndPassword(email,password)
      .then(()=> { alert('Hesap oluşturuldu!'); closeModal(); updateMenu(); })
      .catch(error=> alert(error.message));
  } else {
    auth.signInWithEmailAndPassword(email,password)
      .then(()=> { alert('Giriş başarılı!'); closeModal(); updateMenu(); })
      .catch(error=> alert(error.message));
  }
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

// Menü butonları güncelle (giriş/çıkış durumuna göre)
function updateMenu(){
  const user = auth.currentUser;
  const loginBtn = menuPanel.querySelector("button[onclick*='login']");
  const registerBtn = menuPanel.querySelector("button[onclick*='register']");
  const accountBtn = menuPanel.querySelector("button[onclick*='account']");
  const logoutBtn = menuPanel.querySelector("button[onclick*='logout']");

  if(user){
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    accountBtn.style.display = 'block';
    logoutBtn.style.display = 'block';
  } else {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    accountBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

// Sayfa yüklenince menüyü güncelle
window.addEventListener('load', ()=>{ updateMenu(); });

// Logo tıklandığında ana sayfaya scroll
function scrollToTop(){
  window.scrollTo({ top:0, behavior: 'smooth' });
}

