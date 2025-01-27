<template>
  <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-top: 30px;text-align: center;display: flex; justify-content: right;">
    <a-form-item label="账号">
      <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" />
    </a-form-item>
    <a-form-item label="用户名">
      <a-input v-model:value="searchParams.userName" placeholder="输入用户名" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">搜索</a-button>
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :data-source="dataList"
    :pagination="pagination"
    @change="doTableChange"
    :align="'center'"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'userAvatar'">
        <a-image :src="record.userAvatar" :width="120" />
      </template>
      <template v-else-if="column.dataIndex === 'userRole'">
        <div v-if="record.userRole === 'admin'">
          <a-tag color="green">管理员</a-tag>
        </div>
        <div v-else>
          <a-tag color="blue">普通用户</a-tag>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'createTime'">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template v-else-if="column.key === 'action'">
        <div :style="{ padding: '16px 16px', textAlign: 'center' }">
          <a-space>
            <a-button danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  deleteUserUsingPost,
  listUserVoByPageUsingPost,
  updateUserUsingPost,
} from '@/api/userController.ts'
import { message,Modal } from 'ant-design-vue'
import dayjs from 'dayjs'
import wrapperRaf from 'ant-design-vue/es/_util/raf'
import cancel = wrapperRaf.cancel
// 数据
const dataList = ref<API.UserVO[]>([])
const total = ref(0)
// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 10,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }
})
// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}
// 搜索后重置页号
const doSearch = () => {
  // 重置页码
  searchParams.current = 1
  fetchData()
}
// 搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10,
})

// 获取数据
const fetchData = async () => {
  const res = await listUserVoByPageUsingPost({
    ...searchParams,
  })
  if (res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
}
// 删除数据
const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  Modal.confirm({
    style: { width: '500px', height: '150px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    title: '确认删除',
    content: '您确定要删除这个用户吗？',
    onOk: async () => {
      const res = await deleteUserUsingPost({ id })
      if (res.data.code === 0) {
        message.success('删除成功')
        // 刷新数据
        fetchData()
      } else {
        message.error('删除失败')
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
