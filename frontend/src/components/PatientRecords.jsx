import { FileText, Download, CheckCircle, Clock } from 'lucide-react';
import jsPDF from 'jspdf';
import { useState } from 'react';

const PatientRecords = ({ records = [], onViewReport }) => {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = (record) => {
    setDownloadingId(record.id);
    
    // Simulate a slight delay to show the "Generating..." state
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235); // Primary color
      doc.text('Fetal Anemia Care Portal', 20, 20);
      
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // Main text
      doc.text('Patient Scan Summary', 20, 30);
      
      doc.setDrawColor(226, 232, 240); // Border color
      doc.line(20, 35, 190, 35);
      
      // Details
      doc.setFontSize(12);
      doc.text(`Date of Scan: ${record.date}`, 20, 50);
      doc.text(`Scan Type: ${record.type}`, 20, 60);
      doc.text(`Attending Physician: ${record.doctor}`, 20, 70);
      
      doc.setFontSize(14);
      doc.setTextColor(22, 163, 74); // Green success
      doc.text(`Result: ${record.status}`, 20, 90);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139); // Muted
      doc.text('Physician Notes:', 20, 110);
      
      doc.setTextColor(15, 23, 42); // Main text
      const splitNote = doc.splitTextToSize(`"${record.note}"`, 170);
      doc.text(splitNote, 20, 120);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184); // Light text
      doc.text('This document was automatically generated from the Fetal Anemia Care Portal.', 20, 280);
      
      const fileName = `Scan_Summary_${record.date.replace(/, /g, '_').replace(/ /g, '_')}.pdf`;
      doc.save(fileName);
      setDownloadingId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Records</h2>
          <p className="text-muted">View your past scan results and notes from your doctor.</p>
        </div>
      </div>

      <div className="space-y-4">
        {records.length === 0 ? (
          <div className="card p-8 text-center text-muted">
            <p>No records found in your account yet.</p>
          </div>
        ) : (
          records.map(record => (
            <div 
              key={record.id} 
              className="card flex flex-col md:flex-row md:items-center justify-between gap-4" 
              style={{ transition: 'transform 0.2s', cursor: 'pointer' }} 
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} 
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => onViewReport && onViewReport(record)}
            >
              <div className="flex items-start gap-4">
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{record.type}</h3>
                  <p className="text-sm text-muted mb-2"><Clock size={14} className="inline mr-1" /> {record.date} • {record.doctor}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle size={16} style={{ color: record.status === 'Normal' ? '#16a34a' : '#ef4444' }} />
                    <span className="text-sm font-medium" style={{ color: record.status === 'Normal' ? '#16a34a' : '#ef4444' }}>Result: {record.status}</span>
                  </div>
                  <p className="text-sm mt-2 p-3 rounded text-main" style={{ backgroundColor: 'var(--background)' }}>
                    "{record.note}"
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => onViewReport && onViewReport(record)}
                  className="btn btn-primary whitespace-nowrap"
                >
                  <FileText size={18} className="mr-2" /> 
                  View Full Report
                </button>
                <button 
                  onClick={() => handleDownload(record)}
                  disabled={downloadingId === record.id}
                  className="btn btn-outline whitespace-nowrap"
                  style={{ opacity: downloadingId === record.id ? 0.7 : 1, cursor: downloadingId === record.id ? 'not-allowed' : 'pointer' }}
                >
                  <Download size={18} className="mr-2" /> 
                  {downloadingId === record.id ? 'Generating...' : 'Download Summary'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
