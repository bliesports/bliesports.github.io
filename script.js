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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

// Menü paneli
const menuPanel = document.getElementById('menuPanel');
menuPanel.style.display = 'none';

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

function menuAction(action){
  toggleDropdown();
  if(action === 'login' || action === 'register'){
    openModal(action);
  } else if(action === 'support'){
    alert('Destek sayfası');
  } else if(action === 'account'){
    alert('Hesabım sayfası (demo)');
  }
}

// Modal
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

function submitModal(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const type = document.getElementById('modalTitle').innerText;

  if(type==='Kayıt Ol'){
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(()=> { alert('Hesap oluşturuldu!'); closeModal(); })
      .catch(error=> alert(error.message));
  } else {
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(()=> { alert('Giriş başarılı!'); closeModal(); })
      .catch(error=> alert(error.message));
  }
}

function logout(){
  firebase.auth().signOut().then(()=>{ alert('Çıkış yapıldı!'); });
}

// Logo tıklandığında ana menüye scroll
function scrollToTop(){
  window.scrollTo({ top:0, behavior: 'smooth' });
}
