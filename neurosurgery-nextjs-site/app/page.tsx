import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dr. Sayuj Krishnan
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Leading Neurosurgeon in Hyderabad
              <br />
              Specializing in Minimally Invasive Brain & Spine Surgery
            </p>
            <a
              href="#appointment"
              className="bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Specializations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Specializations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Brain Surgery</h3>
              <p className="text-gray-600">
                Expert treatment for brain tumors, aneurysms, and other neurological conditions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Spine Surgery</h3>
              <p className="text-gray-600">
                Advanced minimally invasive procedures for spine disorders and injuries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Neuro Trauma</h3>
              <p className="text-gray-600">
                Emergency care and treatment for neurological trauma and injuries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">About Dr. Sayuj Krishnan</h2>
            <p className="text-gray-600 mb-6">
              Dr. Sayuj Krishnan is a highly experienced neurosurgeon with extensive training in
              minimally invasive surgical techniques. With over [X] years of experience, he has
              successfully treated thousands of patients with various neurological conditions.
            </p>
            <p className="text-gray-600 mb-6">
              He specializes in advanced surgical procedures for brain tumors, spine disorders,
              and complex neurological conditions, always prioritizing patient safety and optimal
              outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="appointment" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book an Appointment</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-4">
                <p className="text-center text-gray-600 mb-6">
                  For appointments and consultations, please contact:
                </p>
                <div className="text-center">
                  <p className="font-semibold">Phone:</p>
                  <p className="text-blue-600">+91 XXXXXXXXXX</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Email:</p>
                  <p className="text-blue-600">contact@drsayuj.com</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Location:</p>
                  <p className="text-gray-600">
                    [Your Clinic/Hospital Name]<br />
                    [Address Line 1]<br />
                    [Address Line 2]<br />
                    Hyderabad, Telangana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Dr. Sayuj Krishnan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
