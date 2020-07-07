// 第一步：路由拦截
// const routes = [
//     {
//         path: '/',
//         name: '/',
//         component: Index,
//         meta: {
//             requireAuth: true, 
//         }, 
//     },
//     {
//         path: '/repository',
//         name: 'repository',
//         meta: {
//             requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
//         },
//         component: Repository
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: Login
//     }
// ];

// 第二步：书写store
// const store= new Vuex.Store({
//     state: {
//         currentUser: null,
//         isLogin:false,
//         token: ""
//     },
//     mutations: {
//         userStatus(state,user) {
//             if(user) {
//                 state.currnentUser=user;
//                 state.isLogin = true;
//             }else if(user===null) {
//                 sessionStorage.setItem('userName',null);
//                 sessionStorage.setItem('userToken','');
//                 state.currentUser=null;
//                 state.isLogin=false;
//                 state.token='';
//             }
//         }
//     },
//     actions: {
//         setUser({commit},user) {
//             commit('userStatus',user);
//         }
//     }
// })

// 第三步：定义axios拦截器
// axios.interceptors.request.use(
//     config => {
//         if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `token ${store.state.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: 'login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//         return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     });

// 第四步：
// import {mapActions,mapGetters} from 'vuex';
// methods: {
//     ...mapActions(["setUser"]),
//     ...mapGetters(['isLogin'])
//     在登录成功的方法中添加：
//     this.setUser(res.data.userName);
// },
// computed: {
//     isLogin() {
//         if(sessionStorage.getItem('userName')&&sessionStorage.getItem('userToken')) {
//             this.setUser(sessionStorage.getItem("userName"));
//         }else {
//             this.setUser(null);
//         }
//         return this.isLogin;
//     },
//      submitForm(formName) {
//         let _this = this;
//         this.$refs[formName].validate((valid) => {
//           if (valid) {
//             sessionStorage.setItem('userName','校验通过的用户名');
//             sessionStorage.setItem("userToken", '返回的token值');
//             _this.$router.push({path: "/index/table"});
//           } else {
//             console.log('error submit!!');
//             return false;
//           }
//         });
//       },
// }


// 第五步：beforeEach路由判断
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限    
//          if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
//              next()
//          } else {
//              // 未登录,跳转到登陆页面
//              next({
//                path: '/login'
//              })
//          }
//      } else {
//        if(sessionStorage.getItem("token") == 'true'){
//          next('/index/table');
//        }else{
//          next();
//        }
//      }
//})