<template>
  <div>
    <BasicModal v-model:visible="visible" title="修改密码" @ok="handleSubmit">
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
  import { ref, unref } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form';
  import { BasicModal } from '/@/components/Modal';
  import { updatePassword } from '/@/api/sys/admin';
  import { useFormValid } from '/@/views/sys/login/useLogin';

  const schemas: FormSchema[] = [
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
      const userId = ref('');
      const { validForm } = useFormValid(formRef);

      const showModal = (id) => {
        visible.value = true;
        userId.value = id;
      };

      const hideModal = () => {
        visible.value = false;
      };
      const handleSubmit = async () => {
        // 处理搜索按钮点击事件

        const value = await validForm();

        const params = value;
        const resp = await updatePassword({
          id: unref(userId),
          ...params,
        });
        console.log(resp);
        userId.value = '';
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
