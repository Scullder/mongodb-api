import axiosClient from "@/axios-client"
import filterTransform from "@/lib/services/filterTransform"

const getAll = (callback, errorCallback, filter = {}) => {
  axiosClient
    .get(`/posts${filterTransform(filter)}`)
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      errorCallback()
    })
}

const get = (id, callback, errorCallback) => {
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

const create = (payload, callback, errorCallback) => {
  /* const formData = new FormData()

  for (let key in blogData) {
    formData.append(key, blogData[key]);
  } */

  axiosClient
    .post('/posts', payload, {
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
        errorCallback(response.data.errors)
      }
    })
}

const update = (id, payload, callback, errorCallback) => {
  /* const formData = new FormData()

  for (let key in blogData) {
    formData.append(key, blogData[key]);
  } */

  payload._method = 'PUT'

  axiosClient
    .post(`/posts/${id}`, payload, {
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
    .post(`/posts/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      console.log(error)

      const response = error.response;
      if (response && response.status === 404) {
        // return 404
        // errorCallback()
      }
    })
}

export { getAll, get, update, create, destroy }