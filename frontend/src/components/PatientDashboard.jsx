import { Activity, LogOut, User, Sun, Moon, Home, FileText, Info } from 'lucide-react';

const PatientDashboard = ({ children, onNavigate, currentView, darkMode, toggleDarkMode, username }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <header className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 mr-4">
            <div style={{ padding: '0.5rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '0.5rem', color: 'white' }}>
              <Activity size={24} />
            </div>
            <h1 className="font-bold text-xl hidden sm:block">Fetal Anemia Care</h1>
          </div>
          
          <nav className="flex gap-2">
            <button 
              onClick={() => onNavigate('patient_home')} 
              className={`btn ${currentView === 'patient_home' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '2rem' }}
            >
              <Home size={18} /> Home
            </button>
            <button 
              onClick={() => onNavigate('patient_records')} 
              className={`btn ${currentView === 'patient_records' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '2rem' }}
            >
              <FileText size={18} /> My Records
            </button>
            <button 
              onClick={() => onNavigate('patient_education')} 
              className={`btn ${currentView === 'patient_education' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '2rem' }}
            >
              <Info size={18} /> Education
            </button>
            <button 
              onClick={() => onNavigate('patient_profile')} 
              className={`btn ${currentView === 'patient_profile' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '2rem' }}
            >
              <User size={18} /> Profile
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: 'var(--border)' }}>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-main">{username || 'Guest'}</p>
              <p className="text-xs text-muted">Patient Portal</p>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <User size={20} />
            </div>
          </div>
          <button onClick={() => onNavigate('landing')} className="btn btn-ghost" style={{ padding: '0.5rem', color: 'var(--danger)', borderRadius: '50%' }} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem 1rem', paddingBottom: '6rem' }} className="animate-fade-in">
        <div className="container mx-auto max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
