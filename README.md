#### vue单文件方式

- 单文件就是以*.vue结尾的文件。最终通过webpack也会编译成*.js在浏览器运行
- 内容： <template></template> + <script></script> + <style></style>
  - 1:template中只能有一个根节点 2.x
  - 2:script中  按照 export default {配置} 来写
  - 3:style中 可以设置scoped属性，让其只在template中生效

#### 以单文件的方式启动

- webpack找人来理解你的单文件代码
  - vue-loader,vue-template-compiler,代码中依赖vue,
- 启动命令
- `..\\node_modules\\.bin\\webpack-dev-server --inline --hot --open`