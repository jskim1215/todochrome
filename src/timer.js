const timer = document.querySelector("h3#timer");
const startButton = document.querySelector("#start-timer");
const resetButton = document.querySelector("#reset-timer");
const pauseButton = document.querySelector("#pause-timer");
const totalTimeAddButtonInTimer = document.querySelector("#timeadd-button");
const timeForm = document.querySelector("#totaltime-submit")
const targetItem_ToAddTime = document.querySelector("#subject-select");
const timeData = document.querySelector("#timer");

// timer 부터 시작하면 됨
let startTime = 0;
let endTime = 0;
let select_SubjectId = 0;

let toDos_InTimer = []; // 여기서 매번 초기화를 시키기 때문에 아래에서 다시 데이터를 받아와야함!!

const INSTANT_SUBJECTID = "instantSubjectId"
const TODOS_KEY_TIMEEDIT = "todos";


function startTimer() {
    startButton.disabled = true;
    totalTimeAddButtonInTimer.disabled = true;
    resetButton.disabled = true;
    if (!startTime) {
        startTime = Date.now() // 처음 시작할 때
    }
    else {
        startTime += (Date.now() - endTime) // 재시작할 때
    }
    continueTimer = setInterval(function () {
        let nowTime = Math.floor((Date.now() - startTime) / 1000);
        timer.innerText = secondsToHhMmSs(nowTime);
    }, 1000)
}

function pauseTimer() {
    startButton.disabled = false;
    totalTimeAddButtonInTimer.disabled = false;
    resetButton.disabled = false;
    if (continueTimer) {
        clearInterval(continueTimer)
        endTime = Date.now() // STOP시점의 시간 저장
    }
}

function resetTimer() {
    startButton.disabled = false;
    totalTimeAddButtonInTimer.disabled = false;
    timer.innerText = "00:00:00";
    startTime = 0;
}

function totalUsageTimeEdit(event) {
    event.preventDefault();
    const targetSubjectId = localStorage.getItem(INSTANT_SUBJECTID);
    const targetSubjectId_toInteger = parseInt(targetSubjectId);
    const thisTotalUsageTime = totalUsageTimeToSeconds(timeData.innerText);
    const toDoData = localStorage.getItem(TODOS_KEY_TIMEEDIT);
    const parsedToDos = JSON.parse(toDoData);
    toDos_InTimer=parsedToDos;
    parsedToDos.forEach(function (obj) {
        if (obj.id === targetSubjectId_toInteger) {
            const beforeEditTime = totalUsageTimeToSeconds(obj.total_usage_time);
            const nowEditTime = totalUsageTimeToSeconds(timeData.innerText);
            const totalEditTime = beforeEditTime + nowEditTime;
            const calculateTotalEditTime = secondsToHhMmSs(totalEditTime);
            obj.total_usage_time = calculateTotalEditTime;
        }
    });
    localStorage.setItem(TODOS_KEY_TIMEEDIT, JSON.stringify(parsedToDos));
    timer.innerText = "00:00:00";
    startTime = 0;
    //  테이블에 다시 그리기
}

function totalUsageTimeToSeconds(timeData) {
    let timeArray = timeData.split(":");
    const hh = parseInt(timeArray[0]);
    const mm = parseInt(timeArray[1]);
    const ss = parseInt(timeArray[2]);
    let usageTime_toSeconds = 0;
    usageTime_toSeconds = hh * 3600 + mm * 60 + ss;
    return usageTime_toSeconds;
}

function secondsToHhMmSs(inputTime) {
    let hours = String(Math.floor(inputTime / 3600)).padStart(2, "0");
    let minutes = String(Math.floor((inputTime - 3600 * hours) / 60)).padStart(2, "0");
    let seconds = String(inputTime-3600*hours-60*minutes).padStart(2, "0");
    const HhMmSs = hours + ":" + minutes + ":" + seconds;
    return HhMmSs;
}

function saveTargetSubjectId_ToAddTime() {
    const selectSubjectId = targetItem_ToAddTime.options[targetItem_ToAddTime.selectedIndex].id;
    select_SubjectId = selectSubjectId;
    localStorage.setItem(INSTANT_SUBJECTID, select_SubjectId);
}


startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
timeForm.addEventListener("submit", totalUsageTimeEdit);
targetItem_ToAddTime.addEventListener("change", saveTargetSubjectId_ToAddTime);