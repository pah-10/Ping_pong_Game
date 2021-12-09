// Bola
let bolValorX = 300;
let bolValorY = 200;
let bolDiametro = 20;
let bolRaio = bolDiametro/2;

let bolVelocidadeX = 5;
let bolVelocidadeY = 5;

// Raquete
let raqtValorX = 3;
let raqtValorY = 150;
let raqtLargura = 10
let raqtAltura = 100;

// Openente
let opoValorX = 587;
let opoValorY = 150;

let opoVelocidadeX = 5;
let opoVelocidadeY = 5;

//placar
let colidiu = false;
let ponto = 0;
let opoPonto = 0;

//sons
let requetada;
let pontos;
let trilha;


function preload(){
  trilha = loadSound("trilha.mp3")
  pontos = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0, 102, 102);
  
  let a = color(255, 255, 255);
  let b = color(0, 0, 255);
  let c = color(255, 0, 0);
  
  //bola
  fill(a);
  desenhaBol();
  moveBol();
  evitaBordas();

  //raquete
  fill(b);
  desenhaRaqt(raqtValorX, raqtValorY);
  moveRaqt();
  verificaColisaoLib(raqtValorX, raqtValorY);
  
  //oponente
  fill(c);
  desenhaRaqt(opoValorX, opoValorY);
  moveOpo();
  verificaColisaoLib(opoValorX, opoValorY);
  
  //placar
  desenhaPlacar();
  marcador();
}

function desenhaBol(){
  circle(bolValorX, bolValorY, bolDiametro);
}

function moveBol(){
  //faz a bolinha se mover no eixo x e y
  bolValorX += bolVelocidadeX;
  bolValorY += bolVelocidadeY;
}

function evitaBordas(){
  //faz o reconhecimento das bordas e evita que a bola passe por elas
  if((bolValorX + bolRaio) > width || (bolValorX - bolRaio) < 0){
    bolVelocidadeX *= -1;
  } else if((bolValorY + bolRaio) > height || (bolValorY - bolRaio) < 0){
    bolVelocidadeY *= -1;
  }
}

function desenhaRaqt(x, y){
  rect(x, y, raqtLargura, raqtAltura);
}

function moveRaqt(){
  if(keyIsDown(UP_ARROW)){
     raqtValorY -= 10;
  } else if(keyIsDown(DOWN_ARROW)){
     raqtValorY += 10;
  }
}

function verificaColisao(){
  if(bolValorX - bolRaio < raqtValorX + raqtLargura && bolValorY - bolRaio < raqtValorY + raqtAltura && bolValorY + bolRaio > raqtValorY){
    bolVelocidadeX *= -1;
    raquetada.play();
  }
}

function verificaColisaoLib(x, y){
  colidiu = collideRectCircle(x, y,raqtLargura,raqtAltura,bolValorX, bolValorY,bolRaio);
  
  if(colidiu){
    bolVelocidadeX *= -1;
    raquetada.play();
  }
}

function moveOpo(){
  opoVelocidadeY = bolValorY - opoValorY - raqtLargura/2 - 30;
  opoValorY += opoVelocidadeY;
}

function desenhaPlacar(){
  fill(255, 255, 0)
  textSize(20)
  text(ponto, 250, 27)
  text('X', 300, 27)
  text(opoPonto, 350, 27)
}

function marcador(){
  if(bolValorX > 590){
    ponto += 1;
    pontos.play();
  }else if(bolValorX < 10){
    opoPonto += 1;
    pontos.play();
  }
}