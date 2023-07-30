/* stylelint-disable CssSyntaxError */
<template>
  <div>
    <a-button type="primary" @click="showModal">添加管理员</a-button>
    <BasicModal v-model:visible="visible" title="添加管理员" @ok="handleSubmit">
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
  import { ref } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form';
  import { BasicModal } from '/@/components/Modal';
  import { addAdmin } from '/@/api/sys/admin';
  import { useFormValid } from '/@/views/sys/login/useLogin';

  const schemas: FormSchema[] = [
    {
      field: 'username',
      component: 'Input',
      label: '管理员用户名',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'password',
      component: 'InputPassword',
      label: '密码',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'confirm_password',
      component: 'InputPassword',
      label: '确认密码',
      colProps: {
        span: 24,
      },
      required: true,
    },
  ];
  export default {
    components: {
      BasicForm,
      BasicModal,
    },
    emits: ['submit'],
    setup(_props, { emit }) {
      const visible = ref(false);
      const formRef = ref(null);
      const { validForm } = useFormValid(formRef);

      const showModal = () => {
        visible.value = true;
      };

      const hideModal = () => {
        visible.value = false;
      };
      const handleSubmit = async () => {
        // 处理搜索按钮点击事件

        const value = await validForm();

        const params = value;
        const resp = await addAdmin(params);
        console.log(resp);
        visible.value = false;
        emit('submit');
      };

      return {
        visible,
        showModal,
        hideModal,
        schemas,
        handleSubmit,
        formRef,
      };
    },
  };
</script>
