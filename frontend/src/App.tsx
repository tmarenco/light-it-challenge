import { useEffect, useState } from 'react'
import './App.css'
type Patient = {
  id: string
  name: string
}
function App() {
  const [patients, setPatients] = useState<Patient[]>([])
  useEffect(() => {
    const getPatients = async () => {
      const response = await fetch('http://localhost:4000/patients')
      const data = await response.json()
      setPatients(data)
    }
    getPatients()
  }, [])
  return (
    <>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </>
  )
}
export default App