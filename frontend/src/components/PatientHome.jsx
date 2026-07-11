import { useState } from 'react';
import { Calendar, Heart, ShieldAlert, ArrowRight, Clock, Check } from 'lucide-react';

const PatientHome = ({ onNavigate, username, latestReport, appointment, allAppointments = [], onReschedule }) => {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', 
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
  ];

  const getSlotStatus = (time) => {
    if (!newDate) return 'available';
    const isTaken = allAppointments.some(app => app.date === newDate && app.time === time);
    return isTaken ? 'taken' : 'available';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDate && newTime) {
      onReschedule(newDate, newTime);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsRescheduling(false);
      }, 2000);
    }
  };
  return (
    <div className="space-y-6">
      <div className="card text-center sm:text-left" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', border: 'none' }}>
        <h2 className="text-3xl font-bold mb-2 text-white" style={{ color: 'white' }}>Hello, {username || 'Guest'}</h2>
        <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Welcome to your personal Fetal Anemia Care Portal. Here you can easily track your scan results and appointments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card flex flex-col justify-between" style={{ borderTop: '4px solid var(--secondary)' }}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: '0.75rem', color: 'var(--secondary)' }}>
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold">Next Appointment</h3>
            </div>
            <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--background)' }}>
              <p className="font-bold text-lg text-main">{appointment?.date || 'Nov 14, 2026'}</p>
              <p className="text-sm text-muted">{appointment?.time || '10:00 AM'} • {appointment?.doctor || 'Dr. Sarah Connor'}</p>
            </div>
          </div>
          
          {isRescheduling ? (
            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
              <div>
                <label className="text-xs font-bold text-muted uppercase block mb-1">Select New Date</label>
                <input 
                  type="date" 
                  className="input-field w-full text-sm" 
                  value={newDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => { setNewDate(e.target.value); setNewTime(''); }}
                  required
                />
              </div>

              {newDate && (
                <div>
                  <label className="text-xs font-bold text-muted uppercase block mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => {
                      const status = getSlotStatus(slot);
                      const isSelected = newTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={status === 'taken'}
                          onClick={() => setNewTime(slot)}
                          className="p-2 text-xs font-bold rounded-lg transition-all border"
                          style={{ 
                            backgroundColor: isSelected ? 'var(--primary)' : (status === 'taken' ? 'rgba(239, 68, 68, 0.1)' : 'var(--background)'),
                            color: isSelected ? 'white' : (status === 'taken' ? 'var(--danger)' : 'var(--foreground)'),
                            borderColor: isSelected ? 'var(--primary)' : (status === 'taken' ? 'var(--danger)' : 'var(--border)'),
                            opacity: status === 'taken' ? 0.8 : 1,
                            cursor: status === 'taken' ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {slot}
                          {status === 'taken' && <p className="text-[8px] font-normal uppercase mt-0.5">Reserved</p>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsRescheduling(false)} className="btn btn-ghost flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" disabled={success}>
                  {success ? <Check size={18} /> : 'Confirm'}
                </button>
              </div>
            </form>
          ) : (
            <button onClick={() => setIsRescheduling(true)} className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>
              Reschedule
            </button>
          )}
        </div>

        <div 
          className={`card flex flex-col justify-between ${latestReport && latestReport.status !== 'Normal' ? 'animate-danger-pulse' : ''}`} 
          style={{ borderTop: latestReport && latestReport.status !== 'Normal' ? '4px solid var(--danger)' : '4px solid var(--primary)' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold">Latest Scan Status</h3>
            </div>
            {latestReport ? (
              <>
                <p className="text-muted mb-4">Your most recent ultrasound on {latestReport.date} was reviewed by {latestReport.doctor}.</p>
                <div className="p-3 mb-4 rounded bg-background text-sm">
                  "{latestReport.note}"
                </div>
                <div 
                  className="flex items-center gap-2 p-3 rounded-lg mb-4"
                  style={{ 
                    backgroundColor: (latestReport.status === 'Normal' || latestReport.status === 'Non-Anemia') ? 'rgba(34, 197, 94, 0.1)' : 'transparent', 
                    color: (latestReport.status === 'Normal' || latestReport.status === 'Non-Anemia') ? '#16a34a' : '#ef4444' 
                  }}
                >
                  <ShieldAlert size={20} />
                  <span className="font-bold">
                    {(latestReport.status === 'Normal' || latestReport.status === 'Non-Anemia') ? 'All clear. Low Risk.' : 'Attention Recommended. High Risk.'}
                  </span>
                </div>
              </>
            ) : (
              <div className="py-6 text-center text-muted">
                <p>No recent scan reports available.</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => onNavigate('patient_records')} 
            className="btn w-full" 
            style={{ 
              justifyContent: 'center', 
              backgroundColor: 'var(--primary)', 
              color: 'white',
              opacity: latestReport ? 1 : 0.7 
            }}
          >
            {latestReport ? 'View Details' : 'Go to Records'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="card mt-6">
        <h3 className="text-xl font-bold mb-4">Pregnancy Tips & Education</h3>
        <p className="text-muted mb-4">Learn more about fetal anemia, what to expect during your ultrasound, and how to maintain a healthy pregnancy.</p>
        <button onClick={() => onNavigate('patient_education')} className="btn btn-ghost text-primary p-0 h-auto" style={{ color: 'var(--primary)' }}>
          Browse educational resources &rarr;
        </button>
      </div>
    </div>
  );
};

export default PatientHome;
