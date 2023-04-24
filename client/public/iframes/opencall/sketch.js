let fields = [];

let font;

function preload() {
    font = loadFont("dogicabold.ttf");
}

function setup() {
    createCanvas(500, 500, WEBGL);

    for (let i = 0; i < 5; i++) {
        fields.push(new Field());
        fields.push(new Field());
        fields.push(new Field());
    }

    textFont(font);
}

function draw() {
    background(0);

    translate(-width / 2, -height / 2);

    for (const field of fields) {
        field.display();
        field.update();
    }

    push();
    translate(width / 2, height / 2, 10);
    rotateX(map(mouseX, 0, width, -PI / 3, PI / 3));
    translate(-width / 2, -height / 2);
    displayTitle(40, 100);
    displayOpenCall(185, 420);

    displayOutlineRect(40);

    pop();
}

function displayOutlineRect(bW) {
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(bW, bW, width - bW * 2, height - bW * 2);
}

function displayTitle(x, y) {
    let sp = 90;
    push();
    translate(x, y);

    let sz = 70;
    let borderW = 10;
    let txtC = color(255, 0, 255);
    let boxC = color(255, 200);
    displayTextBox("FIELDS", 0, 0, borderW, sz, boxC, txtC);
    displayTextBox("OF", 0, sp, borderW, sz, boxC, txtC);
    displayTextBox("VIEW", 0, 2 * sp, borderW, sz, boxC, txtC);
    pop();
}

function displayOpenCall(x, y) {
    push();
    translate(x, y);
    let sz = 30;
    let borderW = 10;
    let txtC = color(255);
    let boxC = color(0, 0);
    displayTextBox("OPEN CALL", 0, 0, borderW, sz, boxC, txtC);
    pop();
}

function displayTextBox(txt, x, y, borderW, sz, boxC, txtC) {
    push();
    translate(x, y);
    textSize(sz);
    let w = textWidth(txt);
    noStroke();
    fill(boxC);
    rect(0, 0, w - 20 + borderW * 2, sz - 10 + borderW * 2);
    fill(txtC);
    translate(0, 0, .1);
    text(txt, -10 + borderW, sz - 10 + borderW);
    pop();
}
