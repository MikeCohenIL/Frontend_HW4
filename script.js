
let lottoArr=new Array();
let resultArr= new Array();
let selectcounter=6;
let strongNum=null;
let strongSelect=false;
let randomStrongNum=null;
let balance=1000;
let GuessCount=0;
let strongGuess=false;
let numBtn=document.getElementsByTagName("button");


function selectNum(btn) {
if(btn.style.backgroundColor=="" && selectcounter>0){
    btn.style.backgroundColor="gray";
    lottoArr.push(parseInt(btn.textContent));
    console.log(lottoArr);
    selectcounter--;
    document.getElementById("numCount").textContent=selectcounter;

}
   else if(btn.style.backgroundColor=="gray"){
        btn.removeAttribute('style');
        index=lottoArr.indexOf(parseInt(btn.textContent));
    lottoArr.splice(index, 1);
    console.log(lottoArr)
    selectcounter++;
    document.getElementById("numCount").textContent=selectcounter;
    }

}
function selectPwrNum(btn){
    if(btn.style.backgroundColor=="" &&strongSelect==false){
        btn.style.backgroundColor="gray";
        strongNum=parseInt(btn.textContent);
        strongSelect=true;
        console.log(strongNum);
    }
    else if(btn.style.backgroundColor=="gray"){
        btn.removeAttribute('style');
        strongSelect=false;
        strongNum=null;

    }
}
function submit(){
    if(balance<300){
        alert("insufficient funds min bet 300$")
        return;
    }
    else{

        if(lottoArr.length==6 && strongNum!=null){

            balance=balance-300;
            randomLotto();
            calcAward();
            if(GuessCount==6 && strongGuess==true) balance=balance+1000;
            else if(GuessCount==6 && strongGuess==false) balance=balance+600;
            else if(GuessCount==4 && strongGuess==true) balance=balance+400;
            document.getElementById("balance").innerHTML = `${balance}`;

            document.getElementById("result").innerHTML = `
    <div class="result-box">

        <div class="result-section">
            <h2>Your Guess</h2>
            <p class="numbers">${lottoArr}</p>
            <p class="strong">Strong number: ${strongNum}</p>
        </div>

        <div class="spacer"></div>

        <div class="result-section">
            <h2>Actual Result</h2>
            <p class="numbers">${resultArr}</p>
            <p class="strong">Strong number: ${randomStrongNum}</p>
        </div>

        <div class="spacer"></div>

        <div class="result-summary">
            <p>You guessed <strong>${GuessCount}</strong> numbers correctly</p>
            <p>Strong number success: <strong>${strongGuess}</strong></p>
            <p class="balance-line">New balance: <strong>${balance}$</strong></p>
        </div>

    </div>
`;
            reset();
        }
        else{
            alert("Please select all values!")
        }
    }

}
function randomLotto(){
    while(resultArr.length!=6){
        x=Math.floor(Math.random() * 37) + 1;

        if(!resultArr.includes(x)){
            resultArr.push(x);
        }

    }
    randomStrongNum=Math.floor(Math.random() * 7) + 1;
}
function calcAward(){
    for(let i=0; i<6; i++){
        if(resultArr.includes(lottoArr[i])){
            GuessCount++;
        }
    }
    if(strongNum==randomStrongNum){
        strongGuess=true;
    }
}
function reset(){

    for(let i=0; i<numBtn.length;i++){
        numBtn[i].removeAttribute('style');
    }
     lottoArr=new Array();
     resultArr= new Array();
     selectcounter=6;
     strongNum=null;
     strongSelect=false;
     randomStrongNum=null;
     GuessCount=0;
     strongGuess=false;


}
function finish() {

    for(let i=0; i<numBtn.length;i++){
        numBtn[i].disabled = true;
    }
    document.getElementById("result").innerHTML =
        `
        <span>GAME OVER, your Balance is ${balance}</span>
    `

}
