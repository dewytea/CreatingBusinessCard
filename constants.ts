import { CardInfo, DesignStyle, TemplateType } from './types';

export const DEFAULT_CARD_INFO: CardInfo = {
  name: '박성돈',
  englishName: 'Park, Sung Don',
  title: '대표이사 / CEO',
  companyName: '디이제네시스(주)',
  englishCompanyName: 'DE Genesis Inc.',
  businessTagline: '신소재 개발 New Material Dev.\n친환경 에너지 Eco-Energy\nSuper Activated Material',
  phone: '010-6310-8630',
  companyPhone: '031-222-2321',
  email: 'runer35@naver.com',
  website: 'www.degenesis.com',
  address: '(18401) 경기도 화성시 경기대로 1038',
  englishAddress: '#403, 1038 Gyeonggidaero, Hwaseongsi, Gyeonggido, Korea',
  fax: '031-222-2320'
};

export const DEFAULT_DESIGN_STYLE: DesignStyle = {
  template: TemplateType.MODERN,
  primaryColor: '#ea580c', // Orange-600
  secondaryColor: '#9ca3af', // Gray-400
  textColor: '#1f2937', // Gray-800
  backgroundColor: '#ffffff',
};

export const PRESET_COLORS = [
  '#2563eb', // Blue
  '#059669', // Emerald
  '#dc2626', // Red
  '#7c3aed', // Violet
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#4b5563', // Gray
  '#1f2937', // Dark
];