<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #date="{ record }">
        <a-button type="primary" @click="handleLeaveDate(record.id)">查看</a-button>
      </template>
    </BasicTable>
    <LeaveDtate ref="leaveDateRef" />
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
  import LeaveDtate from './components/leaveDtate.vue';
  import { getLeaveRecordList } from '/@/api/sys/leaveRecord.ts';
  import { getAllSchool } from '/@/api/sys/school';
  import moment from 'moment';

  const schemas: FormSchema[] = [
    {
      field: 'school_id',
      component: 'ApiSelect',
      label: '选择学校',
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
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
        span: 8,
      },
    },
    {
      field: 'student_name',
      component: 'Input',
      label: '学生姓名',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    },
    {
      field: 'date',
      component: 'DatePicker',
      label: '请假日期',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    },
  ];
  const columns: BasicColumn[] = [
    {
      title: '学校',
      dataIndex: 'school_name',
      key: 'school_name',
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
      title: '姓名',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: '请假日期',
      key: 'date',
      slots: { customRender: 'date' },
    },
    {
      title: '请假缘由',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '请假申请时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '退费状态',
      dataIndex: 'status_text',
      key: 'status_text',
    },
  ];

  export default {
    components: {
      PageWrapper,
      BasicTable,
      [Select.name]: Select,
      [Space.name]: Space,
      [Button.name]: Button,
      LeaveDtate,
    },
    setup() {
      const leaveDateRef = ref(null);

      const options = ref<SelectTypes['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);

      const [registerTable] = useTable({
        title: '',
        api: getLeaveRecordList,
        fetchSetting: {
          pageField: 'page',
          sizeField: 'size',
          listField: 'list',
          totalField: 'total',
        },
        columns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 100,
          schemas,
        },
        showTableSetting: false,
        showIndexColumn: false,
        rowKey: 'id',
        pagination: {
          pageSize: 20,
        },
        beforeFetch: (defaultParams) => {
          console.log(defaultParams, '参数');
          defaultParams.date = moment(defaultParams.date).format('Y-M-D');
          return {
            ...defaultParams,
          };
        },
      });

      const handleLeaveDate = (id) => {
        console.log(leaveDateRef);
        leaveDateRef.value?.showModal(id);
      };

      return {
        schemas,
        columns,
        options,
        registerTable,
        leaveDateRef,
        handleLeaveDate,
      };
    },
  };
</script>
