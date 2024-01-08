import axios from 'axios'

export const fetchTest = () => {
  return axios.get('test')
}