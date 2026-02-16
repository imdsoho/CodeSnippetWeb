$(window).on('load', function() {

    $("#btnStart").on("click", function (){
        start();
    });

    $("#btnUpdate").on("click", function (){
        update();
    });

    $("#btnStop").on("click", function (){
        stop();
    });

});

let gEngineGrade = 0;

function start() {
    startCount();
}

function stop() {
    stopCount();
}

function startCount(){
    tCounter('#tCount', 0, 5, 3000, 'UP');
}
function stopCount(){
    tCounter('#tCount', 5, 0, 2000, 'DOWN');
}
function tCounter(selector, start, end, duration, ud) {
    const counterEl = document.querySelector(selector);

    const totalCount = end - start; // 증가해야 할 숫자의 범위
    const interval = 50; // 숫자가 변경될 간격 (밀리초 단위)
    const steps = Math.floor(duration / interval); // 전체 애니메이션 진행 횟수
    let currentStep = 0; // 현재 진행 중인 스텝 수

    // 선택한 모든 요소에 대해 카운팅 애니메이션 실행
    const counter = setInterval(function() {
        currentStep++;
        const currentCount = start + Math.round(totalCount * (currentStep / steps));

        counterEl.innerHTML = currentCount.toLocaleString();
        gEngineGrade = currentCount.toLocaleString();

        stepColor(gEngineGrade, ud);

        if (currentStep >= steps) {
            clearInterval(counter);
        }
    }, interval);

    function stepColor(grade, ud) {
        if(ud === "UP"){
            if (grade === '0') $("#step-0").addClass("bg-body-tertiary");
            if (grade === '1') $("#step-1").addClass("bg-dark-subtle");
            if (grade === '2') $("#step-2").addClass("bg-info-subtle");
            if (grade === '3') $("#step-3").addClass("bg-primary-subtle");
            if (grade === '4') $("#step-4").addClass("bg-success-subtle");
            if (grade === '5') $("#step-5").addClass("bg-warning");
        }
        else {
            if (grade === '5') $("#step-5").removeClass("bg-warning");
            if (grade === '4') $("#step-4").removeClass("bg-success-subtle");
            if (grade === '3') $("#step-3").removeClass("bg-primary-subtle");
            if (grade === '2') $("#step-2").removeClass("bg-info-subtle");
            if (grade === '1') $("#step-1").removeClass("bg-dark-subtle");
            if (grade === '0') $("#step-0").removeClass("bg-body-tertiary");
        }
    }
}