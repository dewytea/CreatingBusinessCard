import React from 'react';
import { CardInfo, DesignStyle, TemplateType } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Printer } from 'lucide-react';

interface BusinessCardProps {
  info: CardInfo;
  style: DesignStyle;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ info, style }) => {
  const { name, englishName, title, companyName, englishCompanyName, businessTagline, phone, companyPhone, fax, email, website, address, englishAddress, logoUrl } = info;
  const { template, primaryColor, secondaryColor, textColor, backgroundColor } = style;

  // Dimensions for standard business card (approx ratio)
  const cardClass = "w-full aspect-[1.58/1] relative shadow-lg overflow-hidden transition-all duration-300 font-sans";
  
  // Common Logo/Icon Component
  const Logo = ({ className = "", size = "normal" }: { className?: string, size?: "small" | "normal" | "large" }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoUrl ? (
        <img src={logoUrl} alt="Logo" className={`${size === 'large' ? 'h-16 w-16' : 'h-10 w-10'} object-contain`} />
      ) : (
        <div className={`${size === 'large' ? 'h-16 w-16' : 'h-10 w-10'} rounded bg-current flex items-center justify-center opacity-20`}>
            <Briefcase size={size === 'large' ? 32 : 20} />
        </div>
      )}
      <div className={`font-bold tracking-tight leading-none flex flex-col justify-center`} 
           style={{ 
             color: template === TemplateType.MODERN ? '#000' : primaryColor
           }}>
        <span className="uppercase" style={{ fontSize: size === 'large' ? '1.5rem' : '1.25rem' }}>
            {companyName}
        </span>
        {englishCompanyName && (
            <span className="font-normal opacity-80 mt-0.5" style={{ fontSize: size === 'large' ? '0.75rem' : '0.65rem', letterSpacing: '0.05em' }}>
                {englishCompanyName}
            </span>
        )}
      </div>
    </div>
  );

  const renderFront = () => {
    switch (template) {
      case TemplateType.CLASSIC:
        return (
          <div className={`${cardClass} flex flex-col items-center justify-center text-center p-8`} style={{ backgroundColor, color: textColor }}>
            <div className="border-b-2 pb-6 mb-6 w-1/2 flex justify-center" style={{ borderColor: primaryColor }}>
               <Logo size="large" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-[0.2em] mb-1">{name}</h2>
            <p className="text-sm uppercase tracking-wider mb-2 font-serif">{englishName}</p>
            <p className="text-sm font-serif italic mb-6" style={{ color: secondaryColor }}>{title}</p>
            
            <div className="text-xs space-y-1 opacity-80 mt-auto">
              <p>{phone} | {email}</p>
            </div>
          </div>
        );

      case TemplateType.MINIMAL:
        return (
          <div className={`${cardClass} p-10 flex flex-col justify-between`} style={{ backgroundColor, color: textColor }}>
            <div className="flex justify-between items-start">
               <Logo />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
               <h2 className="text-3xl font-light tracking-[0.3em] ml-1 mb-2">{name}</h2>
               <p className="text-xs uppercase tracking-widest text-gray-400">{englishName}</p>
               <div className="w-8 h-0.5 bg-gray-300 mx-auto my-4"></div>
               <p className="text-sm uppercase tracking-widest" style={{ color: primaryColor }}>{title}</p>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
               <span>{phone}</span>
               <span>{website}</span>
            </div>
          </div>
        );

      case TemplateType.CREATIVE:
        return (
          <div className={`${cardClass} flex`} style={{ backgroundColor: primaryColor }}>
             <div className="w-1/3 h-full relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full" style={{ backgroundColor: secondaryColor, opacity: 0.3 }}></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full" style={{ backgroundColor: 'white', opacity: 0.1 }}></div>
                <div className="h-full flex items-center justify-center p-4">
                     {logoUrl ? <img src={logoUrl} className="max-w-full max-h-32 object-contain filter brightness-0 invert" /> : <Briefcase size={48} color="white" />}
                </div>
             </div>
             <div className="w-2/3 h-full p-10 flex flex-col justify-center bg-white" style={{ color: textColor }}>
                <h2 className="text-3xl font-bold mb-1 tracking-widest" style={{ color: primaryColor }}>{name}</h2>
                <p className="text-sm font-medium text-gray-400 mb-6 uppercase">{englishName}</p>
                <p className="text-sm font-medium mb-8 text-gray-600 border-l-2 pl-3" style={{borderColor: secondaryColor}}>{title}</p>
                
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2"><Phone size={12} className="text-gray-400" /> {phone}</div>
                    <div className="flex items-center gap-2"><Mail size={12} className="text-gray-400" /> {email}</div>
                    <div className="flex items-center gap-2"><Globe size={12} className="text-gray-400" /> {website}</div>
                </div>
             </div>
          </div>
        );

      case TemplateType.MODERN:
      default:
        // Updated Modern Front Design
        return (
          <div className={`${cardClass} flex flex-col relative bg-white`} style={{ color: textColor }}>
            {/* Top Section: Logo */}
            <div className="flex-1 p-10 flex flex-col">
              <div className="mt-2">
                 <Logo />
              </div>
              
              {/* Name Block - Bottom Right of the main content area */}
              <div className="mt-auto self-end text-right">
                 <h2 className="text-4xl font-bold tracking-[0.2em] text-gray-900 mb-1" style={{ marginRight: '-0.1em' }}>{name}</h2>
                 <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">{englishName}</p>
                 <p className="text-md font-semibold" style={{ color: primaryColor }}>{title}</p>
              </div>
            </div>
            
            {/* Decorative Bottom Bar */}
            <div className="h-5 w-full flex">
               <div className="h-full w-[35%]" style={{ backgroundColor: primaryColor }}></div>
               <div className="h-full w-[65%]" style={{ backgroundColor: '#9ca3af' }}></div> {/* Fixed gray for modern look */}
            </div>
          </div>
        );
    }
  };

  const renderBack = () => {
     switch (template) {
        case TemplateType.MODERN:
           // Updated Modern Back Design matching the request
           return (
             <div className={`${cardClass} flex relative bg-white p-8`} style={{ color: textColor }}>
                 {/* Left Side: Graphic Element */}
                 <div className="w-[45%] flex items-center justify-center border-r border-gray-100 pr-6">
                     <div className="relative w-36 h-36 flex items-center justify-center">
                        {/* Abstract circle art mimicking reference */}
                        <div className="absolute w-32 h-32 rounded-full border-[3px] opacity-80 animate-pulse-slow" 
                             style={{ borderColor: primaryColor, transform: 'rotate(-15deg)' }}></div>
                        <div className="absolute w-32 h-32 rounded-full border-[3px] opacity-80" 
                             style={{ borderColor: '#60a5fa', transform: 'translate(5px, 5px) rotate(15deg)' }}></div>
                        <div className="absolute w-32 h-32 rounded-full border-[3px] opacity-40" 
                             style={{ borderColor: secondaryColor, transform: 'translate(-5px, -5px)' }}></div>
                        
                        <div className="relative z-10 font-bold text-[10px] bg-white px-2 py-0.5 shadow-sm text-center leading-tight">
                           Leading<br/>Technology
                        </div>
                     </div>
                 </div>

                 {/* Right Side: Information */}
                 <div className="w-[55%] pl-8 flex flex-col justify-center">
                    {/* Company Name Block */}
                    <div className="border-l-[3px] pl-4 mb-5" style={{ borderColor: primaryColor }}>
                        <h3 className="font-bold text-xl leading-none mb-1">{companyName}</h3>
                        <p className="text-[10px] text-gray-500 font-medium">{englishCompanyName}</p>
                    </div>

                    {/* Business Items Taglines */}
                    <div className="mb-6">
                        {businessTagline.split('\n').map((line, idx) => (
                            <p key={idx} className="text-[11px] font-semibold text-gray-700 leading-relaxed">
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Contact Detail Block - Table-like alignment */}
                    <div className="space-y-[3px] text-[10px] leading-tight text-gray-600 font-medium">
                        <div className="flex">
                            <span className="w-12 font-bold text-gray-800">Mobile :</span>
                            <span>{phone}</span>
                        </div>
                        <div className="flex">
                            <span className="w-12 font-bold text-gray-800">E-mail :</span>
                            <span>{email}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="w-12 font-bold text-gray-800 shrink-0">Add :</span>
                            <span className="leading-tight">{englishAddress || address}</span>
                        </div>
                        <div className="flex mt-1">
                            <span className="w-12 font-bold text-gray-800">Tel :</span>
                            <span>{companyPhone}</span>
                        </div>
                        {fax && (
                            <div className="flex">
                                <span className="w-12 font-bold text-gray-800">Fax :</span>
                                <span>{fax}</span>
                            </div>
                        )}
                    </div>
                 </div>
             </div>
           );

        case TemplateType.CREATIVE:
            return (
                <div className={`${cardClass} flex flex-col items-center justify-center p-8 text-center`} style={{ backgroundColor: primaryColor, color: 'white' }}>
                    <Logo className="justify-center mb-6 scale-125 text-white" />
                    <div className="w-12 h-1 bg-white/30 mb-6"></div>
                    <div className="text-sm opacity-90 space-y-1">
                        {businessTagline.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                    <p className="opacity-70 text-xs mt-8 absolute bottom-8">{website}</p>
                </div>
            );
        case TemplateType.MINIMAL:
            return (
                <div className={`${cardClass} flex items-center justify-center p-12 bg-white`} style={{ color: textColor }}>
                     <div className="absolute inset-4 border border-gray-100"></div>
                     <div className="text-center z-10">
                        <Logo className="justify-center mb-6" />
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-left text-xs text-gray-500">
                             <div><span className="font-bold text-gray-900 block">T</span> {companyPhone || phone}</div>
                             <div><span className="font-bold text-gray-900 block">E</span> {email}</div>
                             <div className="col-span-2"><span className="font-bold text-gray-900 block">A</span> {englishAddress || address}</div>
                        </div>
                     </div>
                </div>
            )
        default: // CLASSIC
             return (
                 <div className={`${cardClass} flex items-center justify-center p-8 relative`} style={{ backgroundColor: secondaryColor, color: 'white' }}>
                    <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }}></div>
                    <div className="text-center">
                        <Logo className="justify-center text-white mb-4" />
                        <div className="text-xs opacity-80 font-serif leading-loose">
                           {englishAddress || address} • {companyPhone || phone} • {website}
                        </div>
                    </div>
                 </div>
             );
     }
  }

  return (
    <div className="space-y-8 w-full max-w-lg mx-auto select-none">
      <div className="group">
          <div className="mb-2 text-sm font-medium text-gray-500 flex justify-between items-center">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Front (앞면)</span>
          </div>
          {renderFront()}
      </div>
      <div className="group">
          <div className="mb-2 text-sm font-medium text-gray-500 flex justify-between items-center">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Back (뒷면)</span>
          </div>
          {renderBack()}
      </div>
    </div>
  );
};

export default BusinessCard;