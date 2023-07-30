<template>
  <div>
    <BasicModal v-model:visible="visible" title="添加管理员" @ok="hideModal">
      <div class="pt-3px pr-3px" v-for="(item, index) in leaveDate" :key="index">
        {{ item }}
      </div>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  /* stylelint-disable-next-line CssSyntaxError */
  import { reactive, ref } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { getLeaveDate } from '/@/api/sys/leaveRecord.ts';
  export default {
    components: {
      BasicModal,
    },
    emits: ['submit'],
    setup(_props) {
      const visible = ref(false);
      const leaveDate = ref([]);
      const data = reactive({
        resp: {},
      });

      const showModal = async (id) => {
        visible.value = true;
        const resp = await getLeaveDate({ id });
        data.resp = resp.date; // 将 resp.data 转化为响应式对象
        leaveDate.value = data.resp;
        console.log(resp, leaveDate.value, data);
      };

      const hideModal = () => {
        visible.value = false;
      };

      return {
        visible,
        showModal,
        hideModal,
        leaveDate,
      };
    },
  };
</script>
