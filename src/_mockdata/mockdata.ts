import { mapToLiveGame } from "@/utils/mlb";
import RAW_FINAL from "./RAW-FINAL.json";
import RAW_XINN from "./RAW-XINN.json";
import RAW_1ST from "./RAW-1ST.json";
import { MLBLive } from "@/types.mlb";

export const GAME_FINAL = mapToLiveGame(RAW_FINAL as unknown as MLBLive);
export const GAME_XINN = mapToLiveGame(RAW_XINN as unknown as MLBLive);
export const GAME_1ST = mapToLiveGame(RAW_1ST as unknown as MLBLive);
