const segments = ["Emerald", "Ruby", "Diamond", "Tanzanite", "Pezzottaire", "Tourmaline"];
const wheel = document.getElementById("wheel");
const resultText = document.getElementById("result");

let currentRotation = 0;

function spinWheel(targetIndex, callback) {
    const segmentAngle = 360 / segments.length;
    const extraSpins = 5;
    const targetAngle = targetIndex * segmentAngle;
    const rotateTo = 360 * extraSpins - targetAngle;

    currentRotation += rotateTo;
    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        callback();
    }, 3000);
}

document.getElementById("birthForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const birthdate = document.getElementById("birthdate").value;
    if (!birthdate) return;

    const seed = new Date(birthdate).getDate();
    const index = seed % segments.length;
    const chosen = segments[index];

    resultText.innerText = "";

    spinWheel(index);
    setTimeout(() => {
        resultText.innerText = `Your gem is: ${segments[index]}`;
    }, 3000);
});
