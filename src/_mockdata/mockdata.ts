import { mapToGame } from "@/utils/mapToGame";
import RAW_FINAL from "./RAW-FINAL.json";
import RAW_XINN from "./RAW-XINN.json";
import RAW_1ST from "./RAW-1ST.json";
import { MLBLive } from "@/types.mlb";

export const GAME_FINAL = mapToGame({}, RAW_FINAL as unknown as MLBLive);
export const GAME_XINN = mapToGame({}, RAW_XINN as unknown as MLBLive);
export const GAME_1ST = mapToGame({}, RAW_1ST as unknown as MLBLive);
