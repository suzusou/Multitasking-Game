
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Firebaseの情報
const firebaseConfig = {
    apiKey: "AIzaSyDp1AMW8kzmvkKiZkDn5hr_ba7YHANwX2A",
    authDomain: "multitasking-f4765.firebaseapp.com",
    projectId: "multitasking-f4765",
    storageBucket: "multitasking-f4765.appspot.com",
    messagingSenderId: "718143869939",
    appId: "1:718143869939:web:5ca27f75b8e5fea2e83886"
};

const gameModes = document.getElementsByName("gameMode");
var easyPoint = [];
var nomalPoint = [];
var hardPoint = [];


// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// Firestoreを取得
const db = getFirestore(app);


async function ReadFirebase() {
    const shot = await getDocs(collection(db, "rank"));
    shot.forEach((doc) => {
        window.globalData.easyPoint.push(doc.data().easy);
        window.globalData.nomalPoint.push(doc.data().nomal);
        window.globalData.hardPoint.push(doc.data().hard)
    })
    console.log(window.globalData.easyPoint);
    console.log(window.globalData.nomalPoint);
    console.log(window.globalData.hardPoint);
}

async function FirstSetFirebase() {

    // Firestoreに書き込む
    try {
        if (gameModes[0].checked) {
            await updateDoc(doc(db, "rank", "first"), {
                easy: window.global.Points
            });
            await updateDoc(doc(db, "rank", "second"), {
                easy: window.global.score[0]
            });
            await updateDoc(doc(db, "rank", "third"), {
                easy: window.global.score[1]
            });
        } else if (gameModes[1].checked) {
            await updateDoc(doc(db, "rank", "first"), {
                nomal: window.global.Points
            });
            await updateDoc(doc(db, "rank", "second"), {
                nomal: window.global.score[0]
            });
            await updateDoc(doc(db, "rank", "third"), {
                nomal: window.global.score[1]
            });
        } else {
            await updateDoc(doc(db, "rank", "first"), {
                hard: window.global.Points
            });
            await updateDoc(doc(db, "rank", "second"), {
                hard: window.global.score[0]
            });
            await updateDoc(doc(db, "rank", "third"), {
                hard: window.global.score[1]
            });
        }

    } catch (e) {
        console.log(e);
    }

}

async function SecondSetFirebase() {

    // Firestoreに書き込む
    try {
        if (gameModes[0].checked) {
         
            await updateDoc(doc(db, "rank", "second"), {
                easy: window.global.Points
            });
            await updateDoc(doc(db, "rank", "third"), {
                easy: window.global.score[1]
            });
        } else if (gameModes[1].checked) {

            await updateDoc(doc(db, "rank", "second"), {
                nomal: window.global.Points
            });
            await updateDoc(doc(db, "rank", "third"), {
                nomal: window.global.score[1]
            });
        } else {

            await updateDoc(doc(db, "rank", "second"), {
                hard: window.global.Points
            });
            await updateDoc(doc(db, "rank", "third"), {
                hard: window.global.score[1]
            });
        }

    } catch (e) {
        console.log(e);
    }

}

async function ThirdSetFirebase() {

    // Firestoreに書き込む
    try {
        if (gameModes[0].checked) {
            await updateDoc(doc(db, "rank", "third"), {
                easy: window.global.Points
            });
        } else if (gameModes[1].checked) {

            await updateDoc(doc(db, "rank", "third"), {
                nomal: window.global.Points
            });
        } else {
            await updateDoc(doc(db, "rank", "third"), {
                hard: window.global.Points
            });
        }

    } catch (e) {
        console.log(e);
    }

}


window.globalData = {};
window.globalData.ReadFirebase = ReadFirebase;
window.globalData.FirstSetFirebase = FirstSetFirebase;
window.globalData.SecondSetFirebase = SecondSetFirebase;
window.globalData.ThirdSetFirebase = ThirdSetFirebase;
window.globalData.easyPoint = easyPoint;
window.globalData.nomalPoint = nomalPoint;
window.globalData.hardPoint = hardPoint;







