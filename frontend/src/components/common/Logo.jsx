import { BrainCircuit } from 'lucide-react';

function Logo({ compact = false }) {
  return (
    <div className="brand-logo">
      <div className="brand-logo__icon">
        <BrainCircuit size={22} strokeWidth={2.2} />
      </div>

      {!compact && (
        <span className="brand-logo__text">
          PrepAI
        </span>
      )}
    </div>
  );
}

export default Logo;