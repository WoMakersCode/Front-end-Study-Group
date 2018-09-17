import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://vue-api-curso.herokuapp.com/`
  })
}
