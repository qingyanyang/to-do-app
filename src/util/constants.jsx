export enum MyChipSize {
  Small = 'small',
  Normal = 'normal',
  Large = 'large',
}

export enum MyColor {
  Success = 'success',
  Brand = 'brand',
  Error = 'error',
  Warning = 'warning',
  Neutral = 'neutral',
}

interface ColorConfig {
  borderColor: string;
  bgColor: string;
  textColor: string;
}

const colorMap: Record<MyColor, ColorConfig> = {
  [MyColor.Success]: {
    borderColor: '#bbf7d0',
    bgColor: '#f0fdf4',
    textColor: '#15803d',
  },
  [MyColor.Brand]: {
    borderColor: '#c7d2fe',
    bgColor: '#eff1fc',
    textColor: '#4338ca',
  },
  [MyColor.Error]: {
    borderColor: '#fecaca',
    bgColor: '#fcf2f2',
    textColor: '#dc2626',
  },
  [MyColor.Warning]: {
    borderColor: '#fde68a',
    bgColor: '#fffbeb',
    textColor: '#a16207',
  },
  [MyColor.Neutral]: {
    borderColor: '#e5e5e5',
    bgColor: '#f9fafb',
    textColor: '#525154',
  },
};

export { colorMap };
