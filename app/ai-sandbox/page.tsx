import Header from '../components/HeaderRefactored';
import Footer from '../components/Footer';
import SandboxClient from './_components/SandboxClient';

export const metadata = {
  title: 'AI Sandbox - Medical AI Testing',
  description: 'Test environment for Medical AI agents and tools',
};

export default function AISandboxPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-200">
      <Header />
      <SandboxClient />
      <Footer />
    </div>
  );
}
