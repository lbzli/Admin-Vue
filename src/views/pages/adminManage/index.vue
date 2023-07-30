<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <AddAdmin @submit="handleAddAdminCallback" ref="addSchoolRef" />
      </template>

      <template #action="{ record }">
        <a-space>
          <a-button type="primary" @click="handleUpdatePassword(record.id)">重置密码</a-button>
          <a-button @click="handlePatchState(record.id)">禁用</a-button>
          <a-button type="primary" danger @click="handleDeleteAdmin(record.id)">删除</a-button>
        </a-space>
      </template>
    </BasicTable>

    <UpdatePassword ref="updatePasswordRef" />
  </PageWrapper>
</template>

<script lang="ts">
  /* stylelint-disable-next-line CssSyntaxError */
  import { ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Select, Space, Button } from 'ant-design-vue';
  import AddAdmin from './components/addAdmin.vue';
  import UpdatePassword from './components/updatePassword.vue';

  import { deleteAdmin, forBidAdmin, getAdminList } from '/@/api/sys/admin';

  const columns: BasicColumn[] = [
    {
      title: '管理员用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];

  export default {
    components: {
      PageWrapper,
      BasicTable,
      [Select.name]: Select,
      [Space.name]: Space,
      [Button.name]: Button,
      AddAdmin,
      UpdatePassword,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getAdminList,
        fetchSetting: {
          pageField: 'page',
          sizeField: 'size',
          listField: 'list',
          totalField: 'total',
        },
        columns,
        showTableSetting: false,
        showIndexColumn: false,
        rowKey: 'id',
        pagination: {
          pageSize: 20,
        },
        beforeFetch: (defaultParams) => {
          console.log(defaultParams, '参数');
          return {
            ...defaultParams,
          };
        },
      });

      const updatePasswordRef = ref(null);

      const handleAddAdminCallback = () => {
        console.log('ggg');
      };

      const handleUpdatePassword = (id) => {
        updatePasswordRef.value?.showModal?.(id);
        console.log(id);
      };

      const handlePatchState = async (id) => {
        const resp = await forBidAdmin({ id });
        console.log(resp);
        reload();
      };

      const handleDeleteAdmin = async (id) => {
        const resp = await deleteAdmin({ id });
        console.log(resp);
        reload();
      };

      return {
        updatePasswordRef,
        columns,
        registerTable,
        handleAddAdminCallback,
        handleUpdatePassword,
        handlePatchState,
        handleDeleteAdmin,
      };
    },
  };
</script>
