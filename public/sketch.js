var socket;
var enemies = [];
var x;
var y;
var dx;
var dy;
var ex;
var ey;
var points = 0;
var aantalenemies = 2;

function setup() {
  createCanvas(innerWidth - 50, innerHeight - 70);
  x = random(20, innerWidth - 70);
  y = random(20, innerHeight - 90);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('pos',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle

      ex = data.x;
      ey = data.y;

      dx = data.x - x;
      dy = data.y - y;
      if (sqrt(dx*dx + dy*dy) <= 20){
        x = random(20, innerWidth - 70);
        y = random(20, innerHeight - 90);
        points++;
      }
    }
  );
  for (var i = 0; i < aantalenemies; i++) {
        enemy = new Enemyobject(ex, ey);
        enemies.push(enemy);
    }
}

function draw() {
  background(255);

  textSize(12);
  fill(80, 80, 150);
  text("ENEMY", ex - 21, ey - 20);
  fill(180, 20, 20);
  text("YOU", x - 13, y - 20);

if (x < 0){
  points--;
}

if (y < 0){
  points--;
}

if (x > innerWidth - 70){
  points--;
}

if (y > innerHeight - 90){
  points--;
}

if (points < 0){
  points = 0;
}

if (points < 5){
    textSize(70);
    fill(0);
    text(points, 50, 80);
  } else {
    textSize(70);
    fill(0);
    text("WIN", 50, 80);
  }


  /*fill(80, 80, 150);
  noStroke();
  ellipse(ex, ey, 20, 20);*/

  for (var i = 0; i < aantalenemies; i++) {
        enemies1 = enemies[i];
        enemies1.teken();
    }

  fill(180, 20, 20);
  noStroke();
  ellipse(x,y,20,20);
  // Send the mouse coordinates
  sendmouse(x,y);

  if (keyIsDown(65)) {
      x -= 2;
      return false;
  } else if (keyIsDown(68)) {
      x += 2;
      return false;
  } else if (keyIsDown(87)) {
      y -= 2;
      return false;
  } else if (keyIsDown(83)) {
      y += 2;
      return false;
  }
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('pos',data);
}


function Enemyobject(ex, ey) {
    this.xPos = ex;
    this.yPos = ey;

    this.teken = function() {
      fill(180, 20, 20);
      noStroke();
      ellipse(ex,ey,20,20);
    }
}
