import serverURI from "./serverURI";

/**
 * @private
 * @function __requestServer
 * @param {Object} param - Request params
 * @param {String} param.method - Request method (POST || PUT || GET)
 * @param {String} param.url - Request params
 * @param {Object} param.headers - Request headers
 * @param {Object} param.body - Request body
 * @returns {Promise<Response>} Fetch response
 */
const __requestServer = async ({ method, url, headers, body }) => {
  try {
    const response = await fetch(serverURI + url, {
      method,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
    if (response.ok && response.status === 200) {
      if (headers && headers.ResponseType === "blob") {
        return Promise.resolve(response.blob());
      }
      return Promise.resolve(response.json());
    } else if (response.status === 204) {
      return Promise.resolve([]);
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAll = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = await __requestServer({ method: "GET", url: "farms" });

        return Promise.resolve(userData);
      } catch (e) {
        localStorage.removeItem("token");
        return Promise.reject();
      }
    }
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
};
