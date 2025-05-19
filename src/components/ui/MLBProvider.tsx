import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import type { GamePreviews } from '@/types';
import type { FC, HTMLAttributes } from 'react';
import { getLocalDate } from '@/utils/date';

interface State {
  startHere: boolean | null;
  date: string;
  gamePreviews: GamePreviews | undefined;
}

interface StateWithActions extends State {
  setStartHere: (startHere: boolean) => void;
  setDate: (date: string) => void;
  setGamePreviews: (gamePreviews: GamePreviews | undefined) => void;
}

type Action =
  | {
      type: 'SET_START_HERE';
      startHere: boolean;
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
  startHere: null,
  date: getLocalDate(),
  gamePreviews: undefined,
};

export const MLBContext = createContext<State | StateWithActions>(initialState);

MLBContext.displayName = 'MLBContext';

function mlbReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_START_HERE': {
      return {
        ...state,
        startHere: action.startHere,
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

  const setStartHere = useCallback(
    (startHere: boolean) => dispatch({ type: 'SET_START_HERE', startHere }),
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
      setStartHere,
      setDate,
    }),
    [state, setGamePreviews, setStartHere, setDate],
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
