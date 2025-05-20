import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import type { GamePreviews, GameToday } from '@/types';
import type { FC, HTMLAttributes } from 'react';
import { getLocalDate } from '@/utils/date';

interface State {
  date: string;
  gamePreviews: GamePreviews | undefined;
  liveGame: GameToday | undefined;
}

interface StateWithActions extends State {
  setLiveGame: (liveGame: GameToday | undefined) => void;
  setDate: (date: string) => void;
  setGamePreviews: (gamePreviews: GamePreviews | undefined) => void;
}

type Action =
  | {
      type: 'SET_LIVE_GAME';
      liveGame: GameToday;
    }
  | {
      type: 'SET_DATE';
      date: string;
    }
  | {
      type: 'SET_GAME_PREVIEWS';
      gamePreviews: GamePreviews;
    };

const initialState: State = {
  liveGame: undefined,
  date: getLocalDate(),
  gamePreviews: undefined,
};

export const MLBContext = createContext<State | StateWithActions>(initialState);

MLBContext.displayName = 'MLBContext';

function mlbReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_LIVE_GAME': {
      return {
        ...state,
        liveGame: action.liveGame,
      };
    }
    case 'SET_DATE': {
      return {
        ...state,
        date: action.date,
      };
    }
    case 'SET_GAME_PREVIEWS': {
      return {
        ...state,
        gamePreviews: action.gamePreviews,
      };
    }
  }
}

export const MLBProvider: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const [state, dispatch] = useReducer(mlbReducer, initialState);

  const setLiveGame = useCallback(
    (liveGame: GameToday) => dispatch({ type: 'SET_LIVE_GAME', liveGame }),
    [dispatch],
  );

  const setDate = useCallback(
    (date: string) => dispatch({ type: 'SET_DATE', date }),
    [dispatch],
  );

  const setGamePreviews = useCallback(
    (gamePreviews: GamePreviews) =>
      dispatch({ type: 'SET_GAME_PREVIEWS', gamePreviews }),
    [dispatch],
  );

  const value = useMemo(
    () => ({
      ...state,
      setGamePreviews,
      setLiveGame,
      setDate,
    }),
    [state, setGamePreviews, setLiveGame, setDate],
  );

  return <MLBContext.Provider value={value} {...props} />;
};

export const useMLB = () => {
  const context = React.useContext(MLBContext);
  if (context === undefined) {
    throw new Error(`useMLB must be used within a MLBContext`);
  }
  return context as StateWithActions;
};
