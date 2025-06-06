import { initializeApp } from "firebase/app";
import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword } 
 from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAM91NIvOfUTAj3Y_Ap0Ya1uVxmR4eGpFY",
  authDomain: "personal-finance-app-42ef5.firebaseapp.com",
  projectId: "personal-finance-app-42ef5",
  storageBucket: "personal-finance-app-42ef5.firebasestorage.app",
  messagingSenderId: "210032510051",
  appId: "1:210032510051:web:6a6a717c82c54eb27ba456"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();


interface RegisterResult{
  ok:boolean;
  uid?: string;
  displayName?: string;
  password?: string;
  photoURL?: string | null;
  email?: string;
  errorCode?: string;
  errorMessage: string | null;
}

const handleGoogleLogin = async() => {
  try{
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  }catch(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

const loginWithEmailPassword = async(email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const { displayName, email: userEmail, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email: userEmail,
      photoURL,
      uid
    }
  }catch(error: any) {
    const errorCode = error.code;
    const errorMessage = 'Este usuario no existe o la contraseña es incorrecta';

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}


const registerWithEmailPassword = async(email: string, password: string, displayName: string): Promise<RegisterResult> => {
  try{
    const resp = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = resp.user;
    updateProfile(resp.user, { displayName });
    
    return {
      ok: true,
      uid,
      displayName,
      email,
      password,
      photoURL: null,
      errorMessage: null,
    }

  }catch(error: any) {
    return {
      ok: false,
      errorMessage: 'User already exists with this email',
    }
  }
}

const onLogout = async() => {
   try{
    await auth.signOut();
    return {
      ok: true
    }
   }catch(error: any) {
    return {
      ok: false,
      errorMessage: error.message
    }
   }
}

export { auth, googleProvider, handleGoogleLogin, registerWithEmailPassword, loginWithEmailPassword, onLogout };

