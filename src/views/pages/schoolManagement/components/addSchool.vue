<template>
  <div>
    <a-button type="primary" @click="showModal">添加学校</a-button>
    <BasicModal v-model:visible="visible" :title="title" @ok="handleSubmit">
      <div class="pt-3px pr-3px">
        <BasicForm
          :schemas="schemas"
          :showSubmitButton="false"
          :showResetButton="false"
          ref="formRef"
        />
      </div>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  /* stylelint-disable-next-line CssSyntaxError */
  import { nextTick, ref } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form';
  import { BasicModal } from '/@/components/Modal';
  import { createOrUpdate } from '/@/api/sys/school';
  import { useFormValid } from '/@/views/sys/login/useLogin';

  export default {
    components: {
      BasicForm,
      BasicModal,
    },
    emits: ['submit'],
    setup(_props, { emit }) {
      const schemas: FormSchema[] = [
        {
          field: 'name',
          component: 'Input',
          label: '学校名称',
          colProps: {
            span: 24,
          },
          required: true,
        },
        {
          field: '[start_date, end_date]',
          label: '时间范围',
          component: 'RangePicker',
          componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
          },
          colProps: {
            span: 24,
          },
          required: true,
        },
        {
          field: 'price',
          component: 'Input',
          label: '餐费',
          colProps: {
            span: 24,
          },
          required: true,
        },
      ];
      const visible = ref(false);
      const formRef = ref(null);
      const editMode = ref(false);
      const editDataId = ref('');
      const { validForm } = useFormValid(formRef);
      const title = '添加订餐信息';

      const showModal = () => {
        visible.value = true;
      };

      const hideModal = () => {
        visible.value = false;
      };
      const handleSubmit = async () => {
        // 处理搜索按钮点击事件

        const value = await validForm();
        const { name = '', price = '' } = value;
        const start_date = value['[start_date, end_date]'][0].format('YYYY-MM-DD');
        const end_date = value['[start_date, end_date]'][1].format('YYYY-MM-DD');
        console.log('values', { name, price, start_date, end_date });
        const params = { name, price, start_date, end_date };
        if (editMode.value) {
          params['id'] = editDataId.value;
        }
        const resp = await createOrUpdate(params);
        console.log(resp);
        visible.value = false;
        emit('submit');
      };

      const handleEditSchool = (data: Record<string, unknown>) => {
        visible.value = true;
        nextTick(() => {
          const { setFieldsValue } = formRef?.value || { setFieldsValue: (_data) => {} };
          setFieldsValue(data);
        });
      };

      return {
        visible,
        title,
        showModal,
        hideModal,
        schemas,
        handleSubmit,
        formRef,
        handleEditSchool,
      };
    },
  };
</script>
