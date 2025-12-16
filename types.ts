export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface Booking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  employee: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  color: string;
}
