<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #mealDate="{ record }">
        {{ `${record.meal_start_date} - ${record.meal_end_date}` }}
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { FormSchema } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { Select, Space, Button } from 'ant-design-vue';
  import { SelectTypes } from 'ant-design-vue/lib/select';

  import { getAllSchool } from '/@/api/sys/school';
  import moment from 'moment';
  import { getPaymentListData } from '/@/api/sys/payment';

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
      colProps: {
        span: 8,
      },
    },
    {
      field: 'student_name',
      component: 'Input',
      label: '学生姓名',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'date',
      component: 'RangePicker',
      label: '缴费日期',
      componentProps: {
        placeholder: ['开始时间', '结束时间'],
      },
      colProps: {
        span: 8,
      },
    },
  ];
  const columns: BasicColumn[] = [
    {
      title: '学校名称',
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
      title: '订餐周期',
      key: 'mealDate',
      slots: { customRender: 'mealDate' },
    },
    {
      title: '餐费标准',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '支付渠道',
      dataIndex: 'pay_type_text',
      key: 'pay_type_text',
    },
    {
      title: '已收款项',
      dataIndex: 'pay_price',
      key: 'pay_price',
    },
    {
      title: '支付时间',
      dataIndex: 'pay_time',
      key: 'pay_time',
    },
    {
      title: '支付订单号',
      dataIndex: 'pay_type',
      key: 'pay_type',
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
        api: getPaymentListData,
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
          const [start_date, end_date] =
            defaultParams.date?.map?.((item) => moment(item).format('Y-M-D')) || [];
          delete defaultParams.date;
          return {
            ...defaultParams,
            start_date,
            end_date,
          };
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
