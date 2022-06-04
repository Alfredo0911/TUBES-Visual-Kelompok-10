let debug = false;

// Objek jalur (rangkaian titik-titik yang terhubung)
let path;

// Dua kendaraan
let vehicles = [];

function setup() {
  createCanvas(640, 360);
  // Panggil fungsi untuk menghasilkan objek Path baru
  newPath();

  // Kami sekarang membuat kendaraan acak dan menyimpannya di ArrayList
  for (let i = 0; i < 120; i++) {
    newVehicle(random(width), random(height));
  }
  createP(
    "Hit 'd' to toggle debugging lines.<br/>Click the mouse to generate new vehicles."
  );
}

function draw() {
  background(240);
  
  // pager betis
  rect (160, 260, 20, 75)
  
  // pagar jalan
  rect (20, 260, 460, 20)
  
  // Gedung DPA
  triangle (120, 320, 120, 290, 80, 310)
  
  // Bangunan Kota
  rect (20, 20, 50, 20)
  rect (75, 20, 50, 20)
  rect (50, 50, 20, 20)
  rect (80, 80, 20, 20)
  rect (110, 80, 20, 20)
  rect (20, 50, 20, 20)
  rect (80, 50, 20, 20)
  rect (110, 50, 20, 20)
  rect (20, 80, 20, 20)
  rect (50, 80, 20, 20)
  rect (50, 110, 20, 20)
  rect (20, 110, 20, 20)
  rect (80, 110, 20, 20)
  rect (110, 110, 20, 20)
  rect (20, 140, 20, 20)
  rect (50, 140, 20, 20)
  rect (80, 140, 20, 20)
  rect (110, 140, 20, 20)
  rect (20, 170, 20, 20)
  rect (50, 170, 20, 20)
  rect (80, 170, 20, 20)
  rect (110, 170, 20, 20)
  rect (20, 200, 20, 20)
  rect (50, 200, 20, 20)
  rect (80, 200, 20, 20)
  rect (110, 200, 20, 20)
  rect (20, 230, 20, 20)
  rect (50, 230, 20, 20)
  rect (80, 230, 20, 20)
  rect (110, 230, 20, 20)
  
  rect (550, 80, 30, 20)
  rect (550, 110, 30, 20)
  rect (550, 140, 30, 20)
  rect (550, 170, 30, 20)
  rect (550, 200, 30, 20)
  rect (550, 80, 30, 20)
  rect (550, 50, 30, 20)
  rect (550, 20, 30, 20)
  
  rect (590, 80, 30, 20)
  rect (590, 110, 30, 20)
  rect (590, 140, 30, 20)
  rect (590, 170, 30, 20)
  rect (590, 200, 30, 20)
  rect (590, 80, 30, 20)
  rect (590, 50, 30, 20)
  rect (590, 20, 30, 20)
  
  
  // Menampilkan jalan
  path.display();

  for (let v of vehicles) {
    // Mengikuti dan memisahkan jalur dikerjakan dalam fungsi ini
    v.applyBehaviors(vehicles, path);
    // Panggil metode run generik (pembaruan, batas, tampilan, dll.)
    v.run();
  }
}

function newPath() {
  // Jalur adalah rangkaian titik-titik yang terhubung
  // Jalur yang lebih canggih mungkin berupa kurva
 // Jalur adalah rangkaian titik-titik yang terhubung
  // Jalur yang lebih canggih mungkin berupa kurva
  path = new Path();
  let offset = 30;
  path.addPoint(150, 20);
  path.addPoint(500 , 20);
  path.addPoint(500 , 300);
  path.addPoint(200 , 300);
  path.addPoint(550,  300);
}

function newVehicle(x, y) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  vehicles.push(new Vehicle(x, y, maxspeed, maxforce));
}

function keyPressed() {
  if (key == "d") {
    debug = !debug;
  }
}

function mousePressed() {
  newVehicle(mouseX, mouseY);
}
