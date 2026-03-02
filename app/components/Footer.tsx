import React from 'react';
import { footerLinkGroups } from '@/app/data/navigation';

const Footer = () => {
  return (
    <footer className="bg-[#05030a] pt-16 pb-8 border-t border-white/5 text-gray-400 text-sm">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xl font-bold text-white mb-4 brand-font">CANAL3</h4>
          <p className="text-xs leading-relaxed opacity-60">
            Tu operador de confianza. Llevamos internet de alta velocidad donde otros no llegan, con un servicio cercano y transparente.
          </p>
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
      <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
        <span>© 2024 Canal3 Networks. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
