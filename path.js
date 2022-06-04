class Path {
  constructor() {
    // Radius sewenang-wenang 20
    // Sebuah jalan memiliki jari-jari, yaitu seberapa jauh boleh bagi boid untuk mengembara
    this.radius = 20;
    // Path adalah daftar titik-titik (objek PVector)
    this.points = [];
  }

  // Tambahkan titik ke jalur
  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }

  // Gambarkan jalan
  display() {
    strokeJoin(ROUND);

    // Gambar garis tebal untuk radius
    stroke(175);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    // Gambar garis tipis untuk pusat jalan
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
