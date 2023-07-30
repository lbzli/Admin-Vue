<template>
  <PageWrapper>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>

<script lang="ts">
  /* stylelint-disable-next-line CssSyntaxError */
  import { ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { FormSchema } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { Select, Space, Button } from 'ant-design-vue';
  import { SelectTypes } from 'ant-design-vue/lib/select';

  import { getProductPlanData } from '/@/api/sys/plan';
  import { getAllSchool } from '/@/api/sys/school';

  const schemas: FormSchema[] = [
    {
      field: 'school_id',
      component: 'ApiSelect',
      label: '选择学校',
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
    },
  ];
  const columns: BasicColumn[] = [
    {
      title: '学校名称',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: '总订餐人数',
      dataIndex: 'total_num',
      key: 'total_num',
    },
    {
      title: '请假人数',
      dataIndex: 'leave_num',
      key: 'leave_num',
    },
    {
      title: '实际订餐人数',
      dataIndex: 'actual_num',
      key: 'actual_num',
    },
  ];

  export default {
    components: {
      PageWrapper,
      BasicTable,
      [Select.name]: Select,
      [Space.name]: Space,
      [Button.name]: Button,
    },
    setup() {
      const options = ref<SelectTypes['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);

      const [registerTable] = useTable({
        title: '',
        api: getProductPlanData,
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

      return {
        schemas,
        columns,
        options,
        registerTable,
      };
    },
  };
</script>
