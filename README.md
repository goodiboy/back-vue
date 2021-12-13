# 对应此项目的前端仓库

### 前端使用 Vue 3 + Typescript + Vite [前端源码，点击跳转](https://github.com/goodiboy/front-vue3)



## 使用到的技术以及依赖包

- #### typescript

- #### node.js 

- #### mongoose

- #### reids

- #### log4js

- #### koa

- #### Koa-jwt

- #### nodemailer

### 使用docker和docker-compose一键安装配置redis和mongodb数据库

```shell
docker-compose up -d
```

mongodb需要进入容器配置初始密码和添加back_vue数据库， [mongodb可视化客户端  Robo 3T](https://robomongo.org/)

reids直接可以使用，但是查询数据的话，初始密码是123456 ，[redis可视化客户端](https://github.com/qishibo/AnotherRedisDesktopManager)

具体请看docker官方教程。也可不使用docker部安装署数据库