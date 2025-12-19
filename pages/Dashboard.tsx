import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- MOCK DATA ---
const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Fev', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Abr', revenue: 4500 },
  { name: 'Mai', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 8000 },
  { name: 'Ago', revenue: 7000 },
  { name: 'Set', revenue: 9000 },
  { name: 'Out', revenue: 8500 },
  { name: 'Nov', revenue: 10000 },
  { name: 'Dez', revenue: 12000 },
];

const pieData = [
  { name: 'Corte Cabelo', value: 45 },
  { name: 'Barba', value: 25 },
  { name: 'Combo', value: 20 },
  { name: 'Outros', value: 10 },
];
const COLORS = ['#F97316', '#E53935', '#FCD34D', '#525252'];

// Updated Mock Data with Status and Date for filtering
const bookingsData = [
  { id: 1, date: '2023-10-25', time: '10:00', service: 'Corte de Cabelo', expected: '10:30', client: 'Dennis', employee: 'Bermil', status: 'confirmed' },
  { id: 2, date: '2023-10-25', time: '10:25', service: 'Estilização', expected: '10:50', client: 'Bernis', employee: 'Leslie', status: 'confirmed' },
  { id: 3, date: '2023-10-25', time: '10:45', service: 'Corte na Tesoura', expected: '10:55', client: 'Driss', employee: 'Kistin', status: 'pending' },
  { id: 4, date: '2023-10-25', time: '11:00', service: 'Barba Completa', expected: '11:20', client: 'Alex', employee: 'Thieesa', status: 'confirmed' },
  { id: 5, date: '2023-10-24', time: '14:00', service: 'Corte + Barba', expected: '15:00', client: 'Jorge', employee: 'Bermil', status: 'cancelled' },
  { id: 6, date: '2023-10-26', time: '09:00', service: 'Degradê', expected: '09:40', client: 'Miguel', employee: 'Kistin', status: 'confirmed' },
  { id: 7, date: '2023-10-23', time: '16:00', service: 'Pezinho', expected: '16:15', client: 'Lucas', employee: 'Leslie', status: 'cancelled' },
  { id: 8, date: '2023-10-26', time: '11:30', service: 'Corte Infantil', expected: '12:00', client: 'Enzo', employee: 'Thieesa', status: 'pending' },
];

const detailedServicesList = [
    { id: 1, name: "Corte Cabelo", desc: "Corte tradicional ou moderno, inclui lavagem e finalização", prices: "R$ 50 - R$ 70", duration: "45 min", popularity: 85 },
    { id: 2, name: "Barba", desc: "Modelagem e aparagem completa da barba, com toalha quente", prices: "R$ 35 - R$ 50", duration: "30 min", popularity: 60 },
    { id: 3, name: "Combo (Corte + Barba)", desc: "Serviço completo de cabelo e barba com desconto", prices: "R$ 80 - R$ 110", duration: "1 hora 15 min", popularity: 75 },
    { id: 4, name: "Sobrancelha", desc: "Design de sobrancelha com navalha ou pinça", prices: "R$ 20", duration: "15 min", popularity: 40 },
    { id: 5, name: "Degradê Navalhado", desc: "Acabamento premium com navalha e transição perfeita", prices: "R$ 60 - R$ 80", duration: "50 min", popularity: 90 },
];

const detailedClientsList = [
    { id: 1, name: "Carlos Silva", phone: "+55 11 99999-0000", email: "carlos.silva@email.com", lastVisit: "20/10/2024", fidelity: "Gold", preferred: "Corte Cabelo" },
    { id: 2, name: "Ana Paula", phone: "+55 11 98888-1111", email: "ana.paula@email.com", lastVisit: "15/10/2024", fidelity: "Silver", preferred: "Barba" }, // Example data logic quirk
    { id: 3, name: "Marcos Oliveira", phone: "+55 11 97777-2222", email: "marcos.o@email.com", lastVisit: "15/10/2024", fidelity: "Bronze", preferred: "Combo" },
    { id: 4, name: "Niasel Leinha", phone: "+55 11 96666-3333", email: "niasel@email.com", lastVisit: "15/10/2024", fidelity: "Bronze", preferred: "Corte Cabelo" },
    { id: 5, name: "Marquerlez Hamano", phone: "+55 11 95555-4444", email: "marquerlez@email.com", lastVisit: "15/10/2024", fidelity: "Silver", preferred: "Corte Cabelo" },
    { id: 6, name: "Alela Tagana", phone: "+55 11 94444-5555", email: "alela@email.com", lastVisit: "15/10/2024", fidelity: "Bronze", preferred: "Corte Cabelo" },
    { id: 7, name: "Marcos Oliveira", phone: "+55 11 93333-6666", email: "marcos.oliveira@email.com", lastVisit: "15/10/2024", fidelity: "Gold", preferred: "Combo" },
];

const professionalsList = [
    { id: 1, name: "Carlos Silva", role: "Barbeiro Master", specialty: "Cortes Clássicos, Barba", hours: "Seg-Sex: 9h-18h", status: "Disponível", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Ana Souza", role: "Especialista em Barba", specialty: "Modelagem, Tratamento", hours: "Ter-Sáb: 10h-19h", status: "Em Serviço", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Marcos Paulo", role: "Barbeiro Sênior", specialty: "Cortes Modernos, Degradê", hours: "Seg-Sex: 11h-20h", status: "Férias", img: "https://randomuser.me/api/portraits/men/46.jpg" },
    { id: 4, name: "Bruna Mendes", role: "Aprendiz", specialty: "Cortes Básicos, Limpeza", hours: "Seg-Qui: 9h-15h", status: "Disponível", img: "https://randomuser.me/api/portraits/women/65.jpg" },
];

// --- COMPONENTS ---

const DashboardHome = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
    const [bookingFilter, setBookingFilter] = useState<'upcoming' | 'all' | 'cancelled'>('upcoming');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filters, setFilters] = useState({
        professional: '',
        date: ''
    });

    // Filtering Logic
    const filteredBookings = bookingsData.filter(booking => {
        if (bookingFilter === 'cancelled' && booking.status !== 'cancelled') return false;
        if (bookingFilter === 'upcoming' && (booking.status === 'cancelled' || booking.status === 'completed')) return false;
        if (filters.professional && !booking.employee.toLowerCase().includes(filters.professional.toLowerCase())) return false;
        if (filters.date && booking.date !== filters.date) return false;
        return true;
    });

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'confirmed': return <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">CONFIRMADO</span>;
            case 'pending': return <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-1 rounded border border-yellow-500/20">PENDENTE</span>;
            case 'cancelled': return <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded border border-red-500/20">CANCELADO</span>;
            default: return null;
        }
    };

    const stats = [
        { title: 'Total de Clientes', value: '24', icon: 'fa-user', color: 'text-accent-red', target: 'clients' },
        { title: 'Total de Serviços', value: '5', icon: 'fa-scissors', color: 'text-primary', target: 'services' },
        { title: 'Agendamentos', value: bookingsData.filter(b => b.status === 'confirmed').length.toString(), icon: 'fa-calendar-check', color: 'text-orange-400', target: 'appointments_detail' }
    ];

    return (
    <>
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
           {stats.map((stat, idx) => (
             <div key={idx} className="bg-[#121212]/90 backdrop-blur-sm p-6 rounded-xl border border-white/5 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-white/20 transition-colors shadow-lg">
                <div className="flex justify-between items-start z-10">
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.title}</span>
                   <button 
                     onClick={() => setActiveTab(stat.target)}
                     className="text-gray-600 hover:text-white transition-colors cursor-pointer"
                     title="Ver detalhes em tela cheia"
                   >
                     <i className="fa-solid fa-expand text-xs"></i>
                   </button>
                </div>
                <div className="flex items-center gap-3 z-10">
                   <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${stat.color}`}>
                      <i className={`fa-solid ${stat.icon}`}></i>
                   </div>
                   <span className={`text-3xl font-bold font-display ${stat.color} drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]`}>{stat.value}</span>
                </div>
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl group-hover:bg-white/10 transition-colors`}></div>
             </div>
           ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           {/* Revenue Chart */}
           <div className="lg:col-span-2 bg-[#121212]/90 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-white font-bold text-sm md:text-base">Receita Anual</h3>
                 <div className="flex gap-2">
                    <button className="text-[10px] md:text-xs bg-black border border-white/10 px-2 py-1 md:px-3 rounded text-gray-400">Ano <i className="fa-solid fa-chevron-down ml-1"></i></button>
                    <button className="text-[10px] md:text-xs bg-black border border-white/10 p-1.5 rounded text-gray-400"><i className="fa-solid fa-download"></i></button>
                 </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" tick={{fontSize: 10}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`} />
                    <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px'}} />
                    <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Popular Services Chart */}
           <div className="bg-[#121212]/90 backdrop-blur-sm p-6 rounded-xl border border-white/5 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-white font-bold text-sm md:text-base">Serviços Mais Populares</h3>
                 <button className="text-[10px] md:text-xs bg-black border border-white/10 px-2 py-1 md:px-3 rounded text-gray-400">Mês <i className="fa-solid fa-chevron-down ml-1"></i></button>
              </div>
              <div className="flex-grow flex items-center justify-center relative min-h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white">Top</span>
                    <span className="text-xs text-gray-500">Serviços</span>
                 </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                 {pieData.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                       <span className="text-gray-400">{entry.name}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-[#121212]/90 backdrop-blur-sm rounded-xl border border-white/5 overflow-visible shadow-lg relative z-20">
           <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                 <button 
                    onClick={() => setBookingFilter('upcoming')}
                    className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${bookingFilter === 'upcoming' ? 'bg-primary text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                 >
                    Próximos
                 </button>
                 <button 
                    onClick={() => setBookingFilter('all')}
                    className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${bookingFilter === 'all' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                 >
                    Todos
                 </button>
                 <button 
                    onClick={() => setBookingFilter('cancelled')}
                    className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${bookingFilter === 'cancelled' ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                 >
                    Cancelados
                 </button>
              </div>
              
              <div className="relative self-end md:self-auto">
                <button 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`text-xs border px-3 py-1.5 rounded text-gray-400 flex items-center gap-2 transition-colors ${showFilterMenu ? 'bg-primary text-black border-primary font-bold' : 'bg-black border-white/10'}`}
                >
                    Filtrar <i className={`fa-solid ${showFilterMenu ? 'fa-xmark' : 'fa-filter'}`}></i>
                </button>

                {/* Filter Dropdown */}
                {showFilterMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <h4 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Filtrar Por</h4>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] text-gray-500 font-bold mb-1">Profissional</label>
                                <select 
                                    className="w-full bg-black border border-white/10 rounded text-xs text-gray-300 p-2 outline-none focus:border-primary"
                                    value={filters.professional}
                                    onChange={(e) => setFilters({...filters, professional: e.target.value})}
                                >
                                    <option value="">Todos</option>
                                    <option value="Bermil">Bermil</option>
                                    <option value="Leslie">Leslie</option>
                                    <option value="Kistin">Kistin</option>
                                    <option value="Thieesa">Thieesa</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-[10px] text-gray-500 font-bold mb-1">Data Específica</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-black border border-white/10 rounded text-xs text-gray-300 p-2 outline-none focus:border-primary"
                                    value={filters.date}
                                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                                />
                            </div>

                            <div className="pt-2 flex justify-between items-center">
                                <button 
                                    onClick={() => setFilters({professional: '', date: ''})}
                                    className="text-[10px] text-gray-500 hover:text-white underline"
                                >
                                    Limpar
                                </button>
                                <button 
                                    onClick={() => setShowFilterMenu(false)}
                                    className="text-xs bg-primary text-black font-bold px-3 py-1 rounded hover:bg-orange-600"
                                >
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[800px]">
                 <thead className="text-xs text-primary uppercase bg-black/40">
                    <tr>
                       <th className="px-6 py-4">Data/Horário</th>
                       <th className="px-6 py-4">Serviço</th>
                       <th className="px-6 py-4">Término Previsto</th>
                       <th className="px-6 py-4">Cliente</th>
                       <th className="px-6 py-4">Profissional</th>
                       <th className="px-6 py-4 text-center">Status</th>
                       <th className="px-6 py-4 text-right">Ação</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 font-medium text-white">
                                <div className="flex flex-col">
                                    <span>{booking.time}</span>
                                    <span className="text-[10px] text-gray-500">{booking.date}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-400">{booking.service}</td>
                            <td className="px-6 py-4 text-gray-400">{booking.expected}</td>
                            <td className="px-6 py-4 text-orange-200">{booking.client}</td>
                            <td className="px-6 py-4 text-gray-300">{booking.employee}</td>
                            <td className="px-6 py-4 text-center">
                                {getStatusBadge(booking.status)}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-500 hover:text-white group-hover:text-primary transition-colors"><i className="fa-solid fa-ellipsis-vertical px-2"></i></button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-10 text-gray-500">
                                <i className="fa-regular fa-folder-open text-2xl mb-2 block"></i>
                                Nenhum agendamento encontrado para este filtro.
                            </td>
                        </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
    </>
    );
};

// --- DETAILED SERVICES VIEW ---
const ServicesView = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold font-display text-white">Serviços Detalhado - Dashboard</h2>
             <button className="bg-primary hover:bg-orange-600 text-black font-bold py-2 px-6 rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] text-sm">
                Adicionar Serviço
             </button>
        </div>

        <div className="bg-[#121212]/90 border border-white/10 rounded-xl overflow-hidden shadow-xl">
             <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center">
                 <h3 className="text-white font-bold">Serviços</h3>
                 <div className="relative w-64">
                    <input type="text" placeholder="Pesquisar..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-primary outline-none" />
                    <i className="fa-solid fa-magnifying-glass absolute right-3 top-2.5 text-gray-500 text-xs"></i>
                 </div>
             </div>

             <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                     <thead className="text-xs text-white uppercase bg-orange-600">
                        <tr>
                           <th className="px-6 py-4 w-12">#</th>
                           <th className="px-6 py-4">Nome do Serviço</th>
                           <th className="px-6 py-4">Descrição</th>
                           <th className="px-6 py-4">Preços</th>
                           <th className="px-6 py-4">Duração Média</th>
                           <th className="px-6 py-4">Popularidade</th>
                           <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {detailedServicesList.map((service, index) => (
                            <tr key={service.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 text-white font-medium">{service.name}</td>
                                <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{service.desc}</td>
                                <td className="px-6 py-4 text-white">{service.prices}</td>
                                <td className="px-6 py-4 text-gray-300">{service.duration}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${service.popularity}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 hover:text-white hover:border-white/30">Editar</button>
                                        <button className="px-3 py-1 bg-white/5 border border-red-500/20 rounded text-xs text-red-500 hover:bg-red-500/10">Remover</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
             </div>
             
             <div className="p-4 border-t border-white/5 flex justify-center">
                 <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-black border border-white/10 rounded text-gray-500 hover:text-white"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                    <button className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white font-bold">1</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-black border border-white/10 rounded text-gray-500 hover:text-white"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                 </div>
             </div>
        </div>
    </div>
);

// --- DETAILED CLIENTS VIEW ---
const ClientsView = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold font-display text-white mb-6">Clientes Detalhado</h2>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
             <div className="relative flex-1 max-w-md">
                <input type="text" placeholder="Pesquisar cliente..." className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-sm text-white focus:border-primary outline-none" />
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-gray-500 text-xs"></i>
             </div>
             <div className="flex gap-2 overflow-x-auto">
                 <button className="px-4 py-2 border border-orange-500/50 rounded-lg text-orange-500 text-sm bg-black hover:bg-orange-500/10">Status <i className="fa-solid fa-chevron-down ml-1 text-xs"></i></button>
                 <button className="px-4 py-2 border border-orange-500/50 rounded-lg text-orange-500 text-sm bg-black hover:bg-orange-500/10">Fidelidade</button>
                 <button className="px-4 py-2 border border-orange-500/50 rounded-lg text-orange-500 text-sm bg-black hover:bg-orange-500/10">Serviços <i className="fa-solid fa-chevron-down ml-1 text-xs"></i></button>
                 <button className="px-4 py-2 border border-white/10 rounded-lg text-gray-400 text-sm bg-black ml-auto">Sort by <i className="fa-solid fa-chevron-down ml-1 text-xs"></i></button>
                 <button className="bg-primary hover:bg-orange-600 text-black font-bold py-2 px-4 rounded-lg shadow-lg text-sm whitespace-nowrap">
                    + Adicionar Novo Cliente
                 </button>
             </div>
        </div>

        <div className="bg-[#121212]/90 border border-white/10 rounded-xl overflow-hidden">
             <table className="w-full text-sm text-left">
                 <thead className="text-xs text-gray-300 uppercase bg-black/40 border-b border-orange-500/30">
                    <tr>
                       <th className="px-6 py-4 font-bold text-white">Nome</th>
                       <th className="px-6 py-4 font-bold text-white">Contato</th>
                       <th className="px-6 py-4 font-bold text-white">Fidelidade</th>
                       <th className="px-6 py-4 font-bold text-white">Última Visita</th>
                       <th className="px-6 py-4 font-bold text-white">Serviços Preferidos</th>
                       <th className="px-6 py-4 font-bold text-white text-right">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {detailedClientsList.map((client) => {
                        let medalColor = "text-orange-700"; // Bronze
                        let medalIcon = "fa-medal";
                        if(client.fidelity === "Gold") { medalColor = "text-yellow-400"; medalIcon = "fa-award"; }
                        if(client.fidelity === "Silver") { medalColor = "text-gray-300"; medalIcon = "fa-medal"; }

                        return (
                            <tr key={client.id} className="hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-orange-500">
                                <td className="px-6 py-4 text-gray-200 font-medium">{client.name}</td>
                                <td className="px-6 py-4 text-gray-400">{client.phone}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <i className={`fa-solid ${medalIcon} ${medalColor}`}></i>
                                        <span className="text-gray-300">{client.fidelity}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400">{client.lastVisit}</td>
                                <td className="px-6 py-4 text-gray-400">{client.preferred}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded border border-white/10 transition-colors">Ver Perfil</button>
                                </td>
                            </tr>
                        );
                    })}
                 </tbody>
             </table>
             
             <div className="p-4 border-t border-white/5 flex justify-end gap-2">
                 <button className="w-8 h-8 bg-black border border-white/10 rounded text-gray-500 hover:text-white"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                 <button className="w-8 h-8 bg-orange-600 rounded text-white font-bold">1</button>
                 <button className="w-8 h-8 bg-black border border-white/10 rounded text-gray-500 hover:text-white"><i className="fa-solid fa-chevron-right text-xs"></i></button>
             </div>
        </div>
    </div>
);

// --- DETAILED APPOINTMENTS VIEW (Agendamentos Detalhado) ---
const AppointmentsDetailView = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-display text-white">Agendamentos Detalhado - Dashboard</h2>
            <div className="relative">
                 <input type="text" placeholder="Pesquisar..." className="bg-[#121212] border border-white/10 rounded-full py-2 px-4 pl-10 text-sm focus:border-primary outline-none w-64 text-white placeholder-gray-500"/>
                 <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-2.5 text-gray-500 text-xs"></i>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
                <div className="bg-[#121212] p-4 rounded-xl border border-white/10">
                    <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Filtrar por Profissional</h3>
                    <div className="space-y-2">
                        {['Jelm Carilo', 'Ana Souza', 'Pedro Santos'].map((name, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${idx === 0 ? 'bg-orange-500 border-orange-500' : 'border-gray-600 bg-transparent group-hover:border-orange-500'}`}>
                                    {idx === 0 && <i className="fa-solid fa-check text-black text-[10px]"></i>}
                                </div>
                                <span className={`text-sm ${idx === 0 ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>{name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-[#121212] p-4 rounded-xl border border-white/10">
                    <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Filtrar por Serviço</h3>
                    <div className="space-y-2">
                        {['Corte Cabelo', 'Barba', 'Combo', 'Outros'].map((name, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${idx === 0 ? 'bg-orange-500 border-orange-500' : 'border-gray-600 bg-transparent group-hover:border-orange-500'}`}>
                                    {idx === 0 && <i className="fa-solid fa-check text-black text-[10px]"></i>}
                                </div>
                                <span className={`text-sm ${idx === 0 ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>{name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-[#121212] p-4 rounded-xl border border-white/10">
                    <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Filtrar por Status</h3>
                    <div className="space-y-2">
                        {['Confirmado', 'Pendente', 'Concluído', 'Cancelado'].map((name, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${[0, 2].includes(idx) ? 'bg-orange-500 border-orange-500' : 'border-gray-600 bg-transparent group-hover:border-orange-500'}`}>
                                    {[0, 2].includes(idx) && <i className="fa-solid fa-check text-black text-[10px]"></i>}
                                </div>
                                <span className={`text-sm ${[0, 2].includes(idx) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>{name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 bg-[#121212] border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/40">
                     <h3 className="text-xl font-bold text-white">Abril 2024</h3>
                     <div className="flex items-center gap-4">
                         <div className="bg-black border border-white/10 rounded-lg p-1 flex">
                             <button className="px-4 py-1.5 text-xs bg-white/10 text-white font-bold rounded">Dia</button>
                             <button className="px-4 py-1.5 text-xs text-gray-400 hover:text-white rounded">Semana</button>
                             <button className="px-4 py-1.5 text-xs text-gray-400 hover:text-white rounded">Mês</button>
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="text-sm text-gray-400">Abril 2024</span>
                             <div className="flex">
                                 <button className="w-8 h-8 bg-black border border-white/10 rounded-l flex items-center justify-center text-gray-400 hover:text-white"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                                 <button className="w-8 h-8 bg-black border border-white/10 rounded-r flex items-center justify-center text-gray-400 hover:text-white"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                             </div>
                         </div>
                     </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[800px] grid grid-cols-7 border-b border-white/10 text-center bg-black/20">
                         {['Segunda-feira, 15', 'Terça-feira, 16', 'Quarta-feira, 17', 'Quinta-feira, 18', 'Sexta-feira, 19', 'Sábado, 20', 'Domingo, 21'].map(day => (
                             <div key={day} className="py-3 text-xs font-bold text-gray-400 uppercase tracking-wider border-r border-white/5 last:border-r-0">{day}</div>
                         ))}
                    </div>
                    {/* Simplified Grid Mockup */}
                    <div className="min-w-[800px] grid grid-cols-7 auto-rows-[150px] bg-black/20">
                         {/* Week Grid */}
                         {[0,1,2,3,4,5,6].map((dayIndex) => (
                             <div key={dayIndex} className="border-r border-b border-white/5 p-2 relative group hover:bg-white/5 transition-colors">
                                 <span className="absolute top-2 right-2 text-xs text-gray-600 font-bold">{15 + dayIndex}</span>
                                 
                                 {/* Mock Appointments */}
                                 {dayIndex === 4 && (
                                     <>
                                        <div className="mb-2 bg-[#1a1a1a] border-l-2 border-orange-500 p-2 rounded shadow-sm cursor-pointer hover:bg-[#252525]">
                                            <div className="text-[10px] text-gray-400 mb-1">08:00 - 10:00</div>
                                            <div className="flex items-center gap-1 mb-1"><i className="fa-solid fa-user text-[10px] text-orange-500"></i> <span className="text-[10px] text-white font-bold">Carlos Oliveira</span></div>
                                            <div className="text-[10px] text-gray-500 mb-1">Corte Cabelo</div>
                                            <div className="text-[10px] text-gray-600"><i className="fa-solid fa-user-tie mr-1"></i>Prof. Jelm Carilo</div>
                                            <div className="mt-2 flex gap-1">
                                                <button className="text-[8px] bg-white/5 border border-white/10 px-1 rounded text-gray-400 hover:text-white">Editar</button>
                                                <button className="text-[8px] bg-white/5 border border-white/10 px-1 rounded text-gray-400 hover:text-white">Cancelar</button>
                                            </div>
                                        </div>
                                     </>
                                 )}
                                 {dayIndex === 5 && (
                                     <>
                                        <div className="mb-2 bg-[#1a1a1a] border-l-2 border-green-500 p-2 rounded shadow-sm cursor-pointer hover:bg-[#252525]">
                                            <div className="text-[10px] text-gray-400 mb-1">09:00 - 10:00</div>
                                            <div className="flex items-center gap-1 mb-1"><i className="fa-solid fa-user text-[10px] text-green-500"></i> <span className="text-[10px] text-white font-bold">Marcos O.</span></div>
                                            <div className="text-[10px] text-gray-500 mb-1">Barba</div>
                                        </div>
                                        <div className="bg-[#1a1a1a] border-l-2 border-blue-500 p-2 rounded shadow-sm cursor-pointer hover:bg-[#252525]">
                                            <div className="text-[10px] text-gray-400 mb-1">14:00 - 15:00</div>
                                            <div className="flex items-center gap-1 mb-1"><i className="fa-solid fa-user text-[10px] text-blue-500"></i> <span className="text-[10px] text-white font-bold">Ana P.</span></div>
                                            <div className="text-[10px] text-gray-500 mb-1">Combo</div>
                                        </div>
                                     </>
                                 )}
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const ProfessionalsView = () => (
    <div className="space-y-6">
        <div className="bg-[#121212]/50 p-4 rounded-xl border border-white/10 mb-6">
             <h3 className="text-white font-bold text-lg mb-4">Gerenciamento de Profissionais</h3>
             <div className="flex flex-col md:flex-row justify-between gap-4">
                 <div className="flex gap-2">
                     <button className="px-4 py-2 bg-black border border-white/10 rounded text-gray-400 text-sm flex items-center gap-2">Especialização <i className="fa-solid fa-chevron-down text-xs"></i></button>
                     <button className="px-4 py-2 bg-black border border-white/10 rounded text-gray-400 text-sm flex items-center gap-2">Status <i className="fa-solid fa-chevron-down text-xs"></i></button>
                     <button className="bg-primary text-black px-4 py-2 rounded text-sm font-bold flex items-center gap-2"><i className="fa-solid fa-filter"></i> Filtrar</button>
                 </div>
                 <div className="flex gap-2">
                     <button className="w-8 h-8 bg-black border border-white/10 rounded flex items-center justify-center text-gray-400"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                     <button className="w-8 h-8 bg-black border border-white/10 rounded flex items-center justify-center text-gray-400"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                     <button className="bg-primary hover:bg-orange-600 text-black font-bold py-2 px-4 rounded text-sm flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Adicionar Profissional
                     </button>
                 </div>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalsList.map(prof => (
                <div key={prof.id} className="bg-[#121212] border border-orange-500/30 p-6 rounded-xl flex gap-6 hover:border-orange-500 transition-colors group relative overflow-hidden">
                    <div className="w-32 h-40 bg-gray-800 rounded-lg overflow-hidden shrink-0 border border-white/5">
                        <img src={prof.img} alt={prof.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col justify-between w-full relative z-10">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-white">{prof.name}</h3>
                                <span className="text-[10px] text-gray-500">{prof.status}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{prof.role}</p>
                            
                            <div className="space-y-1 mt-4">
                                <p className="text-xs text-gray-300"><strong className="text-white">Especialização:</strong> {prof.specialty}</p>
                                <p className="text-xs text-gray-300"><strong className="text-white">Horário:</strong> {prof.hours}</p>
                                <p className="text-xs text-gray-300"><strong className="text-white">Status:</strong> <span className={prof.status === "Disponível" ? "text-green-500" : "text-yellow-500"}>{prof.status}</span></p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                             <button className="bg-primary hover:bg-orange-600 text-black text-xs font-bold px-4 py-2 rounded">Ver Perfil</button>
                             <button className="bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-bold px-3 py-2 rounded flex items-center gap-1"><i className="fa-solid fa-pen"></i> Editar</button>
                             <button className="bg-transparent border border-red-500/20 hover:bg-red-500/10 text-red-500 text-xs font-bold px-3 py-2 rounded flex items-center gap-1"><i className="fa-solid fa-trash"></i> Excluir</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="flex justify-center mt-8">
            <span className="text-gray-500 text-sm">Página 1 de 3</span>
        </div>
    </div>
);

// Basic Agenda View (renamed to simplify, though the detail view is now dominant)
const AgendaView = () => (
    <div className="text-center py-20">
        <h2 className="text-xl text-gray-400 mb-4">Visualização de Agenda Padrão</h2>
        <p className="text-sm text-gray-600">Use o card "Agendamentos" no Painel para ver a versão detalhada.</p>
    </div>
);

const SettingsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-6">Configurações Gerais</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-xs font-bold mb-2">Nome do Negócio</label>
                    <input type="text" placeholder="Nome do Negócio" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs font-bold mb-2">Endereço</label>
                    <input type="text" placeholder="Endereço - São Paulo" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs font-bold mb-2">Telefone</label>
                    <input type="text" placeholder="(41) 5223-4678" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs font-bold mb-2">E-mail de Contato</label>
                    <input type="text" placeholder="E-mail@egmail.com" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                </div>
                
                <div className="pt-4 space-y-4">
                    <label className="block text-white font-bold text-sm">Fuso Horário</label>
                    <div className="relative">
                         <select className="w-full bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 text-sm text-gray-300 appearance-none outline-none">
                             <option>Fuso 1 - Fuso Horário</option>
                         </select>
                         <i className="fa-solid fa-chevron-down absolute right-4 top-3 text-gray-500 text-xs pointer-events-none"></i>
                    </div>

                    <label className="block text-white font-bold text-sm mt-4">Horário de Funcionamento</label>
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <span className="text-gray-500 text-xs absolute -top-5">Ano</span>
                            <select className="w-full bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 text-sm text-gray-300 appearance-none outline-none">
                                <option>09:00</option>
                            </select>
                             <i className="fa-solid fa-chevron-down absolute right-4 top-3 text-gray-500 text-xs pointer-events-none"></i>
                        </div>
                        <div className="flex-1 relative">
                            <span className="text-gray-500 text-xs absolute -top-5">Horário</span>
                            <select className="w-full bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 text-sm text-gray-300 appearance-none outline-none">
                                <option>12:00</option>
                            </select>
                             <i className="fa-solid fa-chevron-down absolute right-4 top-3 text-gray-500 text-xs pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-primary text-black font-bold py-3 rounded mt-6 hover:bg-orange-600 transition-colors">
                    Salvar Alterações
                </button>
            </div>
        </div>

        <div className="space-y-6">
            {/* Perfil do Usuário */}
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-lg">Gerenciamento de Perfil do Usuário</h3>
                    <button className="text-orange-500 text-xs hover:text-orange-400">Atualizar Perfil</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2">Nome Completo</label>
                        <input type="text" placeholder="Nome Completo" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2">E-mail</label>
                        <input type="text" placeholder="E-mail@egmail.com" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2">Alterar Senha</label>
                        <div className="relative">
                            <input type="password" placeholder="Alterar Senha" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary outline-none" />
                            <i className="fa-solid fa-eye-slash absolute right-4 top-4 text-gray-500 text-xs cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="pt-2">
                         <button className="border border-orange-500 text-orange-500 bg-transparent px-4 py-2 rounded text-sm hover:bg-orange-500/10">Upload Foto de Perfil</button>
                    </div>
                    <button className="w-full bg-primary text-black font-bold py-3 rounded mt-2 hover:bg-orange-600 transition-colors">
                        Atualizar Perfil
                    </button>
                </div>
            </div>

            {/* Notificações */}
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-6">Preferências de Notificação</h3>
                <div className="space-y-4">
                    {['Notificações por E-mail', 'Notificações por SMS', 'Notificações Push', 'Lembretes de Agendamento'].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">{item}</span>
                            <div className="w-10 h-5 bg-orange-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-md"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN LAYOUT COMPONENT ---

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'services', 'clients', 'professionals', 'agenda', 'settings', 'appointments_detail'

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const getTitle = () => {
      switch(activeTab) {
          case 'services': return 'Serviços';
          case 'clients': return 'Clientes';
          case 'professionals': return 'Profissionais';
          case 'agenda': return 'Agenda';
          case 'appointments_detail': return 'Agendamentos Detalhado';
          case 'settings': return 'Configurações';
          default: return 'Painel de Controle';
      }
  }

  return (
    <div 
      className="flex h-screen bg-[#050505] text-gray-200 overflow-hidden font-body relative"
      style={{
        backgroundImage: `
          linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-full w-64 bg-black flex flex-col border-r border-white/5 transition-transform duration-300 ease-in-out shadow-[5px_0_30px_rgba(0,0,0,0.5)]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between md:justify-start gap-2 border-b border-white/5 cursor-pointer" onClick={() => navigate('/')}>
           <div className="flex items-center gap-2">
             <i className="fa-solid fa-scissors text-accent-red text-xl"></i>
             <span className="font-display font-bold text-xl text-white tracking-wider">BERGER</span>
           </div>
           {/* Close button for mobile */}
           <button className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
             <i className="fa-solid fa-xmark"></i>
           </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
           {[
             { id: 'dashboard', name: 'Painel', icon: 'fa-chart-line' },
             { id: 'services', name: 'Serviços', icon: 'fa-layer-group' },
             { id: 'clients', name: 'Clientes', icon: 'fa-users' },
             { id: 'professionals', name: 'Profissionais', icon: 'fa-id-card' },
             { id: 'agenda', name: 'Agenda', icon: 'fa-calendar' },
             { id: 'settings', name: 'Configurações', icon: 'fa-gear' }
           ].map((item) => (
             <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors text-left
                    ${activeTab === item.id 
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                `}
             >
                <i className={`fa-solid w-5 ${item.icon}`}></i>
                <span className="font-medium text-sm">{item.name}</span>
             </button>
           ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <button onClick={handleLogout} className="w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors">
              <i className="fa-solid fa-arrow-right-from-bracket w-5"></i>
              <span className="font-medium text-sm">Sair</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
           <div className="flex items-center gap-4">
             <button className="md:hidden text-white bg-[#121212] p-2 rounded border border-white/10" onClick={() => setIsSidebarOpen(true)}>
               <i className="fa-solid fa-bars"></i>
             </button>
             <h1 className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-md">{getTitle()}</h1>
           </div>
           
           <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                 <input type="text" placeholder="Pesquisar..." className="bg-[#121212] border border-white/10 rounded-full py-2 px-4 pl-10 text-sm focus:ring-1 focus:ring-primary outline-none w-full md:w-64 text-white placeholder-gray-500 shadow-sm"/>
                 <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-2.5 text-gray-500 text-xs"></i>
              </div>
              <div className="flex items-center gap-4 self-end md:self-auto">
                <div className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center border border-white/10 relative shadow-sm">
                   <i className="fa-solid fa-bell text-gray-400"></i>
                   <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent-red rounded-full shadow-[0_0_5px_#E53935]"></span>
                </div>
                <div className="flex items-center gap-3 bg-[#121212] py-1.5 px-3 rounded-full border border-white/10 shadow-sm">
                   <img src="https://picsum.photos/100/100" className="w-8 h-8 rounded-full object-cover" alt="Admin"/>
                   <div className="hidden md:block">
                      <p className="text-xs font-bold text-white">Jelm Carilo</p>
                      <p className="text-[10px] text-gray-500">Admin</p>
                   </div>
                   <i className="fa-solid fa-chevron-down text-[10px] text-gray-500"></i>
                </div>
              </div>
           </div>
        </header>

        {/* Content Area */}
        <div className="animate-fade-in">
            {activeTab === 'dashboard' && <DashboardHome setActiveTab={setActiveTab} />}
            {activeTab === 'services' && <ServicesView />}
            {activeTab === 'clients' && <ClientsView />}
            {activeTab === 'professionals' && <ProfessionalsView />}
            {activeTab === 'agenda' && <AppointmentsDetailView />} 
            {activeTab === 'appointments_detail' && <AppointmentsDetailView />}
            {activeTab === 'settings' && <SettingsView />}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;