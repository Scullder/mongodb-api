import axiosClient from "@/axios-client"
import filterTransform from "@/lib/services/filterTransform"

const getAll = (callback, errorCallback, filter = {}) => {
  console.log(filter)
  axiosClient
    .get(`/blogs${filterTransform(filter)}`)
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      errorCallback()
    });
}

const get = (id, callback, errorCallback,) => {
  axiosClient
    .get(`/blogs/${id}`, {
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

const create = (blogData, callback, errorCallback) => {
  const formData = new FormData()

  for (let key in blogData) {
    formData.append(key, blogData[key])
  }

  axiosClient
    .post('/blogs', formData, {
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

const update = (id, payload, callback, errorCallback) => {
  payload._method = 'PUT'

  axiosClient
    .post(`/blogs/${id}`, payload, {
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
    .post(`/blogs/${id}`, payload)
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
    })
}

export { getAll, get, update, create, destroy }