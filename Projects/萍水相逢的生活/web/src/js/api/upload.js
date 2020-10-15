import axios from 'axios'

function upload (params) {
  return axios.post('/uploads', params)
}

export default upload
