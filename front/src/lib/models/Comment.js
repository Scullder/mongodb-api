import axiosClient from "@/axios-client"
import filterTransform from "@/lib/services/filterTransform"

const getAll = (callback, errorCallback, filter = {}) => {
  axiosClient
    .get(`/commetns${filterTransform(filter)}`)
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      errorCallback()
    });
}

const create = (payload, callback, errorCallback) => {
  const formData = new FormData()

  for (let key in payload) {
    formData.append(key, payload[key])
  }

  axiosClient
    .post('/comments', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response;
      if (response && response.status === 422) {
        errorCallback(response.data.errors)
      }
    })
}

const destroy = (id, callback) => {
  const payload = {
    _method: 'DELETE'
  }

  axiosClient
    .post(`/commetns/${id}`, payload)
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
    })
}

export { getAll, create, destroy }