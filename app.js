const firebaseConfig = {
    apiKey: "AIzaSyBIe-ncWVaLrsEZpEXj8Zarr3Jeku6rlZk",
    authDomain: "teebadnaaaaa.firebaseapp.com",
    databaseURL: "https://teebadnaaaaa-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "teebadnaaaaa",
    storageBucket: "teebadnaaaaa.firebasestorage.app",
    messagingSenderId: "789554357659",
    appId: "1:789554357659:web:d55f0745f460f213832d3e",
    measurementId: "G-NY849BJCTM"
  };

// เริ่มต้น Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();




// ค่าบริการ
const baseFee = 80;  // ค่าลงทะเบียนสนาม
const gameFee = 20;   // ค่าต่อเกม

// เพิ่มผู้เล่น
function addPlayer() {
    const playerName = document.getElementById("playerName").value;
    if (playerName.trim() === "") return;

    db.collection("players").add({
        name: playerName,
        gamesPlayed: 0,
        totalFee: baseFee
    }).then(() => {
        console.log("เพิ่มสมาชิกสำเร็จ");
        document.getElementById("playerName").value = "";
        loadPlayers();
    });
}

// โหลดรายชื่อผู้เล่น
function loadPlayers() {
    db.collection("players").onSnapshot(snapshot => {
        const list = document.getElementById("playerList");
        list.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const li = document.createElement("li");
            li.textContent = `${data.name} | เกมที่เล่น: ${data.gamesPlayed} | ค่าบริการ: ${data.totalFee} บาท`;

            const btnPlay = document.createElement("button");
            btnPlay.textContent = "เล่นเกม";
            btnPlay.onclick = () => playGame(doc.id, data.gamesPlayed, data.totalFee);
            
            li.appendChild(btnPlay);
            list.appendChild(li);
        });
    });
}

// เพิ่มเกม และอัปเดตราคา
function playGame(playerId, gamesPlayed, totalFee) {
    const newGamesPlayed = gamesPlayed + 1;
    const newTotalFee = baseFee + (newGamesPlayed * gameFee);

    db.collection("players").doc(playerId).update({
        gamesPlayed: newGamesPlayed,
        totalFee: newTotalFee
    }).then(() => {
        console.log("อัปเดตจำนวนเกมและค่าบริการแล้ว");
    });
}

// โหลดข้อมูลเมื่อเปิดหน้าเว็บ
loadPlayers();