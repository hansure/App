import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCAbztwO4HJrNHsfpKnuRryZqENMutwEmc",
    authDomain: "devents-294606.firebaseapp.com",
    databaseURL: "https://devents-294606.firebaseio.com",
    projectId: "devents-294606",
    storageBucket: "devents-294606.appspot.com",
    messagingSenderId: "588900919375",
    appId: "1:588900919375:web:0ba42cb39a5bbec8c9623a",
    measurementId: "G-7NC30EN10G"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
export const firestore = firebase.firestore();
export const storageRef = firebase.storage();

export default firebase;