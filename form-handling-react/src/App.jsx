import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Advanced React Form Handling
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Demonstrating form handling using Controlled Components vs Formik
          </p>
          
          {/* Form Toggle Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveForm('controlled')}
              className={`px-6 py-2 rounded-md font-medium transition duration-200 ${
                activeForm === 'controlled'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Controlled Components
            </button>
            <button
              onClick={() => setActiveForm('formik')}
              className={`px-6 py-2 rounded-md font-medium transition duration-200 ${
                activeForm === 'formik'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Formik
            </button>
          </div>
        </header>

        <main>
          {activeForm === 'controlled' && <RegistrationForm />}
          {activeForm === 'formik' && <FormikForm />}
        </main>

        <footer className="mt-12 text-center text-gray-600">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Key Differences</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-2">Controlled Components</h4>
                <ul className="text-sm space-y-1">
                  <li>• Manual state management with useState</li>
                  <li>• Custom validation logic</li>
                  <li>• More boilerplate code</li>
                  <li>• Full control over form behavior</li>
                  <li>• Direct React approach</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-600 mb-2">Formik with Yup</h4>
                <ul className="text-sm space-y-1">
                  <li>• Built-in state management</li>
                  <li>• Schema-based validation</li>
                  <li>• Less boilerplate code</li>
                  <li>• Powerful validation features</li>
                  <li>• Industry standard for complex forms</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;