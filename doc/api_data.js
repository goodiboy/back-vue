define({ "api": [
  {
    "type": "delete",
    "url": "/category",
    "title": "Delete a category",
    "version": "0.3.0",
    "name": "DeleteCategory",
    "group": "Category_(official)",
    "description": "<p>Delete a category. Sample request has been disabled here.</p>",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "id",
        "description": "<p>Category ID.</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Some json code:",
          "content": "{\n  \"user\": \"Sample User\",\n   \"payload\": {\n     \"test\": [\n       \"code\": \"\n         public class HelloWorldTest {\n           HelloWorld hw = new HelloWorld();",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/test.js",
    "groupTitle": "Category_(official)"
  },
  {
    "type": "get",
    "url": "/category",
    "title": "Get a category",
    "version": "0.3.0",
    "sampleRequest": [
      {
        "url": "http://www.example.com"
      }
    ],
    "name": "GetCategory",
    "group": "Category_(official)",
    "description": "<p>Get a category. Sample request on example.com here.</p>",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "id",
        "description": "<p>Category ID.</p>"
      }
    ],
    "filename": "src/api/test.js",
    "groupTitle": "Category_(official)"
  },
  {
    "type": "post",
    "url": "/city",
    "title": "Create a new city",
    "version": "0.3.0",
    "name": "CreateCity",
    "group": "City",
    "description": "<p>Create a new city.</p>",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "defaultValue": "Paris",
        "description": "<p>Name of the city</p>"
      }
    ],
    "query": [
      {
        "group": "Query",
        "type": "String",
        "allowedValues": [
          "Aerial",
          "Land",
          "Underwater"
        ],
        "optional": false,
        "field": "view",
        "defaultValue": "Aerial",
        "description": "<p>Type of view.</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "zoom",
        "description": "<p>Zoom.</p>"
      }
    ],
    "filename": "src/api/test.js",
    "groupTitle": "City",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/city"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/user/:id",
    "title": "Delete user",
    "version": "0.3.0",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Be careful! This will remove all the data associated with that user!</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: token 5f048fe\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the user.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -X DELETE -H \"Authorization: token 5f048fe\" -i https://api.example.com/user/4711",
        "type": "bash"
      },
      {
        "title": "Javascript example",
        "content": "const client = AcmeCorpApi('5f048fe');\nconst user = client.deleteUser(42);",
        "type": "js"
      },
      {
        "title": "Python example",
        "content": "client = AcmeCorpApi.Client(token=\"5f048fe\")\nuser = client.delete_user(42)",
        "type": "python"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p><code>ok</code> if everything went fine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nullableField",
            "description": "<p>This response field is not always there (can be null).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"result\": \"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/test.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:region/:id/:opt",
    "title": "Read data of a User",
    "version": "0.3.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "admin:computer"
      }
    ],
    "description": "<p>Compare version 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The token can be generated from your user profile.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Apidoc-Cool-Factor",
            "defaultValue": "big",
            "description": "<p>Some other header with a default value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: token 5f048fe\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "region",
            "defaultValue": "fr-par",
            "description": "<p>User region</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "opt",
            "description": "<p>An optional param</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/user/fr-par/4711\ncurl -H \"Authorization: token 5f048fe\" -H \"X-Apidoc-Cool-Factor: superbig\" -i https://api.example.com/user/de-ber/1337/yep",
        "type": "bash"
      },
      {
        "title": "Javascript example",
        "content": "const client = AcmeCorpApi('5f048fe');\nconst user = client.getUser(42);",
        "type": "js"
      },
      {
        "title": "Python example",
        "content": "client = AcmeCorpApi.Client(token=\"5f048fe\")\nuser = client.get_user(42)",
        "type": "python"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "registered",
            "description": "<p>Registration Date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "nicknames",
            "description": "<p>List of Users nicknames (Array of Strings).</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "profile",
            "description": "<p>Profile data (example for an Object)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "profile.age",
            "description": "<p>Users age.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.image",
            "description": "<p>Avatar-Image.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "options",
            "description": "<p>List of Users options (Array of Objects).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "options.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "options.value",
            "description": "<p>Option Value.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/test.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/user/:region/:id/:opt"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a new User",
    "version": "0.3.0",
    "name": "PostUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "age",
        "description": "<p>Age of the User</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "defaultValue": "Caroline",
        "description": "<p>Name of the User</p>"
      },
      {
        "group": "Body",
        "type": "Date",
        "optional": false,
        "field": "extraInfo.hireDate",
        "description": "<p>Date when user was hired</p>"
      },
      {
        "group": "Body",
        "type": "Date",
        "optional": false,
        "field": "extraInfo.hireDateWithDefault",
        "defaultValue": "2021-09-01",
        "description": "<p>Date when user was hired with default</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "extraInfo.nickname",
        "description": "<p>Nickname of the user</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "extraInfo.isVegan",
        "defaultValue": "true",
        "description": "<p>Is the user vegan? (boolean with default)</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "extraInfo.isAlive",
        "description": "<p>Is the user alive? (boolean with no default)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "extraInfo.secrets.crush",
        "description": "<p>The user secret crush</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "extraInfo.secrets.hair",
        "defaultValue": "1000",
        "description": "<p>Number of hair of user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Users-ID.</p>"
          }
        ]
      }
    },
    "filename": "src/api/test.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/user"
      }
    ]
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Change a User",
    "version": "0.3.0",
    "name": "PutUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function has same errors like POST /user, but errors not defined again, they were included with &quot;apiErrorStructure&quot;</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the user.</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Name of the User.</p>"
      },
      {
        "group": "Body",
        "type": "File",
        "optional": false,
        "field": "avatar",
        "description": "<p>Upload avatar.</p>"
      }
    ],
    "filename": "src/api/test.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/user/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/:id",
    "title": "Thank a user: this is quite a long name indeed",
    "version": "0.3.0",
    "name": "ThankUser",
    "group": "User",
    "description": "<p>This is here to have a long name in the left menu.</p>",
    "filename": "src/api/test.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login/register",
    "title": "注册账号",
    "version": "0.1.0",
    "group": "用户验证",
    "name": "注册账号",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>用户名</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "captcha",
        "description": "<p>验证码</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "captchaId",
        "description": "<p>验证码id</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>验证码id</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password2",
        "description": "<p>验证码id</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "nickname",
        "description": "<p>用户昵称</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "请求示例",
          "content": "{\n   captcha: \"vcgu\"\n   captchaId: \"YpPSJqtoyFmNfUBMXFj-M\"\n   nickname: \"测试注册\"\n   password: \"123\"\n   password2: \"123\"\n   username: \"12345@qq.com\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "请求成功数据",
          "content": " {\n  \"code\": 200,\n  \"data\": {\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMTIzNDVAcXEuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkYlZjbzJUYllFdURoNlh0blBKS0VydWVubU8zMHRNcUtxQTNlQ0lEbkIyTjRlTFZvRDVFSlMiLCJuaWNrbmFtZSI6Iua1i-ivleazqOWGjCIsImNyZWF0ZWQiOiIyMDIxLTEyLTE3IDEyOjUyOjU5IiwidXBkYXRlIjoiMjAyMS0xMi0xNyAxMjo1Mjo1OSIsIl9pZCI6IjYxYmMxODIyZWE0ZWU4ZjE5MDQ4NzRkYSIsIl9fdiI6MH0sImlhdCI6MTYzOTcxNjg5OCwiZXhwIjoxNjM5ODAzMjk4fQ.RpwrmeZM8_DcSuBiFMt-dpFnx0EpHqPaXXPBxK8x5qs\",\n    \"userInfo\": {\n      \"username\": \"12345@qq.com\",\n      \"nickname\": \"测试注册\",\n      \"created\": \"2021-12-17 12:52:59\",\n      \"update\": \"2021-12-17 12:52:59\",\n      \"_id\": \"61bc1822ea4ee8f1904874da\",\n      \"__v\": 0\n    }\n  },\n  \"msg\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/login/register.ts",
    "groupTitle": "用户验证",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/login/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/login/login",
    "title": "登录",
    "version": "0.1.0",
    "group": "用户验证",
    "name": "登录",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>用户名</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>密码</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "captcha",
        "description": "<p>验证码</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "captchaId",
        "description": "<p>验证码id</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "请求示例",
          "content": "{\n   captcha: \"hf36\"\n   captchaId: \"XBC4bhwNaGAXjyYIqKy92\"\n   password: \"123\"\n   username: \"12345@qq.com\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "请求成功数据",
          "content": " {\n  \"code\": 200,\n  \"data\": {\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMTIzNDVAcXEuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkYlZjbzJUYllFdURoNlh0blBKS0VydWVubU8zMHRNcUtxQTNlQ0lEbkIyTjRlTFZvRDVFSlMiLCJuaWNrbmFtZSI6Iua1i-ivleazqOWGjCIsImNyZWF0ZWQiOiIyMDIxLTEyLTE3IDEyOjUyOjU5IiwidXBkYXRlIjoiMjAyMS0xMi0xNyAxMjo1Mjo1OSIsIl9fdiI6MH0sImlhdCI6MTYzOTcxNzIyMCwiZXhwIjoxNjM5ODAzNjIwfQ.dZv0saEkbBYkRofnEhB21ZhK5dOmPMq_xVFgGZ67cWM\",\n    \"userInfo\": {\n      \"username\": \"12345@qq.com\",\n      \"password\": \"$2b$12$bVco2TbYEuDh6XtnPJKEruenmO30tMqKqA3eCIDnB2N4eLVoD5EJS\",\n      \"nickname\": \"测试注册\",\n      \"created\": \"2021-12-17 12:52:59\",\n      \"update\": \"2021-12-17 12:52:59\",\n      \"__v\": 0\n    }\n  },\n  \"msg\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/login/login.ts",
    "groupTitle": "用户验证",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/login/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/login/reset",
    "title": "重置密码",
    "version": "0.1.0",
    "group": "用户验证",
    "name": "重置密码",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>用户名</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "captcha",
        "description": "<p>验证码</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "captchaId",
        "description": "<p>验证码id</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "请求示例",
          "content": "{\n    captcha: \"qqh4\"\n    captchaId: \"56Jj051C5argxUBcLSpld\"\n    username: \"123@qq.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "请求成功数据",
          "content": "{\n   code: 200,\n   msg: \"密码重置成功，新的密码已发生到您的邮箱\",\n   data: 'adfa12'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/login/reset.ts",
    "groupTitle": "用户验证",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/login/reset"
      }
    ]
  },
  {
    "type": "get",
    "url": "/common/getCaptcha",
    "title": "获取用户验证码",
    "version": "0.1.0",
    "name": "获取验证码",
    "group": "通用",
    "success": {
      "examples": [
        {
          "title": "接口返回数据",
          "content": " {\n    \"code\": 200,\n    \"data\": {\n        \"captchaId\": \"n5WU8c4Ds1Sw8VLgb9rNP\",\n        \"captcha\": svg标签图片,\n        \"captchaText\": \"DRGI\"\n    },\n    \"msg\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/common/getCaptcha.ts",
    "groupTitle": "通用",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/common/getCaptcha"
      }
    ]
  }
] });
