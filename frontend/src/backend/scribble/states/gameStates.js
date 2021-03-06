class GameStateFlags {
    constructor() {
        this.lockCanvas = false;
        this.showWordChoices = false;
        this.showPlayerChoosing = false;
        this.showWordToGuess = false;
        this.showLobby = false;
        this.showResults = false;
    }

    forState(state) {
        this.state = state;
        return this;
    }

    lockedCanvas() {
        this.lockCanvas = true;
        return this;
    }

    showingWordChoices() {
        this.showWordChoices = true;
        return this;
    }

    showingPlayerChoosing() {
        this.showPlayerChoosing = true;
        return this;
    }

    showingWordToGuess() {
        this.showWordToGuess = true;
        return this;
    }

    showingLobby() {
        this.showLobby = true;
        return this;
    }

    showingResults() {
        this.showResults = true;
        return this;
    }
}

class GameState {
    constructor(gameStateFlags) {
        if (gameStateFlags.state == null) {
            throw new Error("GameState requires a state parameter");
        }
        this.state = gameStateFlags.state;

        this.lockCanvas = gameStateFlags.lockCanvas;
        this.showWordChoices = gameStateFlags.showWordChoices;
        this.showPlayerChoosing = gameStateFlags.showPlayerChoosing;
        this.showWordToGuess = gameStateFlags.showWordToGuess;
        this.showLobby = gameStateFlags.showLobby;
        this.showResults = gameStateFlags.showResults;
    }
}

export class WaitingInLobby extends GameState {
    static STATE = "WaitingInLobby";
    constructor() {
        super(
            new GameStateFlags()
                .forState(WaitingInLobby.STATE)
                .lockedCanvas()
                .showingLobby()
        );
    }
}

export class ChoosingWord extends GameState {
    static STATE = "ChoosingWord";
    constructor(player, words, duration) {
        super(
            new GameStateFlags()
                .forState(ChoosingWord.STATE)
                .lockedCanvas()
                .showingWordChoices()
                .showingPlayerChoosing()
        );
        this.player = player;
        this.words = words;
        this.duration = duration;
    }
}

export class WaitingForPlayerToChooseWord extends GameState {
    static STATE = "WaitingForPlayerToChooseWord";
    constructor(player, duration) {
        super(
            new GameStateFlags()
                .forState(WaitingForPlayerToChooseWord.STATE)
                .lockedCanvas()
                .showingPlayerChoosing()
        );
        this.player = player;
        this.duration = duration;
    }
}

export class Drawing extends GameState {
    static STATE = "Drawing";
    constructor(word, duration) {
        super(
            new GameStateFlags().forState(Drawing.STATE).showingWordToGuess()
        );
        this.word = word;
        this.duration = duration;
    }
}

export class Guessing extends GameState {
    static STATE = "Guessing";
    constructor(word, duration) {
        super(
            new GameStateFlags()
                .forState(Guessing.STATE)
                .lockedCanvas()
                .showingWordToGuess()
        );
        this.word = word;
        this.duration = duration;
    }
}

export class GameOver extends GameState {
    static STATE = "GameOver";
    constructor() {
        super(
            new GameStateFlags()
                .forState(GameOver.STATE)
                .lockedCanvas()
                .showingResults()
        );
    }
}
