## 开发命令

* 测试环境接口开发：
 ```shell
npm run dev
```

* 打包到测试环境：
 ```shell
npm run test
```

* 打包到预发环境：
 ```shell
npm run test
```

* 打包到线上环境：
 ```shell
npm run build
```


=====

## 页面规范

- 以页面为维度放在page目录下。exp：
  - 模块xx
      - api  接口url处理请放在这里
      - asset 页面自己的静态资源
      - components  页面自己的组件
      - store   vuex的store 数据处理部分
      - xx.html 当前模块的页面
      - xx.js   当前页面的入口
      - xx.vue  当前页面的主视图
 - public下面为公用资源
   - util 公用方法 
   - asset 公用静态资源  
   
 ## 模块alias
 Public直接指向了public文件夹，如下方式引用，无需用..的方式找寻public的相对目录。
 ```shell
import 'Public/assets/scss/common.scss';
```
