class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.bets = {}; // To store bets by round
  }

  update_score(x) {
    this.score += x;
  }

  set_score(x) {
    this.score = x;
  }

  placeBet(round, bet) {
    this.bets[round] = bet;
  }

  getBet(round) {
    return this.bets[round] || 0;
  }
}

class Game {
  constructor() {
    this.players = [];
    this.round = -1;
    this.last_round = 12;
    this.max_player_count = 8;
    this.id = 0;
    this.rounds = [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1];
    this.itr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  addPlayer(playerName) {
    if (this.players.length >= this.max_player_count) {
      return { success: false, message: "Only 8 players allowed!" };
    } else if (this.players.some(player => player.name === playerName)) {
      return { success: false, message: "Player already exists, please use a different name!" };
    } else {
      this.players.push(new Player(this.id, playerName));
      this.id++;
      return { success: true, message: "Player added successfully." };
    }
  }

  removePlayer(playerName) {
    this.players = this.players.filter(player => player.name !== playerName);
  }

  placeBet(playerId, bet) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.placeBet(this.round, bet);
    }
  }

  updateScore(playerId, won) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      const bet = player.getBet(this.round);
      if (won) {
        player.update_score(10 + bet);
      }
    }
  }

  nextRound() {
    this.round++;
    return this.round < this.last_round;
  }

  currentRound() {
    return this.itr[this.round];
  }

  roundLabel() {
    return this.rounds[this.round];
  }

  restart() {
    this.round = -1;
    game.players.forEach(player => {
      player.score = 0;
  });

  }
}
