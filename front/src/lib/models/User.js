import axiosClient from "@/axios-client"

const getAll = (callback, filter = {}) => {
}

const get = (id, callback, errorCallback,) => {
  axiosClient
    .get(`/users/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response;
      if (response && response.status === 404) {
        // return 404
        // errorCallback()
      }
    })
}
const update = (id, payload, callback, errorCallback) => {
  payload._method = 'PUT'

  const formData = new FormData()

  for (let key in payload) {
    formData.append(key, payload[key]);
  }

  axiosClient
    .post(`/users/${id}`, formData)
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response

      if (response && response.status === 422) {
        errorCallback(response.data.errors)
      }
    })
}

export { getAll, get, update }