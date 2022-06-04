// Path Following
// Vehicle class

class Vehicle {
  // Konstruktor menginisialisasi semua nilai
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxspeed, 0);
  }

  // Sebuah fungsi untuk menangani jalur mengikuti dan pemisahan
  applyBehaviors(vehicles, path) {
    // Ikuti kekuatan jalan
    let f = this.follow(path);
    // Terpisah dari kekuatan boids lainnya
    let s = this.separate(vehicles);
    // Pembobotan sewenang-wenang
    f.mult(3);
    s.mult(1);
    // Akumulasi dalam akselerasi
    this.applyForce(f);
    this.applyForce(s);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Fungsi "lari" utama
  run() {
    this.update();
    this.render();
  }

  // Fungsi ini mengimplementasikan algoritma mengikuti jalur Craig Reynolds
  follow(path) {
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    let predictpos = p5.Vector.add(this.position, predict);

  //kita harus menemukan jalur normal ke jalur dari posisi yang diprediksi 
    let normal = null;
    let target = null;
    let worldRecord = 1000000; // Start with a very high worldRecord distance that can easily be beaten

    // Loop melalui semua titik jalan
    for (let i = 0; i < path.points.length; i++) {
      // Lihatlah segmen garis
      let a = path.points[i];
      let b = path.points[(i + 1) % path.points.length]; // Jalur harus sampul
      let normalPoint = getNormalPoint(predictpos, a, b);
      let dir = p5.Vector.sub(b, a);
      // Jika tidak berada di dalam ruas garis, anggaplah normal sebagai ujung ruas garis saja (titik b)
      //if (da + db > line.mag()+1) {
      if (
        normalPoint.x < min(a.x, b.x) ||
        normalPoint.x > max(a.x, b.x) ||
        normalPoint.y < min(a.y, b.y) ||
        normalPoint.y > max(a.y, b.y)
      ) {
        normalPoint = b.copy();
        a = path.points[(i + 1) % path.points.length];
        b = path.points[(i + 2) % path.points.length]; //Jalan melingkari
        dir = p5.Vector.sub(b, a);
      }

      let d = p5.Vector.dist(predictpos, normalPoint);
      if (d < worldRecord) {
        worldRecord = d;
        normal = normalPoint;

        dir.normalize();
        dir.mult(25);
        target = normal.copy();
        target.add(dir);
      }
    }

    // Gambarkan hal-hal debug
    if (debug) {
      // Gambar prediksi posisi masa depan
      stroke(0);
      fill(0);
      line(this.position.x, this.position.y, predictpos.x, predictpos.y);
      ellipse(predictpos.x, predictpos.y, 4, 4);

      // Gambar posisi normal
      stroke(0);
      fill(0);
      ellipse(normal.x, normal.y, 4, 4);
      // Gambar target sebenarnya (merah jika mengarahkan ke arahnya)
      line(predictpos.x, predictpos.y, target.x, target.y);
      if (worldRecord > path.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }


    if (worldRecord > path.radius) {
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  // pemisah
  // Metode memeriksa boids terdekat dan menjauh
  separate(boids) {
    let desiredseparation = this.r * 2;
    let steer = createVector(0, 0, 0);
    let count = 0;
    // Untuk setiap boid dalam sistem, periksa apakah terlalu dekat
    for (let i = 0; i < boids.length; i++) {
      let other = boids[i];
      let d = p5.Vector.dist(this.position, other.position);
      if (d > 0 && d < desiredseparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Method to update position
  update() {
    // Perbarui Kecepatan
    this.velocity.add(this.acceleration);
    // Batasi kecepatan
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Setel ulang akselerasi ke 0 setiap siklus
    this.acceleration.mult(0);
  }

  // KEMUDI = KECEPATAN MINUS YANG DIINGINKAN
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // Sebuah vektor menunjuk dari posisi ke target
    
    // Normalisasikan yang diinginkan dan skala ke kecepatan maksimum
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }

  render() {
    fill(75);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}

function getNormalPoint(p, a, b) {
  // Vektor dari a ke p
  let ap = p5.Vector.sub(p, a);
  // Vektor dari a ke b
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); 
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}
