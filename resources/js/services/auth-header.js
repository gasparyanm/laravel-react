function authHeader () {
    const token = localStorage["token"];

    if (token) {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${token}`;

            return config;
        });
    }
}

export default authHeader
