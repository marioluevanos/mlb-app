import { isWinner } from "@/utils/isWinner";
import { useEffect } from "react";

export function useLiveGame() {
  useEffect(() => {
    //
  }, []);

  return {
    winner: isWinner({}, {}),
  };
}
