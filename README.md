# uni-vue3-ts-mall-demo
### 遇到的问题，及解决方式
1. 通过  const guessRef = ref<InstanceType<typeof XtxGuess>>() 获取组件实例时，显示为undefined,导致无法调用XtxGuess组件中的方法
> 涉及页面：index.vue,XtxGuess.vue
> 原因：接收的变量名，需要和在index.vue页面中引用组件的ref名称一致

2. ref创建的属性，和属性直接赋值的区别
> 使用ref创建的是响应式的属性，如果该属性发生变化，会直接反应到页面上。而直接赋值则不会有这样的效果

3. let 和const修饰属性的区别
> let修饰的属性是可变的，而const修饰的属性是不可变的，如果对已赋值的const属性再进行赋值操作，则会报错，但是如果是修改其中的属性，是可行的，比如 const a = ref(1);a.value = 2;和java中的引用传递有点类似

4. tsconfig.json的paths中配置的@路径在代码中不生效
5. 新增的ts文件，通过import导入vue中时不生效
> ts文件路径没有问题，导入的语法，ts导出的语法也都没有问题,tsconfig.json配置正常，通过pnpm：dev重启后也不生效，最后是需要关闭微信小程序开发者工具，再重新打开后才生效。