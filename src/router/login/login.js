const Login = () => import(/*webpackChunkName:"activityRecord"*/'@/views/login/login');

export default[
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {title: "登陆", showRouteFlag: false},
  },
  {
    name: "redirect",
    path: "/",
    redirect:{ name: "login"}
  }
]
