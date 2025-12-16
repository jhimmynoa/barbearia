import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
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
  { name: '18-24', value: 20 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 25 },
  { name: '45+', value: 10 },
];

const COLORS = ['#F97316', '#E53935', '#FCD34D', '#525252'];

const bookings = [
  { id: 1, time: '10:00', service: 'Corte de Cabelo', expected: '10:30', client: 'Dennis', employee: 'Bermil', action: '...' },
  { id: 2, time: '10:25', service: 'Estilização', expected: '10:50', client: 'Bernis', employee: 'Leslie', action: '...' },
  { id: 3, time: '10:45', service: 'Corte na Tesoura', expected: '10:55', client: 'Driss', employee: 'Kistin', action: '...' },
  { id: 4, time: '11:00', service: 'Barba Completa', expected: '11:20', client: 'Alex', employee: 'Thieesa', action: '...' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

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
        <div className="p-6 flex items-center justify-between md:justify-start gap-2 border-b border-white/5">
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
           <div className="px-4 py-3 bg-primary/10 text-primary rounded-lg flex items-center gap-3 cursor-pointer border border-primary/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
              <i className="fa-solid fa-chart-line w-5"></i>
              <span className="font-semibold text-sm">Painel</span>
           </div>
           {[
             { name: 'Serviços', icon: 'fa-layer-group' },
             { name: 'Clientes', icon: 'fa-users' },
             { name: 'Profissionais', icon: 'fa-id-card' },
             { name: 'Agenda', icon: 'fa-calendar' },
             { name: 'Configurações', icon: 'fa-gear' }
           ].map((item, idx) => (
             <div key={idx} className="px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg flex items-center gap-3 cursor-pointer transition-colors">
                <i className={`fa-solid w-5 ${item.icon}`}></i>
                <span className="font-medium text-sm">{item.name}</span>
             </div>
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
             <h1 className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-md">Painel de Controle</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
           {[
             { title: 'Total de Clientes', value: '24', icon: 'fa-user', color: 'text-accent-red' },
             { title: 'Total de Serviços', value: '6', icon: 'fa-scissors', color: 'text-primary' },
             { title: 'Agendamentos', value: '6', icon: 'fa-calendar-check', color: 'text-orange-400' }
           ].map((stat, idx) => (
             <div key={idx} className="bg-[#121212]/90 backdrop-blur-sm p-6 rounded-xl border border-white/5 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-white/20 transition-colors shadow-lg">
                <div className="flex justify-between items-start z-10">
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.title}</span>
                   <i className="fa-solid fa-expand text-gray-600 text-xs"></i>
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
                  <AreaChart data={data}>
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

           {/* Customer Age Chart */}
           <div className="bg-[#121212]/90 backdrop-blur-sm p-6 rounded-xl border border-white/5 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-white font-bold text-sm md:text-base">Idade dos Clientes</h3>
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
                    <span className="text-2xl font-bold text-white">100%</span>
                    <span className="text-xs text-gray-500">Total</span>
                 </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                 {pieData.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                       <span className="text-gray-400">{entry.name} Anos</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-[#121212]/90 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden shadow-lg">
           <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                 <button className="bg-primary text-black text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-[0_0_10px_rgba(249,115,22,0.3)]">Próximos</button>
                 <button className="text-gray-400 hover:text-white text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap">Todos</button>
                 <button className="text-gray-400 hover:text-white text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap">Cancelados</button>
              </div>
              <button className="text-xs bg-black border border-white/10 px-3 py-1.5 rounded text-gray-400 flex items-center gap-2 self-end md:self-auto">
                 Filtrar <i className="fa-solid fa-filter"></i>
              </button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[800px]">
                 <thead className="text-xs text-primary uppercase bg-black/40">
                    <tr>
                       <th className="px-6 py-4">Horário</th>
                       <th className="px-6 py-4">Serviço</th>
                       <th className="px-6 py-4">Término Previsto</th>
                       <th className="px-6 py-4">Cliente</th>
                       <th className="px-6 py-4">Profissional</th>
                       <th className="px-6 py-4 text-right">Ação</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {bookings.map((booking) => (
                       <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{booking.time}</td>
                          <td className="px-6 py-4 text-gray-400">{booking.service}</td>
                          <td className="px-6 py-4 text-gray-400">{booking.expected}</td>
                          <td className="px-6 py-4 text-orange-200">{booking.client}</td>
                          <td className="px-6 py-4 text-gray-300">{booking.employee}</td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-gray-500 hover:text-white"><i className="fa-solid fa-ellipsis"></i></button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-white/5 text-right">
              <button className="text-xs text-primary hover:text-orange-400 font-bold flex items-center justify-end gap-1 ml-auto">
                 Ver Todos <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
           </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;