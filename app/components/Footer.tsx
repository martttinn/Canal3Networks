import React from 'react';
import Image from 'next/image';
import { footerLinkGroups } from '@/app/data/navigation';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#05030a] pt-16 pb-8 border-t border-white/5 text-gray-400 text-sm">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <div className="mb-6">
            <Image 
              src="/logo/canal3_logo_trans.png" 
              alt="Canal3 Networks" 
              width={300} 
              height={100} 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <p className="text-xs leading-relaxed opacity-60 mb-6">
            Tu operador de confianza. Llevamos internet de alta velocidad donde otros no llegan, con un servicio cercano y transparente.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://es-es.facebook.com/canal3wifi.fibra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 group"
              aria-label="Facebook"
            >
              <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a 
              href="https://www.instagram.com/canal3networks/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white transition-all duration-300 group"
              aria-label="Instagram"
            >
              <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
        {footerLinkGroups.map((group) => (
          <div key={group.title}>
            <h5 className="text-white font-semibold mb-4">{group.title}</h5>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link} className="hover:text-[#6F70DE] cursor-pointer transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 gap-4 text-center md:text-left">
        <span>© 2026 Canal3 Networks. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
