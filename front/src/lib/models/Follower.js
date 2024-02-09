import axiosClient from "@/axios-client"
import filterTransform from "@/lib/services/filterTransform"

const getAll = (callback, filter = {}) => {
  axiosClient
    .get(`/followers${filterTransform(filter)}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    /* .catch((error) => {
      const response = error.response

      if (response && response.status === 422 && errorCallback !== undefined) {
        console.log(response.data.errors)
      }
    }) */
}

const create = (payload, callback, errorCallback) => {
  axiosClient
    .post('/followers', payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response

      if (response && response.status === 422 && errorCallback !== undefined) {
        console.log(response.data.errors)
      }
    })
}

const destroy = (id, callback, errorCallback) => {
  const payload = {
    _method: 'DELETE'
  }

  axiosClient
    .post(`/followers/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response

      if (response && response.status === 422 && errorCallback !== undefined) {
        console.log(response.data.errors)
      }
    })
}

export { create, destroy, getAll }