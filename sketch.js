let cnv;
let p, saveB;
let sliderSides;
let sliderTimes;
let timesFactor, sides;
let intensity = 360;


function setup() {
    cnv = createCanvas(720, 720);
    sliderSides = createSlider(3, 10,2,0.01);
    sliderTimes = createSlider(2, 10,2,0.01);
    sliderTimes.elt.classList.add('vert');
    sliderSides.elt.classList.add('horz');
    saveB = createButton("Save");
    saveB.elt.classList.add('savebttn');
}

function draw() {
    background(235,236,244);
    stroke(240,128,128);
    noFill();
    timesFactor = sliderTimes.value();
    sides = sliderSides.value();
    p = createPoly(width / 2, height / 2, 300, sides);
    plotPoints(sides);
    saveB.mousePressed(download);
}

function createPoly(x, y, r, s) {
    let points = [];
    beginShape();
    for (let i = 0; i < s; i++) {
        let dx = x + cos(i * TAU / s + PI) * r;
        let dy = y + sin(i * TAU / s + PI) * r;
        vertex(dx, dy);
        points.push(createVector(dx, dy));
    }
    endShape(CLOSE);
    return points;
}

function plotPoints(sides) {
    let allpoints = [];
    for (let i = 0; i < p.length; i++) {
        let p1 = p[i];
        let p2 = p[(i + 1) % p.length];
        let factor = intensity / sides;
        for (let i = 0; i < int(factor); i++) {
            let p3 = p5.Vector.lerp(p1, p2, map(i, 0, int(factor), 0.0, 1.0));
            allpoints.push(p3);
        }
    }
    connectDots(allpoints);
}

function connectDots(allpoints) {
    push();
    strokeWeight(5);
    stroke("white");
    for (let i = 0; i < allpoints.length; i++) {
        let a = allpoints[i];
        let b = allpoints[int(i*timesFactor) % allpoints.length];
        push();
        strokeWeight(3);
        stroke(240,128,128);
        point(a.x, a.y);
        pop();
        push();
        strokeWeight(1);
        stroke(240,128,128);
        line(a.x, a.y, b.x, b.y);
        pop();

    }
    pop();
}

function download(){
    save(cnv, 'myCardioid.jpg');
}