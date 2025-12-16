import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1)); // June 2024
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); 
  
  const startingEmptyCells = firstDayOfMonth;

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay && selectedTime && formData.name && formData.phone) {
      alert(`Agendamento Confirmado!\nCliente: ${formData.name}\nTel: ${formData.phone}\nData: ${selectedDay}/06/2024 às ${selectedTime}`);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-20 py-6 bg-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2 relative z-50">
           <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center" onClick={() => navigate('/')}>
             <i className="fa-solid fa-layer-group text-white text-sm"></i>
           </div>
           <span className="font-bold text-xl tracking-wide cursor-pointer" onClick={() => navigate('/')}>BERGER</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
           <a href="#" className="hover:text-white transition-colors" onClick={() => navigate('/')}>Home</a>
           <a href="#" className="hover:text-white transition-colors">Serviços</a>
           <a href="#" className="hover:text-white transition-colors">Portfólio</a>
           <a href="#" className="hover:text-white transition-colors">Preços</a>
        </div>
        <button onClick={() => navigate('/login')} className="hidden md:block px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
           Admin Login
        </button>

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
              <a href="#" className="text-xl font-bold text-white hover:text-orange-500 tracking-wider" onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }}>HOME</a>
              <a href="#" className="text-xl font-bold text-white hover:text-orange-500 tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>SERVIÇOS</a>
              <a href="#" className="text-xl font-bold text-white hover:text-orange-500 tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>PORTFÓLIO</a>
              <button 
                 onClick={() => {
                   setIsMobileMenuOpen(false);
                   navigate('/login');
                 }}
                 className="text-sm font-bold text-orange-500 uppercase tracking-widest mt-8 border border-orange-500 px-6 py-2 rounded-full"
              >
                 Admin Login
              </button>
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 flex flex-col items-center text-center px-4">
        {/* Background Stars/Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
           <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]"></div>
           <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
           <span className="text-orange-500 mr-2">⚡</span>
           <span className="text-xs font-medium text-gray-300">Agendamento Online</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
          Transforme Seu Visual <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Com Profissionais
          </span>
        </h1>

        <p className="text-gray-400 text-sm md:text-lg mb-10 max-w-xl mx-auto px-4">
          Reserve seu horário com nossos especialistas em corte e tatuagem em poucos cliques.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto px-4">
           <button onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth'})} className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              Agendar Agora
           </button>
           <button onClick={() => navigate('/')} className="w-full md:w-auto px-8 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium">
              Voltar ao Site
           </button>
        </div>
      </section>

      {/* Horizon Line Effect */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-20 bg-orange-500/20 blur-[60px] rounded-[100%]"></div>
      </div>

      {/* Grid & Booking Section */}
      <section id="booking-section" className="relative py-12 md:py-24 px-4 overflow-hidden">
        {/* Neon Grid Background */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
             style={{ 
               backgroundImage: `
                 linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
               transform: 'perspective(500px) rotateX(20deg) scale(1.5)',
               transformOrigin: 'top center'
             }}>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
           <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 md:mb-16">
              Escolha o melhor <br /> horário para você
           </h2>

           {/* Glassmorphism Card */}
           <div className="backdrop-blur-xl bg-orange-900/10 border border-white/10 rounded-3xl p-4 md:p-12 shadow-[0_0_60px_rgba(249,115,22,0.15)] relative overflow-hidden">
              {/* Card Decoration */}
              <div className="flex justify-between items-start mb-8 text-gray-400 font-mono tracking-widest text-xs md:text-sm uppercase">
                 <span>AGENDA</span>
                 <span>2024</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                 {/* Calendar Side */}
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="text-lg md:text-xl font-bold text-white">Junho 2024</h3>
                       <div className="flex gap-2">
                          <button className="px-2 py-1 bg-white/5 rounded hover:bg-white/10 text-xs">Hoje</button>
                          <div className="flex gap-1">
                             <button className="w-6 h-6 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 text-xs"><i className="fa-solid fa-chevron-left"></i></button>
                             <button className="w-6 h-6 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 text-xs"><i className="fa-solid fa-chevron-right"></i></button>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2">
                       {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(day => (
                          <div key={day} className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{day}</div>
                       ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                       {Array.from({ length: startingEmptyCells }).map((_, i) => <div key={`empty-${i}`} />)}
                       {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const isSelected = selectedDay === day;
                          return (
                             <button 
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`
                                   aspect-square rounded-md md:rounded-lg flex items-center justify-center text-sm font-medium transition-all
                                   ${isSelected 
                                     ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.6)]' 
                                     : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'}
                                `}
                             >
                                {day}
                             </button>
                          )
                       })}
                    </div>
                 </div>

                 {/* Form Side */}
                 <div className="w-full lg:w-80 bg-black/40 lg:bg-black/20 rounded-xl p-4 md:p-6 border border-white/5 flex flex-col">
                    <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-6">Informações</h3>
                    
                    <form onSubmit={handleBooking} className="flex-col flex gap-4 h-full">
                       <div className="space-y-4">
                          <div>
                             <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Nome Completo</label>
                             <input 
                               type="text" 
                               required
                               value={formData.name}
                               onChange={e => setFormData({...formData, name: e.target.value})}
                               className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors appearance-none"
                               placeholder="Seu nome"
                             />
                          </div>
                          <div>
                             <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Telefone</label>
                             <input 
                               type="tel" 
                               required
                               value={formData.phone}
                               onChange={e => setFormData({...formData, phone: e.target.value})}
                               className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors appearance-none"
                               placeholder="(00) 00000-0000"
                             />
                          </div>
                          
                          {selectedDay && (
                             <div>
                                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Horário ({selectedDay}/06)</label>
                                <div className="grid grid-cols-4 gap-2">
                                   {timeSlots.map(time => (
                                      <button
                                         key={time}
                                         type="button"
                                         onClick={() => setSelectedTime(time)}
                                         className={`
                                            py-2 md:py-1 rounded text-xs transition-colors border
                                            ${selectedTime === time 
                                              ? 'bg-orange-500 border-orange-500 text-black font-bold' 
                                              : 'bg-transparent border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-white'}
                                         `}
                                      >
                                         {time}
                                      </button>
                                   ))}
                                </div>
                             </div>
                          )}
                       </div>

                       <div className="mt-6 lg:mt-auto pt-2 lg:pt-6">
                          <button 
                             type="submit"
                             disabled={!selectedDay || !selectedTime || !formData.name || !formData.phone}
                             className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all
                                ${(!selectedDay || !selectedTime || !formData.name || !formData.phone)
                                  ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transform hover:-translate-y-0.5'
                                }
                             `}
                          >
                             Confirmar
                          </button>
                       </div>
                    </form>
                 </div>
              </div>

              <div className="mt-8 text-gray-500 font-mono text-[10px] md:text-sm tracking-widest uppercase flex justify-between items-end">
                 <span>PREFERÊNCIA DO CLIENTE</span>
                 <span>MM/YY</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;