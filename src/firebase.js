import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCiZQLkyELI9825xfzGqHXN2iwD8uRXXdo",
    authDomain: "uploadimagequizaze.firebaseapp.com",
    projectId: "uploadimagequizaze",
    storageBucket: "uploadimagequizaze.appspot.com",
    messagingSenderId: "586647601758",
    appId: "1:586647601758:web:727f672531b164e75aeacf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)