import { useState, useEffect } from 'react';
import { User, Save, Activity, Calendar, Droplet, Phone, Mail } from 'lucide-react';

const PatientProfile = ({ patientData, onSave }) => {
  const [formData, setFormData] = useState({
    name: patientData?.name || '',
    age: patientData?.age || '',
    gestationalAge: patientData?.gestationalAge || '',
    bloodType: patientData?.bloodType || '',
    phone: patientData?.phone || '',
    email: patientData?.email || '',
    medicalHistory: patientData?.medicalHistory || ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (patientData) {
      setFormData(prev => ({ ...prev, ...patientData }));
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-muted">Manage your personal details and medical information.</p>
        </div>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <User size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{formData.name || 'Patient Name'}</h3>
              <p className="text-sm text-muted">Primary Patient Account</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User size={16} className="text-primary" /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> Age
              </label>
              <input 
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="32"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Activity size={16} className="text-primary" /> Gestational Age (Weeks)
              </label>
              <input 
                type="number" 
                name="gestationalAge"
                value={formData.gestationalAge}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="24"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Droplet size={16} className="text-primary" /> Blood Type
              </label>
              <select 
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone size={16} className="text-primary" /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail size={16} className="text-primary" /> Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="jane.doe@example.com"
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Activity size={16} className="text-primary" /> Medical Notes / History
              </label>
              <textarea 
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="Any previous complications, allergies, or relevant medical history..."
                rows="4"
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end items-center gap-4" style={{ borderColor: 'var(--border)' }}>
            {showSuccess && (
              <span className="text-success text-sm font-medium animate-fade-in flex items-center gap-1">
                Profile updated successfully!
              </span>
            )}
            <button 
              type="submit" 
              className={`btn btn-primary ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSaving}
            >
              <Save size={18} className="mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfile;
