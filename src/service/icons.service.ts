import {
  AudioWaveform,
  Briefcase,
  GalleryVerticalEnd,
  Home,
  LucideIcon,
  Star,
  User,
  Command,
  Settings2,
  SquareTerminal,
  BookOpen,
} from "lucide-react";

export const iconMap = {
  home: Home,
  briefcase: Briefcase,
  user: User,
  star: Star,
  gallery_vertical_end: GalleryVerticalEnd,
  audio_waveform: AudioWaveform,
  command: Command,
  square_terminal: SquareTerminal,
  book_open: BookOpen,
  settings2: Settings2,
};

export type IconName = keyof typeof iconMap;

export const getProjectIcon = (iconName?: string): LucideIcon => {
  return iconMap[iconName as IconName] || iconMap.briefcase;
};
