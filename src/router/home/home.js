const Home = () => import(/*webpackChunkName:"activityRecord"*/'@/views/home/home');
const Three = () => import(/*webpackChunkName:"activityRecord"*/'@/views/three/three');
const second = () => import(/*webpackChunkName:"activityRecord"*/'@/views/second/second');

export default[
  {
    name: "home",
    path: "/home",
    component: Home,
    meta: {title: "主页", showRouteFlag: false},
    children:[
      {
        name: "Three",
        path: "three",
        component: Three,
        meta: {title: "嵌套", showRouteFlag: false},

      },
      {
        name: "second",
        path: "second",
        component: second,
        meta: {title: "嵌套2", showRouteFlag: false},

      },
    ]
  }
]
