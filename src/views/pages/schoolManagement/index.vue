<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <AddSchool @submit="handleAddSchoolCallback" ref="addSchoolRef" />
      </template>

      <template #days="{ record }">
        <a-button @click="handleEditDate(record)">去配置</a-button>
      </template>

      <template #config="{ record }">
        <a-button @click="handleEditSchoolConfig(record)">去配置</a-button>
      </template>

      <template #action="{ record }">
        <a-space>
          <a-button
            type="primary"
            v-if="record.status === 0"
            @click="handleEnableSchool(String(record.id))"
            >启用</a-button
          >
          <a-button v-if="record.status === 1" @click="handleDisableSchool(String(record.id))"
            >禁用</a-button
          >
          <a-button @click="handleEditSchool(record)">修改</a-button>
          <a-button type="primary" danger @click="handleDeleteSchool(record.id)">删除</a-button>
        </a-space>
      </template>
    </BasicTable>

    <EditSchoolConfig ref="editSchoolRef" />

    <EditDate ref="editDateRef" />
  </PageWrapper>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { FormSchema } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { Select, Space, Button } from 'ant-design-vue';
  import { SelectTypes } from 'ant-design-vue/lib/select';
  import AddSchool from './components/addSchool.vue';
  import EditSchoolConfig from './components/editSchoolConfig.vue';
  import { deleteFn, enableOrDisable, getList, getAllSchool } from '/@/api/sys/school';
  import EditDate from './components/editDate.vue';

  const schemas: FormSchema[] = [
    {
      field: 'school_id',
      component: 'ApiSelect',
      label: '学校名称',
      componentProps: {
        api: getAllSchool,
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
        onChange: (e, v) => {
          console.log('ApiSelect====>:', e, v);
        },
        // atfer request callback
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      },
      colProps: {
        span: 24,
      },
    },
  ];
  const columns: BasicColumn[] = [
    {
      title: '学校名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '开放订餐日期',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: '餐费标准',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '已配置订餐天数',
      key: 'days',
      slots: { title: '时间配置', customRender: 'days' },
    },
    {
      title: '年级班级配置',
      key: 'config',
      slots: { title: '年级班级配置', customRender: 'config' },
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
      AddSchool,
      EditSchoolConfig,
      EditDate,
    },
    setup() {
      const options = ref<SelectTypes['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);

      const addSchoolRef = ref(null);
      const editSchoolRef = ref(null);
      const editDateRef = ref(null);

      const [registerTable, { getForm }] = useTable({
        title: '',
        api: getList,
        fetchSetting: {
          pageField: 'page',
          sizeField: 'size',
          listField: 'list',
          totalField: 'total',
        },
        columns,
        useSearchForm: true,
        formConfig: {
          schemas,
        },
        showTableSetting: false,
        showIndexColumn: false,
        rowKey: 'id',
        pagination: {
          pageSize: 20,
        },
      });

      const handleAddSchoolCallback = () => {
        getForm().submit();
      };

      const handleEnableSchool = async (id: string) => {
        const resp = await enableOrDisable({ id, status: '1' });
        console.log(resp);
        getForm().submit();
      };

      const handleDisableSchool = async (id: string) => {
        const resp = await enableOrDisable({ id, status: '0' });
        console.log(resp);
        getForm().submit();
      };

      const handleDeleteSchool = async (id: number) => {
        const resp = await deleteFn({ id });
        console.log(resp);
        getForm().submit();
      };

      const handleEditSchool = async (record) => {
        console.log(addSchoolRef, record);
        addSchoolRef?.value?.handleEditSchool(record);
      };

      const handleEditSchoolConfig = (record) => {
        editSchoolRef?.value?.handleEditSchoolConfig(record);
      };

      const handleEditDate = (record) => {
        editDateRef?.value?.handleEditDate(record);
      };

      return {
        schemas,
        columns,
        options,

        registerTable,
        getForm,
        handleAddSchoolCallback,
        handleEnableSchool,
        handleDisableSchool,
        handleDeleteSchool,
        addSchoolRef,
        handleEditSchool,
        editSchoolRef,
        handleEditSchoolConfig,
        editDateRef,
        handleEditDate,
      };
    },
  };
</script>
