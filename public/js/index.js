// 要素を取得
const gameStartModal = document.getElementById("gameStartModal");
const TimeRemaining = document.getElementById("TimeRemaining");
const end = document.getElementById("end");
const question = document.getElementById("question");
const speechtext = document.getElementById("speechtext");
const typetext = document.getElementById("typetext");
const gameResultModal = document.getElementById("gameResultModal");
const point = document.getElementById("point");
const NowPoint = document.getElementById("NowPoint");
const rule = document.getElementById("rule");
const modalContent = document.getElementById("modal-content");
const ruleModalContent = document.getElementById("rule-modal-content");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const firstbtn = document.getElementById("colorlefttopbtn");
const secondbtn = document.getElementById("colorrighttopbtn");
const thirdbtn = document.getElementById("colorleftbottombtn");
const fourthbtn = document.getElementById("colorrightbottombtn");
const colorfirst = document.getElementById("colorfirst");
const colorsecond = document.getElementById("colorsecond");
const colorthird = document.getElementById("colorthird");
const colorfourth = document.getElementById("colorfourth");
const gameMode = document.getElementsByName("gameMode");

// Web Speech API
SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';

// 初期値の設定
var PassSec = 90;
var count = 0;
var points = 0;
var colorCount = 0;
var bools = false;
var boolt = false;
var bool = false;
var boolRule = true;

// 問題の配列の宣言
var easytextLists = [
    'Hello World',
    'This is my App',
    'How are you?',
    'Hello Hello',
    'I love JavaScript!',
    'Good morning',
    'I am Japanese',
    'Let it be',
    'Very nice',
    'Nice to meet you'
];

var nomaltextLists = [
    'This guitar is hers',
    ' Is that cap yours?',
    'Whose computer is that?',
    'These books are ours',
    'Help me',
    'I want a new guitar',
    'They sing very well',
    'I write a letter in English',
    'Is he your teacher?',
    'Yes, she is'
];

var hardtextLists = [
    'English is spoken by many people',
    'The news made her sad',
    'I told you to open the window',
    'I want him to come here',
    'Would you like a drink?',
    'It is difficult to get up early',
    'My father wants me to be a doctor',
    'I am sure that he will help me',
    'This homework must be done by you',
    'I am glad that you are fine'
];

var easymoji = [
    'おじいさんとおばあさん。',
    'こんにちは。',
    'お母さんとお父さん。',
    '今日の朝食はパンです。',
    'さしすせそ。',
    'さようなら。',
    '私は日本人です。',
    'おはよう。',
    'あいうえお。',
    'かきくけこ。'
];

var nomalmoji = [
    'あなたの家はどこですか？',
    'このドライヤーはいくらですか？',
    '大学で日本語を勉強します。',
    '日本語テストをします。',
    'このゲームはマルチタスク能力を鍛えるゲームです。',
    'チケットを買うことができますか？',
    '財布を落としてしまいました。',
    '写真を撮ってもいいですか？',
    '私は料理が得意です。',
    'この本はとても面白いです。'
];

var hardmoji = [
    '明日は雨が降るそうです。',
    '大阪に住んでいる友達に会いに行きます。',
    '今日は友達と映画を見に行く予定です。',
    '今日は天気が良くて気分がいいです。',
    '明日は早く起きて掃除をする予定です。',
    'クラシック音楽が大好きです。',
    '日本には世界遺産がたくさんあります。',
    'このレストランの料理は美味しいです。',
    '先生に質問をすると、すぐに答えてくれます。',
    '私たちは一緒に食事をしました。'
];

const colorlist = ['red', 'blue', 'green', 'yellow', 'lightgreen', 'purple', 'black', 'lightskyblue', 'pink', 'gray'];
const colorlistjp = ['赤', '青', '緑', '黄色', '黄緑', '紫', '黒', '水色', 'ピンク色', 'グレー'];

// その他の配列の宣言
var rndnum = [];
var checkTexts = [];
var score = [];
var textLists = [];
var moji = [];

// 最初に実行する
window.onload = () => {

    // マイクを許可させる
    recognition.start();
    setTimeout(function () {
        recognition.stop();
    }, 300)

};

// スタートボタンが押されたら実行する
function start() {

    // radioボタンに応じて問題を挿入する
    if (gameMode[0].checked) {
        for (let i = 0; i < easytextLists.length; i++) {
            textLists[i] = easytextLists[i]
        }
        for (let i = 0; i < easymoji.length; i++) {
            moji[i] = easymoji[i]
        }
    } else if (gameMode[1].checked) {
        for (let i = 0; i < nomaltextLists.length; i++) {
            textLists[i] = nomaltextLists[i]
        }
        for (let i = 0; i < nomalmoji.length; i++) {
            moji[i] = nomalmoji[i]
        }
    } else {
        for (let i = 0; i < hardtextLists.length; i++) {
            textLists[i] = hardtextLists[i]
        }
        for (let i = 0; i < hardmoji.length; i++) {
            moji[i] = hardmoji[i]
        }
    }

    // ランダムの色を取得
    for (let i = 0; i < 4; i++) {
        rndnum[i] = Math.floor(Math.random() * colorlist.length);
    }

    // 配列をシャッフルする
    rndnumafter = _.shuffle(rndnum);

    firstbtn.style.background = colorlist[rndnum[0]];
    secondbtn.style.background = colorlist[rndnum[1]];
    thirdbtn.style.background = colorlist[rndnum[2]];
    fourthbtn.style.background = colorlist[rndnum[3]];

    //colorlistjpの要素にrndnumafterを割り当てる
    colorfirst.innerHTML = colorlistjp[rndnumafter[0]] + "→";
    colorsecond.innerHTML = colorlistjp[rndnumafter[1]] + "→";
    colorthird.innerHTML = colorlistjp[rndnumafter[2]] + "→";
    colorfourth.innerHTML = colorlistjp[rndnumafter[3]];

    // 表示などの切り替えや数値の初期化
    gameStartModal.style.display = 'none';
    question.style.display = 'block';
    NowPoint.style.display = 'block';
    firstbtn.style.display = 'block';
    secondbtn.style.display = 'block';
    thirdbtn.style.display = 'block';
    fourthbtn.style.display = 'block';
    speechtext.style.color = '#666';
    bools = false;
    boolt = false;

    // Firebaseの情報を取得
    window.globalData.ReadFirebase();

    //　秒数カウントスタート 
    startShowing();

    // 録音開始
    recognition.continuous = true;
    recognition.start();

    // タイピング開始
    bool = true;
    createText();

    // 読み上げるテキストをセット
    var mojirnd = Math.floor(Math.random() * moji.length);
    speechtext.innerHTML = moji[mojirnd];
    console.log("width: " + screen.width + "px" + "  height: " + screen.height + "px");
    count = 0;

    // 音が発生したら
    recognition.onresult = (event) => {

        // セットされたテキストと比較
        if (speechtext.innerHTML == event.results[count][0].transcript) {
            // 成功したら
            console.log("成功:  " + event.results[count][0].transcript + "  " + speechtext.innerHTML);

            if (speechtext.style.color == 'rgb(102, 102, 102)') {
                window.global.Points = window.global.Points + 5;
                NowPoint.innerHTML = "現在:" + window.global.Points + "点";
            }

            bools = true;
            speechtext.style.color = 'rgb(95, 158, 160)';
            next();


        } else {
            // 失敗したら
            var speech = speechtext.innerHTML.slice(0, -1);

            if (speech == event.results[count][0].transcript) {
                // 成功したら
                console.log("成功:  " + event.results[count][0].transcript + "  " + speechtext.innerHTML);

                if (speechtext.style.color == 'rgb(102, 102, 102)') {
                    window.global.Points = window.global.Points + 5;
                    NowPoint.innerHTML = "現在:" + window.global.Points + "点";
                }

                bools = true;
                speechtext.style.color = 'rgb(95, 158, 160)';
                next();

            } else {
                console.log("失敗:  " + event.results[count][0].transcript + "  " + speechtext.innerHTML);
            }

        }

        count++;

    }

}

// 押されたボタンごとに実行する
function firstbtns() {
    if (firstbtn.style.background == colorlist[rndnumafter[colorCount]]) {
        firstbtn.style.display = 'none';
        colorCount++;
        window.global.Points = window.global.Points + 1;
        NowPoint.innerHTML = "現在:" + window.global.Points + "点";
        if (colorCount == 4) {
            colorfirst.style.color = 'rgb(95, 158, 160)';
            colorsecond.style.color = 'rgb(95, 158, 160)';
            colorthird.style.color = 'rgb(95, 158, 160)';
            colorfourth.style.color = 'rgb(95, 158, 160)';
            next();
        }
    }
}

function secondbtns() {
    if (secondbtn.style.background == colorlist[rndnumafter[colorCount]]) {
        secondbtn.style.display = 'none';
        colorCount++;
        window.global.Points = window.global.Points + 1;
        NowPoint.innerHTML = "現在:" + window.global.Points + "点";
        if (colorCount == 4) {
            colorfirst.style.color = 'rgb(95, 158, 160)';
            colorsecond.style.color = 'rgb(95, 158, 160)';
            colorthird.style.color = 'rgb(95, 158, 160)';
            colorfourth.style.color = 'rgb(95, 158, 160)';
            next();
        }
    }
}

function thirdbtns() {
    if (thirdbtn.style.background == colorlist[rndnumafter[colorCount]]) {
        thirdbtn.style.display = 'none';
        colorCount++;
        window.global.Points = window.global.Points + 1;
        NowPoint.innerHTML = "現在:" + window.global.Points + "点";
        if (colorCount == 4) {
            colorfirst.style.color = 'rgb(95, 158, 160)';
            colorsecond.style.color = 'rgb(95, 158, 160)';
            colorthird.style.color = 'rgb(95, 158, 160)';
            colorfourth.style.color = 'rgb(95, 158, 160)';
            next();
        }
    }
}

function fourthbtns() {
    if (fourthbtn.style.background == colorlist[rndnumafter[colorCount]]) {
        fourthbtn.style.display = 'none';
        colorCount++;
        window.global.Points = window.global.Points + 1;
        NowPoint.innerHTML = "現在:" + window.global.Points + "点";
        if (colorCount == 4) {
            colorfirst.style.color = 'rgb(95, 158, 160)';
            colorsecond.style.color = 'rgb(95, 158, 160)';
            colorthird.style.color = 'rgb(95, 158, 160)';
            colorfourth.style.color = 'rgb(95, 158, 160)';
            next();
        }
    }

}

function showPassage() {

    // 秒数カウントを減らす
    PassSec--;
    TimeRemaining.innerHTML = "残り時間:" + PassSec + "秒";

    // 難易度に応じて配列に代入
    if (PassSec == 5) {
        if (gameMode[0].checked) {
            console.log("easy");
            for (let i = 0; i < 3; i++) {
                window.global.score[i] = window.globalData.easyPoint[i]
            }
        } else if (gameMode[1].checked) {
            console.log("nomal");
            for (let i = 0; i < 3; i++) {
                window.global.score[i] = window.globalData.nomalPoint[i]
            }
        } else {
            console.log("hard");
            for (let i = 0; i < 3; i++) {
                window.global.score[i] = window.globalData.hardPoint[i]
            }
        }

        console.log(window.global.score);
    }

    // カウントが０になったら
    if (PassSec == 0) {
        // 繰り返し処理を止める
        clearInterval(PassageID);
        bool = false;

        // 録音終了
        recognition.stop();

        // 表示の切り替え
        typetext.style.display = 'none';
        question.style.display = 'none';
        firstbtn.style.display = 'none';
        secondbtn.style.display = 'none';
        thirdbtn.style.display = 'none';
        fourthbtn.style.display = 'none';
        end.style.display = 'block';
        console.log("Game終了");

        // Firebaseの更新処理
        if (window.global.score[0] < window.global.Points) {
            window.globalData.FirstSetFirebase();
        } else if (window.global.score[1] < window.global.Points) {
            window.globalData.SecondSetFirebase();
        } else if (window.global.score[2] < window.global.Points) {
            window.globalData.ThirdSetFirebase();
        }

        // 2秒後に処理したい処理
        setTimeout(function () {
            end.style.display = 'none';
            gameResultModal.style.display = 'block';
            point.innerHTML = window.global.Points + "点";

            // 更新出来たら、表示を変更
            if (window.global.score[0] < window.global.Points) {
                one.style.color = 'red';
                one.innerHTML = window.global.Points + "点!!";
                two.innerHTML = window.global.score[0] + "点";
                three.innerHTML = window.global.score[1] + "点";
            } else if (window.global.score[1] < window.global.Points) {
                two.style.color = 'red';
                one.innerHTML = window.global.score[0] + "点";
                two.innerHTML = window.global.Points + "点!!";
                three.innerHTML = window.global.score[1] + "点";
            } else if (window.global.score[2] < window.global.Points) {
                three.style.color = 'red';
                one.innerHTML = window.global.score[0] + "点";
                two.innerHTML = window.global.score[1] + "点";
                three.innerHTML = window.global.Points + "点!!";
            } else {
                one.innerHTML = window.global.score[0] + "点";
                two.innerHTML = window.global.score[1] + "点";
                three.innerHTML = window.global.score[2] + "点";
            }

            window.global.Points = 0;
            NowPoint.innerHTML = "現在:" + window.global.Points + "点";

        }, 2000)

    }
}

function retry() {

    // リトライするときに初期化する
    gameResultModal.style.display = 'none';
    gameStartModal.style.display = 'block';
    typetext.style.display = 'block';
    window.globalData.easyPoint = [];
    window.globalData.nomalPoint = [];
    window.globalData.hardPoint = [];
    checkTexts = [];
    colorCount = 0;
}


function rules() {

    // 遊び方ボタンの切り替え
    if (boolRule === true) {
        rule.innerHTML = "戻る"
        modalContent.style.display = 'none';
        ruleModalContent.style.display = 'block';
        boolRule = false;
    } else {
        rule.innerHTML = "遊び方";
        modalContent.style.display = 'block';
        ruleModalContent.style.display = 'none';
        boolRule = true;
    }

}

function startShowing() {

    // 秒数を設定
    PassSec = 90;

    // 繰り返し処理スタート
    PassageID = setInterval('showPassage()', 1000);

    // キー入力を受付スタート
    document.addEventListener('keydown', keyDown);

}

function createText() {

    //文字列をランダムに取得する
    var rnd = Math.floor(Math.random() * textLists.length);

    //前の文字列を削除してから次の文字列を表示する
    typetext.textContent = '';
    console.log(textLists[rnd]);

    //文字列を１文字ずつに分解して、それぞれにspanタグを挿入する
    checkTexts = textLists[rnd].split('').map(function (value) {
        var span = document.createElement('span');

        span.textContent = value;

        typetext.appendChild(span);

        return span;
    });

}

function keyDown(e) {

    // 制限時間があるならば
    if (bool == true) {
        try {
            //キーボードからの入力は「e.key」に格納されている
            if (e.key === checkTexts[0].textContent) {

                checkTexts[0].className = 'add-color';

                //0番目の配列要素を削除して、次の1文字を比較対象にする
                checkTexts.shift();

                if (!checkTexts.length && bool === true) {
                    boolt = true;
                    window.global.Points = window.global.Points + 5;
                    NowPoint.innerHTML = "現在:" + window.global.Points + "点";
                    next();
                }
            }
        } catch {
            console.log("もう打ち終わりました");
        }
    }
}

function next() {

    // 全ての項目が達成されていて、かつ制限時間があるならば
    if (!checkTexts.length && bool === true && bools === true && boolt == true && colorCount == 4) {

        // 次の項目をセットする
        window.global.Points = window.global.Points + 2;
        NowPoint.innerHTML = "現在:" + window.global.Points + "点";
        createText();
        var mojirnd = Math.floor(Math.random() * moji.length);
        speechtext.innerHTML = moji[mojirnd];
        speechtext.style.color = '#666';

        colorCount = 0;
        for (let i = 0; i < 4; i++) {
            rndnum[i] = Math.floor(Math.random() * colorlist.length);
        }
        console.log(rndnum);
        rndnumafter = _.shuffle(rndnum);
        console.log(rndnumafter);
        firstbtn.style.background = colorlist[rndnum[0]];
        secondbtn.style.background = colorlist[rndnum[1]];
        thirdbtn.style.background = colorlist[rndnum[2]];
        fourthbtn.style.background = colorlist[rndnum[3]];

        //colorlistjpの要素にrndnumを割り当てる
        colorfirst.innerHTML = colorlistjp[rndnumafter[0]] + "→";
        colorsecond.innerHTML = colorlistjp[rndnumafter[1]] + "→";
        colorthird.innerHTML = colorlistjp[rndnumafter[2]] + "→";
        colorfourth.innerHTML = colorlistjp[rndnumafter[3]];

        colorfirst.style.color = '#666';
        colorsecond.style.color = '#666';
        colorthird.style.color = '#666';
        colorfourth.style.color = '#666';

        firstbtn.style.display = 'block';
        secondbtn.style.display = 'block';
        thirdbtn.style.display = 'block';
        fourthbtn.style.display = 'block';
        bools = false;
        boolt = false;
        // recognition.start();
    }

}

window.global = {};
window.global.Points = points;
window.global.score = score;