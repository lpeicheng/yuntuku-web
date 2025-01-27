<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout>
        <GlobalSider class="sider" />
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">
        <a href="https://github.com/lpeicheng/yuntuku" target="_blank">
          AI图萃云仓
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalSider from '@/components/GlobalSider.vue'
import { userLoginUserStore } from '@/stores/userLoginUserStore.ts'
const loginUserStore = userLoginUserStore()

</script>

<style scoped>
#basicLayout {
}
#basicLayout .footer {
  background: white;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
 #basicLayout .content {
   background: linear-gradient(to right, #fefefe, #fff);
   margin-bottom: 28px;
 }
#basicLayout .header {
  padding-inline: 20px;
  color: unset;
  background: white;
}

#basicLayout .header {
  margin-bottom: 1px;
}

#basicLayout .content {
  padding: 28px;
}

#basicLayout .sider {
  background: #fff;
  padding-top: 20px;
  border-right: 0.5px solid #eee;
}

#basicLayout :deep(.ant-menu-root) {
  border-bottom: none !important;
  border-inline-end: none !important;
}

</style>

