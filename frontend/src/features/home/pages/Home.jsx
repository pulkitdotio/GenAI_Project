import { ArrowRight, BrainCircuit, CheckCircle2, FileText, History, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router';
import Badge from '../../../components/ui/Badge';
import Logo from '../../../components/common/Logo';
import AuthLink from '../../auth/components/AuthLink';
import PublicHeader from '../components/PublicHeader';

const tools = [
  { icon: BrainCircuit, title: 'AI Interview Preparation', label: 'Available', description: 'Turn your experience and a job description into role-specific questions, skill gap insights, and a focused preparation plan.', to: '/interviews/new', action: 'Start Preparing' },
  { icon: FileText, title: 'AI Tailored Resume', label: 'From your interview report', description: 'Create a job-tailored resume using your profile and target role. Start with interview preparation, then generate your resume from the report.', to: '/interviews/new', action: 'Prepare & Tailor Resume' },
  { icon: History, title: 'Interview History & Reports', label: 'Your private workspace', description: 'Revisit your preparation reports, review your match scores, and pick up where you left off. Your history stays in your account.', to: '/interviews', action: 'View My Reports' },
];

const steps = [
  ['Add job information', 'Tell us about yourself and the role you want.'],
  ['Upload your resume', 'Add your current resume as a PDF.'],
  ['Let AI analyze your profile', 'See how your experience matches the job.'],
  ['Prepare for your next step', 'Explore your preparation report and generate a tailored resume.'],
];

function Home() {
  return (
    <div className="public-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PublicHeader />
      <main id="main-content" tabIndex={-1} className="public-container">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <p className="home-eyebrow"><Sparkles size={16} aria-hidden="true" /> Your next opportunity starts here</p>
            <h1 id="home-title">Prepare smarter.<br /><span>Get hired faster.</span></h1>
            <p className="home-hero__description">Go into your next interview with a plan. PrepAI turns your resume and a job description into personalized preparation, practical insights, and a resume tailored to the role.</p>
            <div className="home-actions">
              <AuthLink to="/interviews/new" className="button button--primary button--large">Start Interview Preparation <ArrowRight size={17} aria-hidden="true" /></AuthLink>
              <Link to="/#tools" className="button button--secondary button--large">Explore AI Tools</Link>
            </div>
            <p className="home-note">Explore first. Sign in when you’re ready to prepare.</p>
          </div>
          <aside className="home-preview" aria-label="What your preparation report includes">
            <div className="home-preview__heading"><span className="home-icon"><Target size={22} aria-hidden="true" /></span><span>Your next role.<br /><strong>A clearer plan.</strong></span></div>
            <p>Built around your experience and the job you want.</p>
            <ul>
              {['Profile-to-role match insights', 'Technical & behavioral questions', 'Skill gaps worth focusing on', 'A personalized preparation plan'].map(item => <li key={item}><CheckCircle2 size={17} aria-hidden="true" />{item}</li>)}
            </ul>
            <div className="home-preview__footer"><FileText size={18} aria-hidden="true" />Then tailor your resume from your report.</div>
          </aside>
        </section>

        <section id="tools" tabIndex={-1} className="home-section" aria-labelledby="tools-title">
          <div className="home-section__heading"><p className="home-eyebrow">Your preparation toolkit</p><h2 id="tools-title">One role. A more focused approach.</h2><p>Start with the opportunity. Build the preparation around you.</p></div>
          <div className="home-tools">
            {tools.map(({ icon: Icon, title, label, description, to, action }) => (
              <article className="home-tool" key={title}>
                <span className="home-icon"><Icon size={23} aria-hidden="true" /></span>
                <Badge>{label}</Badge>
                <h3>{title}</h3><p>{description}</p>
                <AuthLink to={to} className="button button--secondary button--medium">{action}<ArrowRight size={15} aria-hidden="true" /></AuthLink>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" tabIndex={-1} className="home-section" aria-labelledby="how-title">
          <div className="home-section__heading"><p className="home-eyebrow">How it works</p><h2 id="how-title">From job description to a plan of action.</h2></div>
          <ol className="home-steps">{steps.map(([title, description], index) => <li key={title}><span className="home-step-number" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </section>

        <section className="home-final" aria-labelledby="final-title"><div><p className="home-eyebrow">Make your next move count</p><h2 id="final-title">Bring your experience. Build your confidence.</h2><p>Your next interview deserves preparation that fits you.</p></div><AuthLink to="/interviews/new" className="button button--primary button--large">Start Preparing<ArrowRight size={17} aria-hidden="true" /></AuthLink></section>
      </main>
      <footer className="public-container public-footer"><Logo /><p>Better preparation. Brighter opportunities.</p><Link to="/#tools">Explore tools</Link></footer>
    </div>
  );
}

export default Home;
