import Header from '../components/HeaderRefactored';
import Footer from '../components/Footer';
import SandboxClient from './_components/SandboxClient';

export default function AISandboxPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow flex flex-col pt-32 pb-8">
        <SandboxClient />
      </div>
      <Footer />
    </div>
  );
}
