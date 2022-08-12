const serveHTTPS = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        const reqType = req.headers["x-forwarded-proto"];
        // if not https redirect to https unless logging in using OAuth
        if (reqType !== 'https') {
            req.url.indexOf('auth/google') !== -1
              ? next()
              : res.redirect("https://" + req.headers.host + req.url);
        } 
    } else {
        next();
    } 
};

module.exports = { serveHTTPS };