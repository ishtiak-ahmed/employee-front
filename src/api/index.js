import axios from "axios"

const base = process.env.BASE_API || 'http://localhost:3005'

export const addEmployee = async (employee) => {
  const res = await axios.post(`${base}/employee`, employee)
  if (res) return res.data;
}

export const uploadMany = async (employees) => {
  const res = await axios.post(`${base}/employee/many`, employees)
  if (res) return res.data;
}

export const getEmployees = async () => {
  const res = await axios.get(`${base}/employee`)
  if (res) return res.data;
}

export const sendMailToEmpoyee = async (emails, subject, body) => {
  const res = await axios.post(`${base}/send-mail`, { emails, subject, body })
  if (res) return res.data;
}