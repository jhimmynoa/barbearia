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

const bookings = [
  { id: 1, time: '10:00', service: 'Corte de Cabelo', expected: '10:30', client: 'Dennis', employee: 'Bermil', action: '...' },
  { id: 2, time: '10:25', service: 'Estilização', expected: '10:50', client: 'Bernis', employee: 'Leslie', action: '...' },
  { id: 3, time: '10:45', service: 'Corte na Tesoura', expected: '10:55', client: 'Driss', employee: 'Kistin', action: '...' },
  { id: 4, time: '11:00', service: 'Barba Completa', expected: '11:20', client: 'Alex', employee: 'Thieesa', action: '...' },
];

const servicesList = [
    { id: 1, name: "Corte de Cabelo", desc: "Corte de cabelo com uma parte de corte de cabelo.", price: "R$ 40,00", time: "29 min", icon: "fa-scissors" },
    { id: 2, name: "Barba Completa", desc: "Barba completa com uma parte de barba completa.", price: "R$ 30,00", time: "20 min", icon: "fa-user-astronaut" }, // Using generic icon as placeholder for beard
    { id: 3, name: "Corte + Barba", desc: "Corte de cabelo, como a corte + Barba + corte de cabelo.", price: "R$ 65,00", time: "50 min", icon: "fa-scissors" },
    { id: 4, name: "Degradê", desc: "Corte de cabelo com degradê com a rminho de corte + degradê.", price: "R$ 45,00", time: "20 min", icon: "fa-lines-leaning" },
    { id: 5, name: "Sobrancelha", desc: "Sobrancelha como será de sobrancelha.", price: "R$ 15,00", time: "15 min", icon: "fa-eye" },
    { id: 6, name: "Pezinho", desc: "Pezinho do pezinho.", price: "R$ 10,00", time: "Duração", icon: "fa-shoe-prints" },
];

const clientsList = [
    { id: 1, name: "João Silva", phone: "(11) 98765-4321", email: "joao.silva@email.com", lastVisit: "15 Out 2023" },
    { id: 2, name: "Maria Souza", phone: "(21) 91234-5678", email: "maria.souza@email.com", lastVisit: "10 Out 2023" },
    { id: 3, name: "Carlos Pereira", phone: "(31) 99876-5432", email: "carlos.pereira@email.com", lastVisit: "05 Out 2023" },
    { id: 4, name: "Ana Lima", phone: "(41) 97654-3210", email: "ana.lima@email.com", lastVisit: "28 Set 2023" },
    { id: 5, name: "Pedro Santos", phone: "(51) 98888-7777", email: "pedro.santos@email.com", lastVisit: "20 Set 2023" },
];

const professionalsList = [
    { id: 1, name: "Carlos Silva", role: "Barbeiro Master", specialty: "Cortes Clássicos, Barba", hours: "Seg-Sex: 9h-18h", status: "Disponível", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Ana Souza", role: "Especialista em Barba", specialty: "Modelagem, Tratamento", hours: "Ter-Sáb: 10h-19h", status: "Em Serviço", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Marcos Paulo", role: "Barbeiro Sênior", specialty: "Cortes Modernos, Degradê", hours: "Seg-Sex: 11h-20h", status: "Férias", img: "https://randomuser.me/api/portraits/men/46.jpg" },
    { id: 4, name: "Bruna Mendes", role: "Aprendiz", specialty: "Cortes Básicos, Limpeza", hours: "Seg-Qui: 9h-15h", status: "Disponível", img: "https://randomuser.me/api/portraits/women/65.jpg" },
];

// --- COMPONENTS ---

const DashboardHome = () => (
    <>
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

           {/* Popular Services Chart (Previously Customer Age) */}
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
        </div>
    </>
);

const ServicesView = () => (
    <div className="space-y-6">
        <div className="flex justify-end">
             <button className="bg-primary hover:bg-orange-600 text-black font-bold py-2 px-6 rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] text-sm">
                Adicionar Novo Serviço
             </button>
        </div>
        <div className="space-y-4">
            {servicesList.map(service => (
                <div key={service.id} className="bg-[#121212]/90 border border-white/10 p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                            <i className={`fa-solid ${service.icon} text-xl`}></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">{service.name}</h3>
                            <p className="text-gray-400 text-sm max-w-md">{service.desc}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs">
                                <span className="font-bold text-white">{service.price}</span>
                                <span className="text-gray-500"><i className="fa-regular fa-clock mr-1"></i>{service.time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-orange-500 text-black text-xs font-bold rounded hover:bg-orange-600">Editar</button>
                        <button className="px-4 py-2 bg-white/5 text-gray-400 text-xs font-bold rounded border border-white/10 hover:text-white hover:bg-white/10">Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ClientsView = () => (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
             <div className="relative flex-1 max-w-md flex gap-2">
                <div className="relative flex-1">
                   <input type="text" placeholder="Pesquisar..." className="w-full bg-[#121212] border border-white/10 rounded px-4 py-2 pl-10 text-sm text-white focus:border-primary outline-none" />
                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-500 text-xs"></i>
                </div>
                <button className="w-10 h-10 bg-primary rounded flex items-center justify-center text-black">
                    <i className="fa-solid fa-filter"></i>
                </button>
             </div>
             <div className="flex gap-2">
                 <button className="px-4 py-2 border border-white/10 rounded text-gray-400 text-sm hover:text-white bg-[#121212]">Filtrar por Status <i className="fa-solid fa-chevron-down ml-1"></i></button>
                 <button className="px-4 py-2 border border-white/10 rounded text-gray-400 text-sm hover:text-white bg-[#121212]">Última Visita <i className="fa-solid fa-chevron-down ml-1"></i></button>
                 <button className="bg-primary hover:bg-orange-600 text-black font-bold py-2 px-6 rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] text-sm">
                    Adicionar Cliente
                 </button>
             </div>
        </div>

        <div className="bg-[#121212]/90 border border-white/10 rounded-xl overflow-hidden">
             <table className="w-full text-sm text-left">
                 <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
                    <tr>
                       <th className="px-6 py-4 font-bold">Nome</th>
                       <th className="px-6 py-4 font-bold">Contato</th>
                       <th className="px-6 py-4 font-bold">E-mail</th>
                       <th className="px-6 py-4 font-bold">Última Visita</th>
                       <th className="px-6 py-4 font-bold text-right">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {clientsList.map(client => (
                        <tr key={client.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-white font-medium">{client.name}</td>
                            <td className="px-6 py-4 text-gray-400">{client.phone}</td>
                            <td className="px-6 py-4 text-gray-400">{client.email}</td>
                            <td className="px-6 py-4 text-gray-400">{client.lastVisit}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="w-8 h-8 rounded bg-orange-500 text-black flex items-center justify-center hover:bg-orange-600"><i className="fa-solid fa-pen text-xs"></i></button>
                                    <button className="w-8 h-8 rounded bg-red-500/20 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500/30"><i className="fa-solid fa-trash text-xs"></i></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                 </tbody>
             </table>
             <div className="p-4 border-t border-white/5 flex justify-center gap-2">
                 <button className="w-8 h-8 bg-primary text-black font-bold rounded flex items-center justify-center">1</button>
                 <button className="w-8 h-8 bg-black border border-white/10 text-gray-400 rounded flex items-center justify-center hover:text-white">2</button>
                 <button className="w-8 h-8 bg-black border border-white/10 text-gray-400 rounded flex items-center justify-center hover:text-white">3</button>
                 <span className="flex items-end px-2 text-gray-600">...</span>
                 <button className="px-4 h-8 bg-black border border-white/10 text-gray-400 rounded flex items-center justify-center hover:text-white text-xs">Próximo</button>
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

const AgendaView = () => (
    <div className="space-y-6">
         <div className="flex flex-col md:flex-row justify-between items-center bg-[#121212] p-4 rounded-xl border border-white/10 gap-4">
             <div className="flex items-center gap-4">
                 <button className="w-8 h-8 rounded bg-black border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                 <span className="text-white font-bold text-lg">Setembro 2023</span>
                 <button className="w-8 h-8 rounded bg-black border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"><i className="fa-solid fa-chevron-right text-xs"></i></button>
             </div>
             
             <div className="bg-black border border-white/10 rounded-lg p-1 flex gap-1">
                 <button className="px-4 py-1 text-xs text-gray-400 hover:text-white rounded">Dia</button>
                 <button className="px-4 py-1 text-xs bg-primary text-black font-bold rounded shadow-lg">Semana</button>
                 <button className="px-4 py-1 text-xs text-gray-400 hover:text-white rounded">Mês</button>
             </div>

             <button className="bg-primary hover:bg-orange-600 text-black font-bold py-2 px-6 rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] text-sm">
                Adicionar Agendamento
             </button>
         </div>

         <div className="bg-[#121212] border border-white/10 rounded-xl overflow-x-auto">
             <div className="min-w-[1000px] p-6">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-6 px-12">
                      <h2 className="text-2xl font-bold text-white">18 Set - 24 Set</h2>
                      <div className="flex gap-2">
                          <button className="w-8 h-8 bg-black border border-white/10 rounded flex items-center justify-center text-gray-400"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                          <button className="w-8 h-8 bg-black border border-white/10 rounded flex items-center justify-center text-gray-400"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                      </div>
                  </div>

                  {/* Calendar Grid Header */}
                  <div className="grid grid-cols-8 gap-px bg-white/5 border border-white/10 rounded-t-lg">
                      <div className="p-4"></div> {/* Time Col */}
                      {['18 Set', '19 Set', '20 Set', '21 Set', '22 Set', '23 Set', '24 Set'].map(date => (
                          <div key={date} className="p-4 text-center text-sm font-bold text-white bg-black/40">{date}</div>
                      ))}
                  </div>

                  {/* Calendar Rows */}
                  <div className="grid grid-cols-8 gap-px bg-white/5 border-x border-b border-white/10">
                       {/* Row 08:00 */}
                       <div className="bg-[#121212] text-xs text-gray-500 p-2 text-center border-r border-white/5">08:00</div>
                       {[1,2,3,4,5,6,7].map(i => <div key={i} className="bg-[#121212] border-r border-white/5 h-16 relative group hover:bg-white/5 transition-colors"></div>)}

                       {/* Row 09:00 */}
                       <div className="bg-[#121212] text-xs text-gray-500 p-2 text-center border-r border-white/5">09:00</div>
                       {[1,2,3,4,5,6,7].map(i => <div key={i} className="bg-[#121212] border-r border-white/5 h-16 relative group hover:bg-white/5 transition-colors"></div>)}

                       {/* Row 10:00 */}
                       <div className="bg-[#121212] text-xs text-gray-500 p-2 text-center border-r border-white/5">10:00</div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-primary/90 rounded p-1 h-full text-[10px] text-black font-bold border-l-2 border-white shadow-sm cursor-pointer hover:bg-orange-500">
                               Corte com João<br/>10:00 - 11:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-amber-700/80 rounded p-1 h-full text-[10px] text-white font-bold border-l-2 border-amber-500 shadow-sm cursor-pointer hover:brightness-110">
                               Corte com João<br/>10:00 - 11:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-gray-700/80 rounded p-1 h-full text-[10px] text-white font-bold border-l-2 border-gray-400 shadow-sm cursor-pointer hover:brightness-110">
                               Corte com João<br/>10:00 - 11:00
                           </div>
                       </div>
                       {[4,5].map(i => <div key={i} className="bg-[#121212] border-r border-white/5 h-16 relative"></div>)}
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-primary/90 rounded p-1 h-full text-[10px] text-black font-bold border-l-2 border-white shadow-sm cursor-pointer hover:bg-orange-500">
                               Corte com João<br/>10:00 - 11:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative"></div>

                       {/* Row 14:00 */}
                       <div className="bg-[#121212] text-xs text-gray-500 p-2 text-center border-r border-white/5">14:00</div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative"></div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-amber-700/80 rounded p-1 h-full text-[10px] text-white font-bold border-l-2 border-amber-500 shadow-sm cursor-pointer hover:brightness-110">
                               Barba com Pedro<br/>14:30 - 15:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative"></div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-amber-700/80 rounded p-1 h-full text-[10px] text-white font-bold border-l-2 border-amber-500 shadow-sm cursor-pointer hover:brightness-110">
                               Barba com Pedro<br/>14:30 - 15:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-gray-700/80 rounded p-1 h-full text-[10px] text-white font-bold border-l-2 border-gray-400 shadow-sm cursor-pointer hover:brightness-110">
                               Barba com Pedro<br/>14:30 - 15:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-amber-700/80 rounded p-1 h-full text-[10px] text-white font-bold border-l-2 border-amber-500 shadow-sm cursor-pointer hover:brightness-110">
                               Barba com Pedro<br/>14:30 - 15:00
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative"></div>

                       {/* Row 17:00 */}
                       <div className="bg-[#121212] text-xs text-gray-500 p-2 text-center border-r border-white/5">17:00</div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-primary/90 rounded p-1 h-full text-[10px] text-black font-bold border-l-2 border-white shadow-sm cursor-pointer hover:bg-orange-500">
                               Corte e Barba com Ana<br/>17:00 - 18:30
                           </div>
                       </div>
                       {[2,3,4,5].map(i => <div key={i} className="bg-[#121212] border-r border-white/5 h-16 relative"></div>)}
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative p-1">
                           <div className="bg-amber-900/60 rounded p-1 h-full text-[10px] text-gray-300 font-bold border-l-2 border-amber-700 shadow-sm cursor-pointer hover:brightness-110">
                               Corte e Barba com Ana<br/>17:00 - 18:30
                           </div>
                       </div>
                       <div className="bg-[#121212] border-r border-white/5 h-16 relative"></div>
                  </div>
             </div>

             <div className="p-4 bg-black border-t border-white/10 flex justify-between items-center">
                 <button className="text-gray-400 text-sm bg-[#121212] border border-white/10 px-4 py-2 rounded flex items-center gap-2">Todos Profissionais <i className="fa-solid fa-chevron-down text-xs"></i></button>
                 <span className="text-gray-500 text-sm">Cancelados</span>
                 <button className="bg-black text-white text-sm border border-white/20 px-4 py-2 rounded hover:bg-white/5">Hoje</button>
             </div>
         </div>
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
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'services', 'clients', 'professionals', 'agenda', 'settings'

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
            {activeTab === 'dashboard' && <DashboardHome />}
            {activeTab === 'services' && <ServicesView />}
            {activeTab === 'clients' && <ClientsView />}
            {activeTab === 'professionals' && <ProfessionalsView />}
            {activeTab === 'agenda' && <AgendaView />}
            {activeTab === 'settings' && <SettingsView />}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;