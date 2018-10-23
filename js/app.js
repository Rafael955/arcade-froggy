// Inimigos que nosso jogador deve evitar
var Enemy = function(x, y, speed) {
  // As variáveis aplicadas a nossas instâncias entram aqui.
  // Fornecemos uma a você para que possa começcar.

  // A imagem/sprite de nossos inimigos, isso usa um
  // ajudante que é fornecido para carregar imagens
  // com facilidade.
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.isAdjusted = false;
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
  // Você deve multiplicar qualquer movimento pelo parâmetro
  // dt, o que garantirá que o jogo rode na mesma velocidade
  // em qualquer computador.
  this.checkCollision();
  this.adjustSpeed();

  this.x = this.x + this.speed;

  // retorna o inimigo para o inicio do cenário.
  if (this.x > 404) {
    this.x = -10;
  }
};

// Ajusta a velocidade dos inimigos com o parâmetro delta
Enemy.prototype.adjustSpeed = function() {
  if (!this.adjustSpeed) {
    this.speed = this.speed - this.speed * dt;
    this.isAdjusted = true;
  }
};

Enemy.prototype.checkCollision = function() {
  allEnemies.forEach(function(enemy) {
    // Verifica se o inimigo e o jogaro estão na mesma posição no eixo y
    if (enemy.y === player.y) {
      // Verifica se o inimigo e o jogador estão na mesma posição no eixo x com margem de erro de 10 px.
      for (let i = 0; i < 10; i++) {
        if (
          enemy.x === player.x ||
          enemy.x === player.x - i ||
          enemy.x === player.x + i
        ) {
          player.update();
        }
      }
    }
  });
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(),
// um render() e um handleInput().

var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 202;
  this.y = 382.5;
  this.score = {
    points: 0,
    position: {
      x: this.x,
      y: this.y
    }
  };
};

Player.prototype.update = function() {
  this.x = 202;
  this.y = 382.5;
};

Player.prototype.handleInput = function(key) {
  if (key == "left" && this.x >= 0) {
    this.x -= 101;
  }

  if (key == "right" && this.x <= 404) {
    this.x = this.x + 101;
  }

  if (key == "up" && this.y > 0) {
    this.y -= 85;
  }

  if (key == "down" && this.y < 382.5) {
    this.y += 85;
  }

  if (this.y <= 212.5) {
    // impede que o jogador circule pelo cenário
    // na área dos inimigos.
    if (this.x > 404) {
      this.x = 404;
    }

    if (this.x < 0) {
      this.x = 0;
    }
  } else {
    // faz o jogador poder circular em volta do cenário
    //na parte da grama.
    if (this.x > 404) {
      this.x = 0;
    }

    if (this.x < 0) {
      this.x = 404;
    }
  }

  // Checa se personagem chegou na água.
  if (this.y === -42.5) {
    this.score.position.x = this.x;
    this.score.position.y = this.y;
    setTimeout(() => {
      alert("You win!");
      this.x = 202;
      this.y = 382.5;
    }, 50);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

let allEnemies = [];

allEnemies.push(new Enemy(-10, 212.5, Math.floor(Math.random() * 8) + 2));
allEnemies.push(new Enemy(-10, 127.5, Math.floor(Math.random() * 8) + 2));
allEnemies.push(new Enemy(-10, 42.5, Math.floor(Math.random() * 8) + 2));
allEnemies.push(new Enemy(-10, 212.5, Math.floor(Math.random() * 8) + 2));
allEnemies.push(new Enemy(-10, 127.5, Math.floor(Math.random() * 8) + 2));
allEnemies.push(new Enemy(-10, 42.5, Math.floor(Math.random() * 8) + 2));

let player = new Player();

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
