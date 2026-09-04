export interface LanternShape {
  id: string;
  nameEn: string;
  nameZh: string;
  iconName: string;
  description: string;
  viewBox: string;
  bodyPath: string;
  capPath?: string;
  bottomPath?: string;
}

export interface LanternColor {
  id: string;
  nameEn: string;
  nameZh: string;
  mainColor: string;
  darkColor: string;
  glowColor: string;
  textColor: string;
  tasselColor: string;
}

export interface LanternPattern {
  id: string;
  nameEn: string;
  nameZh: string;
  patternType: string;
  description: string;
}

export interface CreatedLantern {
  id: string;
  shapeId: string;
  colorId: string;
  patternId: string;
  createdAt: number;
  hangPosition: number; // 0 to 1 position along the rope
  swayDelay: number;
  swayDuration: number;
  isCustomized: boolean;
}
