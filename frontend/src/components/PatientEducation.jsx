import { BookOpen, HelpCircle, HeartPulse, Stethoscope } from 'lucide-react';

const PatientEducation = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Education Center</h2>
        <p className="text-muted">Learn about your pregnancy journey and the importance of regular scans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <HeartPulse size={24} />
            <h3 className="font-bold text-lg">What is Fetal Anemia?</h3>
          </div>
          <p className="text-muted text-sm mb-4">
            Fetal anemia is a condition where a developing baby does not have enough healthy red blood cells. 
            Red blood cells carry oxygen to the baby's cells and organs. Mild cases may not require treatment, but severe cases require medical intervention.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Stethoscope size={24} />
            <h3 className="font-bold text-lg">How is it detected?</h3>
          </div>
          <p className="text-muted text-sm mb-4">
            We use a non-invasive Doppler ultrasound to measure the blood flow in a specific blood vessel in the baby's brain (the Middle Cerebral Artery). 
            If the blood flow is faster than normal, it can be a sign of anemia.
          </p>
        </div>
      </div>

      <div className="card mt-6">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle size={24} className="text-secondary" />
          <h3 className="font-bold text-lg">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
            <p className="font-bold mb-2 text-main">Is the ultrasound safe for my baby?</p>
            <p className="text-sm text-muted">Yes, Doppler ultrasound is a standard, non-invasive imaging technique that uses sound waves. It is completely safe for both you and your baby.</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
            <p className="font-bold mb-2 text-main">What happens if anemia is detected?</p>
            <p className="text-sm text-muted">If your scan indicates potential anemia, your doctor will discuss the results with you and may recommend further testing or treatment, such as a blood transfusion for the baby.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEducation;
