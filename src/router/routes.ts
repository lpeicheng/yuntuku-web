import HomePage from '@/page/HomePage.vue'
import UserLoginPage from '@/page/user/UserLoginPage.vue'
import UserRegisterPage from '@/page/user/UserRegisterPage.vue'
import UserManagePage from '@/page/admin/UserManagePage.vue'
import ACCESS_ENUM from '@/access/accessEnum.ts'
import AddPicturePage from '@/page/AddPicturePage.vue'
import PictureManagePage from '@/page/admin/PictureManagePage.vue'
import PictureDetailPage from '@/page/PictureDetailPage.vue'
import AddPictureBatchPage from '@/page/AddPictureBatchPage.vue'
import SpaceManagePage from '@/page/admin/SpaceManagePage.vue'
import AddSpacePage from '@/page/AddSpacePage.vue'
import MySpacePage from '@/page/MySpacePage.vue'
import SpaceDetailPage from '@/page/space/SpaceDetailPage.vue'
import SearchPicturePage from '@/page/SearchPicturePage.vue'
import SpaceAnalyzePage from '@/page/SpaceAnalyzePage.vue'
import SpaceUserManagePage from '@/page/admin/SpaceUserManagePage.vue'

const routes=[
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/user/login',
    name: '用户登录',
    component: UserLoginPage,
  },
  {
    path: '/user/register',
    name: '用户注册',
    component: UserRegisterPage,
  },
  {
    path: '/admin/userManage',
    name: '用户管理',
    component: UserManagePage,
  },
  {
    path: '/admin/pictureManage',
    name: '图片管理',
    component: PictureManagePage,
  },
  {
    path: '/admin/spaceManage',
    name: '空间管理',
    component: SpaceManagePage,
  },
  {
    path: '/spaceUserManage/:id',
    name: '空间成员管理',
    component: SpaceUserManagePage,
    props: true,
  },
  {
    path: '/add_picture',
    name: '创建图片',
    component: AddPicturePage,
  },
  {
    path: '/add_picture/batch',
    name: '批量创建图片',
    component: AddPictureBatchPage,
  },
  {
    path: '/picture/:id',
    name: '图片详情',
    component: PictureDetailPage,
    props: true,
  },
  {
    path: '/add_space',
    name: '创建空间',
    component: AddSpacePage,
  },
  {
    path: '/my_space',
    name: '我的空间',
    component: MySpacePage,
  },
  {
    path: '/space/:id',
    name: '空间详情',
    component: SpaceDetailPage,
    props: true,
  },
  {
    path: '/space_analyze',
    name: '空间分析',
    component: SpaceAnalyzePage,
  },
  {
    path: '/search_picture',
    name: '图片搜索',
    component: SearchPicturePage,
  },

]


  export { routes }
