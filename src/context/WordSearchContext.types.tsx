type GameState = 'idle' | 'collecting' | 'answering'

export type WordSearchContextType = {
  gameState: GameState;
  collectedLetters: string[];
}

export type GameStateAction = { type: 'setGameState'; payload: GameState; }
export type CollectingAction = { type: 'setCollectedLetter'; payload: string; }

export type WordSearchActions = CollectingAction | GameStateAction;
