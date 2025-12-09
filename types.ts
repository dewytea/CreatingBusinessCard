export enum TemplateType {
  MODERN = 'MODERN',
  CLASSIC = 'CLASSIC',
  MINIMAL = 'MINIMAL',
  CREATIVE = 'CREATIVE'
}

export interface CardInfo {
  name: string;
  englishName: string;
  title: string;
  companyName: string;
  englishCompanyName: string; // New field
  businessTagline: string;
  phone: string;
  companyPhone: string; // New field (Tel)
  email: string;
  website: string;
  address: string;
  englishAddress: string; // New field
  fax?: string;
  logoUrl?: string;
}

export interface DesignStyle {
  template: TemplateType;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface AIGeneratedResponse {
  cardInfo: Omit<CardInfo, 'logoUrl'>;
  designStyle: DesignStyle;
  rationale: string;
}