import React from 'react';
import Image from 'next/image';
import { footerLinkGroups } from '@/app/data/navigation';
import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 text-gray-400 text-sm relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#080510] via-[#080510]/80 to-transparent pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#6F70DE]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#85EDAF]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start">
            <div className="mb-6 relative group inline-block">
              <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors duration-500 rounded-full"></div>
              <Image 
                src="/logo/canal3_logo_trans.png" 
                alt="Canal3 Networks" 
                width={300} 
                height={100} 
                className="h-14 w-auto object-contain relative z-10"
              />
            </div>
            <p className="text-[13px] leading-relaxed text-gray-400 mb-8 max-w-sm font-light">
              Tu operador de confianza en telefonía e internet. Llevamos la máxima velocidad donde otros no llegan, con un servicio humano frontal, directo y transparente.
            </p>
            
            <div className="flex flex-col gap-3.5 font-medium text-[13px] mb-8 w-full">
              <a href="tel:+34744483448" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer w-fit">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#6F70DE]/20 group-hover:border-[#6F70DE]/40 transition-all shadow-sm">
                  <Phone size={14} className="text-[#6F70DE]" />
                </div>
                <span>+34 744 483 448</span>
              </a>
              <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer w-fit cursor-default">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all shadow-sm">
                  <Clock size={14} className="text-yellow-400" />
                </div>
                <span>L-S 10:00–14:00 / 17:00–21:00</span>
              </div>
              <a href="mailto:info@canal3networks.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer w-fit">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#85EDAF]/20 group-hover:border-[#85EDAF]/40 transition-all shadow-sm">
                  <Mail size={14} className="text-[#85EDAF]" />
                </div>
                <span>info@canal3networks.com</span>
              </a>
              <a href="https://maps.app.goo.gl/dsEeedyTd38PeTuo8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer w-fit">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#78D4EF]/20 group-hover:border-[#78D4EF]/40 transition-all shadow-sm">
                  <MapPin size={14} className="text-[#78D4EF]" />
                </div>
                <span>C/ Mayor 204, El Raal – Murcia</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61570115277895" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-gray-400 group-hover:text-[#1877F2] transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/canal3networks/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#dc2743]/20 hover:to-[#bc1888]/20 hover:border-[#dc2743]/50 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#dc2743]/20 transition-all duration-300 group relative overflow-hidden"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <Instagram size={18} className="text-gray-400 group-hover:text-[#dc2743] transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Columns (Span 8) */}
          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 gap-y-10 md:pt-4">
            {footerLinkGroups.map((group) => (
              <div key={group.title} className="flex flex-col">
                <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-6 opacity-90">{group.title}</h5>
                <ul className="flex flex-col gap-3.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2.5 group/link text-[13px] sm:text-sm font-medium w-fit"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-[#85EDAF] group-hover/link:shadow-[0_0_8px_rgba(133,237,175,0.8)] transition-all duration-300"></span>
                        <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500 gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6">
            <span>© 2026 Canal3 Networks. Todos los derechos reservados.</span>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/10"></div>
            <span>Diseñado por Nebula Studios.</span>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <a href="#condiciones" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#privacidad" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
