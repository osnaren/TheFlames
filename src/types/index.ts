// Common component prop types
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

// Flames application specific types
export interface FlamesResult {
  status: string;
  match?: string;
  relationship?: string;
  percentage?: number;
}

// User types
export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark';
  soundEnabled?: boolean;
  animationsEnabled?: boolean;
}

// Game related types
export interface GameState {
  isPlaying: boolean;
  currentLevel?: number;
  score?: number;
}

// Redux state types
export interface RootState {
  app: AppState;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  user: UserProfile | null;
  game: GameState;
}
