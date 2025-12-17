import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dense neon grid style
  const gridStyle = {
    backgroundImage: `
      linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <header className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             preload="auto"
             className="w-full h-full object-cover scale-105"
           >
             {/* Using a high-quality cinematic barbershop stock video */}
             <source src="https://videos.pexels.com/video-files/3998415/3998415-uhd_2560_1440_25fps.mp4" type="video/mp4" />
           </video>
           
           {/* Overlays for Text Readability */}
           <div className="absolute inset-0 bg-black/60"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        </div>

        {/* Navbar */}
        <nav className="absolute top-0 w-full z-50 px-6 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 relative z-50">
            <div className="border-2 border-orange-500 p-1 rotate-45 shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              <div className="bg-orange-500 w-8 h-8 flex items-center justify-center -rotate-45">
                <i className="fa-solid fa-scissors text-white text-sm"></i>
              </div>
            </div>
            <div className="ml-3 leading-tight text-white">
              <p className="font-display font-bold tracking-widest text-sm">BERGER</p>
              <p className="text-[10px] text-gray-400 tracking-widest">DESDE MM XVI</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-white">
            <a className="flex items-center gap-2 hover:text-orange-500 transition-colors" href="#">
              <i className="fa-brands fa-whatsapp"></i> ENTRE EM CONTATO
            </a>
            <button 
              onClick={() => navigate('/calendar')}
              className="flex items-center gap-2 hover:text-orange-500 transition-colors uppercase"
            >
              <i className="fa-regular fa-calendar-check text-orange-500"></i> FAÇA SEU AGENDAMENTO
            </button>
            <Link to="/login" className="flex items-center gap-2 hover:text-orange-500 transition-colors" title="Painel Admin">
               <i className="fa-solid fa-lock"></i>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-2xl relative z-50 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
             <div className="flex flex-col gap-8 text-center">
                <a href="#" className="text-xl font-display font-bold text-white hover:text-orange-500 tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
                   ENTRE EM CONTATO
                </a>
                <button 
                   onClick={() => {
                     setIsMobileMenuOpen(false);
                     navigate('/calendar');
                   }}
                   className="text-xl font-display font-bold text-orange-500 tracking-widest"
                >
                   FAÇA SEU AGENDAMENTO
                </button>
                <Link to="/login" className="text-sm text-gray-500 uppercase tracking-widest mt-8" onClick={() => setIsMobileMenuOpen(false)}>
                   Acesso Administrativo
                </Link>
             </div>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="flex-grow flex flex-col items-center justify-center text-center relative z-10 px-4 mt-20">
          <div className="mb-2">
            <i className="fa-solid fa-scissors text-white text-2xl rotate-90"></i>
          </div>
          <p className="text-white text-[10px] md:text-xs tracking-[0.3em] font-bold mb-2">EXCLUSIVO PARA HOMENS</p>
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 mb-2 tracking-tighter drop-shadow-[0_0_35px_rgba(249,115,22,0.6)]">BERGER</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm tracking-[0.2em] text-gray-400 mb-6">
            <span className="text-orange-500 font-bold text-sm md:text-base drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] uppercase">
              MELHOR CORTE DE CABELO NA SUA CIDADE
            </span>
          </div>
          <p className="text-gray-300 italic max-w-md mx-auto mb-10 text-sm md:text-base font-light px-4">
            Cortes precisos, barba alinhada e um ambiente feito para quem exige mais do que o básico.
          </p>
          <button 
            onClick={() => navigate('/calendar')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-500 text-white text-xs font-bold py-4 px-8 tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] w-full md:w-auto max-w-xs rounded md:rounded-none">
            Agendar Horário
          </button>
        </div>
        
        {/* Scroll Indicator (Hidden on Mobile) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 text-[10px] text-orange-500 font-bold tracking-widest [writing-mode:vertical-rl] rotate-180 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">
          <span>ROLE PARA BAIXO</span>
          <div className="w-[1px] h-16 bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]"></div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 relative border-t border-white/5" style={gridStyle}>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-orange-500 mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">Nossos Serviços</h2>
            <p className="text-gray-400 text-sm tracking-wide">Experiência premium em cada atendimento</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-card-dark border border-card-border p-8 hover:border-orange-500 transition-colors duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-700 text-orange-500 mb-6 group-hover:border-orange-500 transition-colors">
                <i className="fa-solid fa-scissors text-xl"></i>
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-3">Corte Premium</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">Corte personalizado com técnicas modernas e acabamento impecável.</p>
              <p className="text-orange-500 font-bold text-2xl">R$ 60</p>
            </div>
            <div className="group bg-card-dark border border-card-border p-8 hover:border-orange-500 transition-colors duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-700 text-orange-500 mb-6 group-hover:border-orange-500 transition-colors">
                <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-3">Barba Completa</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">Design, aparo e finalização com produtos premium.</p>
              <p className="text-orange-500 font-bold text-2xl">R$ 45</p>
            </div>
            <div className="group bg-card-dark border border-card-border p-8 hover:border-orange-500 transition-colors duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-700 text-orange-500 mb-6 group-hover:border-orange-500 transition-colors">
                <i className="fa-solid fa-pen-nib text-xl"></i>
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-3">Combo Especial</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">Corte + Barba com tratamento completo e hidratação.</p>
              <p className="text-orange-500 font-bold text-2xl">R$ 95</p>
            </div>
            <div className="group bg-card-dark border border-card-border p-8 hover:border-orange-500 transition-colors duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-700 text-orange-500 mb-6 group-hover:border-orange-500 transition-colors">
                <i className="fa-solid fa-fire text-xl"></i>
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-3">Degradê Premium</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">Degradê high fade ou low fade com transições perfeitas.</p>
              <p className="text-orange-500 font-bold text-2xl">R$ 70</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 relative" style={gridStyle}>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-orange-500 mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">Nosso Trabalho</h2>
            <p className="text-gray-400 text-sm tracking-wide">Resultados que falam por si</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-[4/5] overflow-hidden group rounded-sm border border-card-border">
              <img alt="Haircut Style 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgN8QjovH4X0j_hLv9_Re3638KFbbPzBqiGRQGZ4KJMOlrcspXAWVftJ7dfRDNpx-qj78WPRqyzGn3O3zEJp0v5a9gw-vOxIklmNZfQi0RDLBK3QYqLFg7fIERf8xf5grM_D51ubwzO0D8cgAmITZ4JjSJGF22ZqvqiMkVreo4oeqpHiEbuRtCnKwKxTuVx0MT8pmJrHYzddiBrs7V3SEAwlIAmeH076oEpyRobOgZfGdUK_NjuIQXrQXSnWHOTLLOiHcrerhooZ69" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group rounded-sm border border-card-border">
              <img alt="Beard Style" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1EUCgGcjNSBoJdfbmYPzhoySt1-5jtjOzqMJuTkXHvTTeA4ahdW1jGwJ0DsyKWrt7KY-_qlrKneh3egmKt355xY4sICV3P4UDmROSYtrRDr5OMzuZWzemqXJM7UH5OMRluiH0Nq6e1TJbEXY1Ea30A6_0OriEVREhiq7_FcsMgNIHVrpSxkSqibIIetRYKU1w4uqTCOSBrAzePopz8eTmgADgtEFVtrtQnpNaj1fDR9UrYboFevvmzPUwCWFFynOOP90yVgSZ4qhc" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group rounded-sm border border-card-border">
              <img alt="Haircut Style 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOb8DcRDYaaMW8bLtk7MDJ_OLROdP4poCE6ZX2hWuFf62cqu09MMOBfWTNT2NgG22HMCOP6B0FQ8tfuneWgEXzH5lrWJV1weaCytdNblO-ZAZKRNpQh7fEJM138TJA0wh-sXhMYWqfE_g-dGQOwiR7CtAauJYM4EuC65c5KbEtoKxJl1YIPGO-0yKaGetSeBsYMt0d9_IxKAqNq1IVM5sXr-sTEkdbvs7sSHwUd6UuZzm0Cb8PFLQ8fAdwmXxejIRDCEPVUlf6_Ycs" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative border-b border-white/5" style={gridStyle}>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-orange-500 mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">O que dizem nossos clientes</h2>
            <p className="text-gray-400 text-sm tracking-wide">Satisfação garantida em cada atendimento</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-card-dark border border-card-border p-8 rounded-sm hover:border-orange-500/50 transition-colors">
              <div className="flex gap-1 text-orange-500 text-xs mb-4">
                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
              </div>
              <p className="text-gray-400 text-sm italic mb-6">"Melhor barbearia da região. Profissionais qualificados e ambiente incrível."</p>
              <p className="text-orange-500 font-bold text-sm uppercase">Carlos Silva</p>
            </div>
            <div className="bg-card-dark border border-card-border p-8 rounded-sm hover:border-orange-500/50 transition-colors">
              <div className="flex gap-1 text-orange-500 text-xs mb-4">
                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
              </div>
              <p className="text-gray-400 text-sm italic mb-6">"Atendimento impecável e resultado sempre perfeito. Recomendo!"</p>
              <p className="text-orange-500 font-bold text-sm uppercase">Rafael Santos</p>
            </div>
            <div className="bg-card-dark border border-card-border p-8 rounded-sm hover:border-orange-500/50 transition-colors">
              <div className="flex gap-1 text-orange-500 text-xs mb-4">
                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
              </div>
              <p className="text-gray-400 text-sm italic mb-6">"Agendamento online facilitou muito. Nunca mais perco tempo em fila."</p>
              <p className="text-orange-500 font-bold text-sm uppercase">Marcos Oliveira</p>
            </div>
            <div className="bg-card-dark border border-card-border p-8 rounded-sm hover:border-orange-500/50 transition-colors">
              <div className="flex gap-1 text-orange-500 text-xs mb-4">
                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
              </div>
              <p className="text-gray-400 text-sm italic mb-6">"Qualidade premium por um preço justo. Sou cliente fiel há 2 anos."</p>
              <p className="text-orange-500 font-bold text-sm uppercase">Lucas Ferreira</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative overflow-hidden flex justify-center items-center" style={gridStyle}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 w-full max-w-sm px-4">
          <div className="bg-[#1f1f1f]/80 backdrop-blur-md border border-white/10 p-2 rounded-lg shadow-2xl">
            <div className="w-full h-64 bg-card-dark rounded border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.5 }}></div>
              <div className="text-green-500 text-3xl drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-bounce relative z-10">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="absolute top-1/4 left-1/4 w-12 h-16 bg-white/5 rounded-sm"></div>
              <div className="absolute bottom-1/3 right-1/4 w-16 h-12 bg-white/5 rounded-sm"></div>
              <div className="absolute top-10 right-10 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-gray-400 font-mono">AO VIVO</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-sm">São Paulo, SP</p>
                <p className="text-[10px] text-gray-500 font-mono">23.5505° S, 46.6333° W</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden flex items-center justify-center bg-[#050505]">
         {/* Background Glows (Keep existing) */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]"></div>
         </div>

        <div className="w-full max-w-2xl px-4 relative z-10">
          <h2 className="text-white/90 text-2xl font-bold text-center mb-6 drop-shadow-md">Agende Seu Horário</h2>
          
          {/* Card with Frosted Glass & Orange Gradient Details */}
          <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/50 via-white/10 to-orange-500/10 overflow-hidden shadow-2xl">
             {/* The Card Content Container */}
             <div className="bg-[#101010]/60 backdrop-blur-2xl rounded-2xl p-10 md:p-14 text-center relative overflow-hidden h-full">
                
                {/* Inner ambient orange glow - Gradient details */}
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 drop-shadow-lg relative z-10">
                  Agende <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Seu Horário</span>
                </h3>
                
                {/* Gradient divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-6 rounded-full opacity-80"></div>

                <p className="text-gray-300 text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed relative z-10">
                  Escolha o melhor horário e garanta seu atendimento.
                  <br />
                  Corte e barba com padrão profissional.
                </p>
                
                <button 
                    onClick={() => navigate('/calendar')}
                    className="relative group/btn overflow-hidden bg-white/5 border border-orange-500/30 hover:border-orange-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 w-full md:w-auto shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600/10 to-red-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Fazer Agendamento</span>
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;