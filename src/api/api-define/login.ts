/**
 @apiDefine loginSuccessExample
 @apiVersion 0.1.0
 @apiSuccessExample {json} 请求成功数据
 {
    "code": 200,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMTIzNDVAcXEuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkYlZjbzJUYllFdURoNlh0blBKS0VydWVubU8zMHRNcUtxQTNlQ0lEbkIyTjRlTFZvRDVFSlMiLCJuaWNrbmFtZSI6Iua1i-ivleazqOWGjCIsImNyZWF0ZWQiOiIyMDIxLTEyLTE3IDEyOjUyOjU5IiwidXBkYXRlIjoiMjAyMS0xMi0xNyAxMjo1Mjo1OSIsIl9fdiI6MH0sImlhdCI6MTYzOTcxNzIyMCwiZXhwIjoxNjM5ODAzNjIwfQ.dZv0saEkbBYkRofnEhB21ZhK5dOmPMq_xVFgGZ67cWM",
      "userInfo": {
        "username": "12345@qq.com",
        "nickname": "测试注册",
        "created": "2021-12-17 12:52:59",
        "update": "2021-12-17 12:52:59",
        "__v": 0
      }
    },
    "msg": null
   }
 */

/**
 @apiDefine loginParams
 @apiVersion 0.1.0
 @apiBody {String} username 用户名
 @apiBody {String} captcha 验证码
 @apiBody {String} captchaId 验证码id
 */
