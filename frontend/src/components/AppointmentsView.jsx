import { useState } from 'react';
import { Calendar, Clock, User, Check, X, Filter, Search, MessageCircle } from 'lucide-react';

const AppointmentsView = ({ appointments = [], registeredPatients = [], notifications = [] }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'upcoming'
  const [search, setSearch] = useState('');

  // Map notifications to appointments to identify "rescheduled" ones
  const enhancedAppointments = appointments.map(app => {
    const isNew = notifications.some(n => n.patientEmail === app.patientEmail && n.type === 'reschedule');
    const patient = registeredPatients.find(p => p.email === app.patientEmail);
    return {
      ...app,
      patientName: patient?.name || 'Unknown Patient',
      isNew: isNew,
      status: isNew ? 'Rescheduled' : 'Scheduled'
    };
  });

  const filteredAppointments = enhancedAppointments.filter(app => {
    const matchesSearch = app.patientName.toLowerCase().includes(search.toLowerCase());
    if (filter === 'new') return matchesSearch && app.isNew;
    return matchesSearch;
  });

  return (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold">Clinical Appointments</h3>
          <p className="text-muted">Manage and track patient scan schedules</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All Appointments
          </button>
          <button 
            onClick={() => setFilter('new')} 
            className={`btn ${filter === 'new' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
          >
            {filter === 'new' ? <Check size={18} /> : null}
            Rescheduled Requests
          </button>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-surface-alt" style={{ borderColor: 'var(--border)' }}>
          <div className="relative" style={{ width: '300px' }}>
            <Search size={18} className="absolute left-3 top-2.5 text-muted" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="input-field w-full pl-10" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted">
            Showing {filteredAppointments.length} appointments
          </div>
        </div>

        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="text-xs uppercase text-muted" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-alt)' }}>
              <th className="p-4 font-bold">Patient</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Time</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-muted italic">
                  No appointments found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((app, idx) => (
                <tr key={app.id} className={`border-b hover:bg-surface-alt transition-colors animate-fade-in stagger-${idx+2}`} style={{ borderColor: 'var(--border)' }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-bold">{app.patientName}</p>
                        <p className="text-xs text-muted">{app.patientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      {app.date}
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-secondary" />
                      {app.time}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`badge ${app.isNew ? 'badge-danger' : 'badge-success'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="btn btn-ghost" style={{ padding: '0.5rem' }} title="Send Message">
                        <MessageCircle size={18} className="text-primary" />
                      </button>
                      {app.isNew && (
                        <button className="btn btn-success" style={{ padding: '0.5rem' }} title="Accept New Time">
                          <Check size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsView;
