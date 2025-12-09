import React, { useState, useRef } from 'react';
import { CardInfo, DesignStyle, TemplateType } from './types';
import { DEFAULT_CARD_INFO, DEFAULT_DESIGN_STYLE, PRESET_COLORS } from './constants';
import BusinessCard from './components/BusinessCard';
import { generateCardFromConcept } from './services/geminiService';
import { Sparkles, Layout, Palette, Type, Image as ImageIcon, Wand2, Download, RefreshCw, Phone, List, Printer } from 'lucide-react';

const App: React.FC = () => {
  const [cardInfo, setCardInfo] = useState<CardInfo>(DEFAULT_CARD_INFO);
  const [designStyle, setDesignStyle] = useState<DesignStyle>(DEFAULT_DESIGN_STYLE);
  
  // AI State
  const [concept, setConcept] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleStyleChange = <K extends keyof DesignStyle>(key: K, value: DesignStyle[K]) => {
    setDesignStyle(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardInfo(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIGenerate = async () => {
    if (!concept.trim()) return;
    
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const result = await generateCardFromConcept(concept);
      setCardInfo(prev => ({
          ...result.cardInfo,
          logoUrl: prev.logoUrl // Keep existing logo if any
      }));
      setDesignStyle(result.designStyle);
    } catch (err) {
      setGenerationError("AI 생성을 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper for Input Fields
  const InputGroup = ({ label, name, value, placeholder }: { label: string, name: keyof CardInfo, value: string, placeholder?: string }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInfoChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow"
      />
    </div>
  );

  const TextAreaGroup = ({ label, name, value, placeholder }: { label: string, name: keyof CardInfo, value: string, placeholder?: string }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={handleInfoChange}
        placeholder={placeholder}
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT PANEL: Editor */}
      <div className="w-full lg:w-[420px] bg-white border-r border-gray-200 h-auto lg:h-screen overflow-y-auto flex-shrink-0 z-10 shadow-xl scrollbar-hide">
        <div className="p-6 pb-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="text-blue-600" />
                AI 명함 메이커
            </h1>

            {/* AI Generator Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 mb-8">
                <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-1">
                    <Wand2 size={16} /> AI 자동 생성
                </h3>
                <p className="text-xs text-blue-700 mb-3">
                    회사 설명이나 컨셉을 입력하면 디자인과 내용을 자동으로 만들어드립니다.
                </p>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                        placeholder="예: 친환경 에너지 스타트업, 신뢰감을 주는 디자인"
                        className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
                    />
                    <button 
                        onClick={handleAIGenerate}
                        disabled={isGenerating || !concept}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center min-w-[60px]"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : "생성"}
                    </button>
                </div>
                {generationError && <p className="text-red-500 text-xs mt-2">{generationError}</p>}
            </div>

            <div className="space-y-8">
                {/* 1. Basic Info */}
                <section>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                        <Type size={16} /> 기본 정보
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="이름 (한글)" name="name" value={cardInfo.name} />
                        <InputGroup label="이름 (영문)" name="englishName" value={cardInfo.englishName} placeholder="Gildong Hong" />
                    </div>
                    <InputGroup label="직함" name="title" value={cardInfo.title} />
                    <InputGroup label="회사명" name="companyName" value={cardInfo.companyName} />
                    <InputGroup label="회사명 (영문)" name="englishCompanyName" value={cardInfo.englishCompanyName} placeholder="DE Genesis Inc." />
                    
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">로고 이미지</label>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center gap-2 w-full justify-center text-gray-600 bg-white"
                            >
                                <ImageIcon size={16} />
                                {cardInfo.logoUrl ? "로고 변경" : "로고 업로드"}
                            </button>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept="image/*" 
                                onChange={handleLogoUpload} 
                                className="hidden" 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">사업 내용 (뒷면 표시)</label>
                        <textarea
                            name="businessTagline"
                            value={cardInfo.businessTagline}
                            onChange={handleInfoChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow resize-none"
                            placeholder="주요 사업 내용을 줄바꿈으로 입력하세요"
                        />
                    </div>
                </section>

                {/* 2. Contact Info */}
                <section>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                        <Phone size={16} /> 연락처 정보
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="휴대전화" name="phone" value={cardInfo.phone} />
                        <InputGroup label="회사전화 (Tel)" name="companyPhone" value={cardInfo.companyPhone} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <InputGroup label="팩스 (Fax)" name="fax" value={cardInfo.fax || ''} />
                         <InputGroup label="이메일" name="email" value={cardInfo.email} />
                    </div>
                    
                    <InputGroup label="웹사이트" name="website" value={cardInfo.website} />
                    
                    {/* Changed to Text Area for more space */}
                    <TextAreaGroup label="주소" name="address" value={cardInfo.address} />
                    <TextAreaGroup label="주소 (영문)" name="englishAddress" value={cardInfo.englishAddress} />
                </section>

                {/* 3. Templates */}
                <section>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                        <Layout size={16} /> 템플릿
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.values(TemplateType).map((t) => (
                            <button
                                key={t}
                                onClick={() => handleStyleChange('template', t)}
                                className={`p-3 border rounded-lg text-left transition-all relative overflow-hidden ${
                                    designStyle.template === t 
                                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="text-sm font-medium mb-1 capitalize relative z-10">{t.toLowerCase()}</div>
                                <div className="text-xs text-gray-500 relative z-10">
                                    {t === TemplateType.MODERN && "Bold & Professional"}
                                    {t === TemplateType.CLASSIC && "Elegant & Traditional"}
                                    {t === TemplateType.MINIMAL && "Clean & Simple"}
                                    {t === TemplateType.CREATIVE && "Unique & Artsy"}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* 4. Colors */}
                <section>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                        <Palette size={16} /> 색상 테마
                    </h3>
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 mb-2">메인 컬러</label>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_COLORS.map(color => (
                                <button
                                    key={color}
                                    onClick={() => handleStyleChange('primaryColor', color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                        designStyle.primaryColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                                <input 
                                    type="color" 
                                    value={designStyle.primaryColor}
                                    onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
                                    className="absolute -top-2 -left-2 w-12 h-12 p-0 border-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">보조 컬러</label>
                             <div className="flex items-center gap-2 border px-2 py-1 rounded bg-white">
                                <div className="w-4 h-4 rounded shadow-sm" style={{backgroundColor: designStyle.secondaryColor}}></div>
                                <input 
                                    type="text"
                                    value={designStyle.secondaryColor}
                                    onChange={(e) => handleStyleChange('secondaryColor', e.target.value)}
                                    className="w-full text-xs focus:outline-none uppercase"
                                />
                             </div>
                         </div>
                         <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">배경 컬러</label>
                             <div className="flex items-center gap-2 border px-2 py-1 rounded bg-white">
                                <div className="w-4 h-4 rounded shadow-sm border" style={{backgroundColor: designStyle.backgroundColor}}></div>
                                <input 
                                    type="text"
                                    value={designStyle.backgroundColor}
                                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                                    className="w-full text-xs focus:outline-none uppercase"
                                />
                             </div>
                         </div>
                    </div>
                </section>
            </div>
        </div>
      </div>

      {/* RIGHT PANEL: Preview */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `radial-gradient(#4b5563 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
        }}></div>

        <div className="relative w-full max-w-2xl">
             {/* Action Bar */}
             <div className="absolute -top-16 right-0 flex gap-2">
                 <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                     <Download size={16} /> 이미지 저장
                 </button>
             </div>

             <div className="flex flex-col items-center justify-center min-h-[600px]">
                {isGenerating ? (
                    <div className="text-center animate-pulse">
                        <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Sparkles className="text-blue-600 animate-spin" size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700">AI가 명함을 디자인 중입니다...</h2>
                        <p className="text-gray-500 mt-2">잠시만 기다려주세요.</p>
                    </div>
                ) : (
                    <BusinessCard info={cardInfo} style={designStyle} />
                )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default App;