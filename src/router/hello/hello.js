// import HelloWorld from '@/components/HelloWorld'
const HelloWorld = () => import(/*webpackChunkName:"activityRecord"*/'@/components/HelloWorld');


export default[
  {
    name: "HelloWorld",
    path: "/HelloWorld",
    component: HelloWorld,
    meta: {title: "欢迎", showRouteFlag: false},
  }
]
