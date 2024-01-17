import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter ({
  // Hash, History 우리는 Hash모드 사용  (createWebHashHistory)
  // ex) https://google.com/#search
  // Hash모드를 사용하는 이유 : 기본적으로 특정 페이지에서 새로고침을 했을 때 페이지를 찾을 수 없다 라는 메세지를 방지하기 위함
  // 해쉬모드를 쓰지 않으려면 기본적으로 히스토레 모드를 사용해야하는데 기본적으로 서버에다가 세팅을해야하는 작업을 해야해서
  // Hishtory 모드는 작업을 해야해서 Hash모드를 일단 사용하는 것 
  history: createWebHashHistory(),
  //스크롤의 위치가 top에서 시작할 수 있도록 해주는 코드 [vuerouter 공식문서에서 참조]
  scrollBehavior() {
    return { top: 0 }
  },
  // pages 
  // ex) https://google.com/
  routes: [
    {
      path: '/',
      component: Home 
    },
    {
      path: '/movie/:id',
      component: Movie
    }, 
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound404(.*)',
      component: NotFound
    }
  ]
})