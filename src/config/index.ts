// mongodb配置
const DB_URL = 'mongodb://admin:123456@localhost:9527/back_vue'

// email配置
const EMAIL_CONFIG = {
  host: 'smtp.qq.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '659555839@qq.com', // generated ethereal user
    pass: 'koponxiocojfbajc' // generated ethereal password
  }
}

// redis配置
const REDIS_CONFIG = {
  url: 'redis://localhost:9901',
  password: '123456'
}

// jwt密钥
const JWT_SECRET = 'whT63AimjiZ2SLF9JdfPeRyiwojozXg1'

// 非对称加密密钥
const RSA_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQlXWXI0Gzvyty
5d53sLgSAGLC8wAbClve4biXLJCXABZWs0pz7HNLYlGn35r4pslfwzzxJSbzMRjw
/ikpeqB10NAO1p4CEYIBLd+pgKeTuSeMHhinJj0LAHLc6j2JbPvWdcgLWWYyPhgw
dBrqZgEPRuxevPLJaCqEfq4iB4rxhGPqdbxjKQ4o2HbSOrtj8Oir9/55m5uDFj5G
I9IsrFtZI14gU9YlHO4P8bPMS37430uAgSMOft0nhr4YCJYlb/Z5uLC00rge3+Rq
eqgKVEByo1Ms7SqWcTuix2/Wmrl0xa2KMQoLygLTdG12qENbn8/uVN+XvlHITkm9
OqboHTkHAgMBAAECggEBAIQP/THCGtlJkqLes6ooc4LCR8WSwWBdgKlvVMYyayGP
5pTiU6Nt89mo2HZnduE0CI/fN3iewzh6v4XmBf3DLFEr8m9Spxw8JYnFl7TkRjWb
p1RpwcYiycdrc0436NpX7GNuk0fMRI5PDlWvTVNXXhhkGUgqbbXjg/f7lRjqmagr
uqCTfc4hmNLHwVQDvJ7g4mbZknCRscBD/Tb2bnJNcyGgNlAkYUEhiN6xMgn41A18
EAFaVlF8DVOvrFbupNwoOTOxfF1+ChMWpdbVZU/AN54VfSqOiIT/qyuBRz6sUmyk
hJD+DTQyo+kEaxX6VuD31grwK253K9kI+sfJB5xvYNECgYEA/OhA6uMZZOBVDfjR
X2zMo9p3WGHu7ajPrqSGApuDZ8S4PJDVGpttxnSJvFkNYmHwJaOLFY9nNhtxzyv8
/4NylIZQ+DMWkbSV0koSfWC4EZq9FmBpXj7FycWsfne/SiBSsI9Fv4DKDNRSCMtg
m+B8kq3z67eLGEZpeZecAyPoUpMCgYEA0yJyn2sDqWeBcm0Enl7t3rncZQcA53CL
Dw06bDhbGekq7lOFyC0WIxoUSll/cn4hvdK62gGgNGfqb+lfuvEgVLxxQi5IbIs6
+W1FpzgRe5D0cchoYuhO0Fl7Hyx3gXy0uUDwm67+esSO9vJxd1zXNi0nLbST2bep
or8eoyPzxD0CgYBTLkRjvOvWPN5cqRCb9RndbnZAUH2YFySviRc2dlWi5JW//dbJ
WIOjeSLwGs4HJLUqe/67yZ2lsyMcg5hDpcUiyoaJC6yJob6BGrG4IP6Jc75rRKyD
Pdwpv+U690GoLLdlsMm88awCyjZtBA8zVYNDbwlB5u1Nv6LjRhUfB0lbFwKBgFck
K5zihUNhBgtdNX/L/G9l1LIZ3uSnDa3rrsZFyEv8cYymClxhR3a7Z857+98ccf6v
wBEEhMO8dAU2lB1LMiXnFPPUuG2cVX3m/M2UlZqjbFCd/397FDRoCioGp1hZSRoA
1I3c/wlaoQsJa41xUx34KuhxVGiSpkAWk6WPzCedAoGBAOhRcdSQAVOIkDEtNjol
wPvE1fu5EEnxz0XGGXH3LN9kfRuEntIGnlsXT0/BDr4d57rNsCinEWfpHxmY6vqP
fB5PgNOZ5zxyDVUe1oSAE8zQp2PNA/veEqRcqmORKQAgJcFtUa5BvxtkOGpJXNE/
vVSiL9Rd3lVKNdQt8D/H/NgP
-----END PRIVATE KEY-----
`

export { DB_URL, EMAIL_CONFIG, REDIS_CONFIG, JWT_SECRET, RSA_PRIVATE_KEY }
