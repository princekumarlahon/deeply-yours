export type InteractionType = "tap" | "hold" | "drag" | "discovery" | "parallax" | "proposal" | "final";

export interface SceneConfig {
  id: string;
  interaction: InteractionType;
  texts: string[];
  hint?: string;
  background?: "ocean" | "night" | "deep" | "glow" | "clear";
  revealTexts?: string[];
  dragLabel?: string;
}
