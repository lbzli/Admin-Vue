<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleGenerateStatement">生成结算单</a-button>
      </template>

      <template #action="{ record }">
        <a-button type="primary" @click="handleUpdateStatus(record.trade_no)">查看</a-button>
      </template>
    </BasicTable>
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

  import { getAllSchool } from '/@/api/sys/school';
  import { getStatementListData, postRefund, generateStatement } from '/@/api/sys/statement.ts';

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
      title: '原支付渠道',
      dataIndex: 'pay_type_text',
      key: 'pay_type_text',
    },
    {
      title: '支付订单号',
      dataIndex: 'trade_no',
      key: 'trade_no',
    },
    {
      title: '支付渠道',
      dataIndex: 'pay_type_text',
      key: 'pay_type_text',
    },
    {
      title: '应退款项',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '退款状态',
      dataIndex: 'status_text',
      key: 'status_text',
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
    },
    setup() {
      const options = ref<SelectTypes['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);

      const [registerTable, { getForm }] = useTable({
        title: '',
        api: getStatementListData,
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
      });

      const handleUpdateStatus = async (id) => {
        const resp = await postRefund({ id });
        console.log(resp);
      };

      const handleGenerateStatement = async () => {
        const { getFieldsValue } = getForm();
        const values = getFieldsValue();
        console.log(getFieldsValue());
        if (values.school_id) {
          const resp = await generateStatement({ id: values.school_id });
          console.log(resp);
        }
      };

      return {
        schemas,
        columns,
        options,
        registerTable,
        handleUpdateStatus,
        handleGenerateStatement,
      };
    },
  };
</script>
