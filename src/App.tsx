import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import Register from './pages/auth/Register.tsx';
import Login from './pages/auth/Login.tsx';
import ProtectedRoute from './routes/protectedRoutes.tsx';
import PatientList from './pages/patient/PatientList.tsx';
import PatientForm from './pages/patient/PatientForm.tsx';
import Patient from './pages/patient/Patient.tsx';

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <Login />
          }
        />
        <Route
          path='/register'
          element={
            <Register />
          }
        />
        <Route
          path="/patientForm"
          element = {
            <ProtectedRoute>
              <PatientForm />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/patient/:id"
          element={
            <ProtectedRoute>
              <Patient />
            </ProtectedRoute>
          } />
        <Route
        path="/patientList"
        element={
          <ProtectedRoute>
            <PatientList />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App