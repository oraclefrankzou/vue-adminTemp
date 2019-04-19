# h2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).





后端菜单


表结构为:

create table `t_menu` (
	`id` int (11),
	`menuText` varchar (1500),
	`parentId` int (11),
	`iconCls` varchar (300),
	`leaf` int (11),
	`menuCmd` varchar (1500)，
                 primary key(id)
);
insert into `t_menu` (`id`, `menuText`, `parentId`, `iconCls`, `leaf`, `menuCmd`) values('1','一级菜(1)','0','iconfont iconbackup',NULL,'a');
insert into `t_menu` (`id`, `menuText`, `parentId`, `iconCls`, `leaf`, `menuCmd`) values('18','二级菜单(1)','1','iconfont iconbackup',NULL,'a');
insert into `t_menu` (`id`, `menuText`, `parentId`, `iconCls`, `leaf`, `menuCmd`) values('19','一级菜(2)','0','iconfont iconbackup',NULL,'a');


用户基本表结构，后端验证用户成功后，返回登录成功信息给vue即可，
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `locked` int(11) NOT NULL DEFAULT '0',
  `createdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8
