<template>
  <div>
    <BasicModal
      v-model:visible="visible"
      :title="title"
      @ok="handleSubmit"
      width="80%"
      destroyOnClose
    >
      <BasicTable @register="registerTable" :maxHeight="550" class="edit-school" ref="tableElRef">
        <template #toolbar>
          <a-button @click="handleAddSchoolConfig">添加年级</a-button>
        </template>
        <template #action="{ record, column }">
          <TableAction :actions="createActions(record, column)" />
        </template>
      </BasicTable>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { computed, nextTick, ref, unref } from 'vue';
  import { Modal, message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, TableAction } from '/@/components/Table';
  import useEditSchoolConfig from '../hooks/useEditSchoolConfig';
  import { generateRandomString } from '/@/utils';
  import { postGradeSettings } from '/@/api/sys/school';

  export default {
    components: {
      [Modal.name]: Modal,
      BasicModal,
      BasicTable,
      TableAction,
    },
    emits: ['submit'],
    setup(_props) {
      const visible = ref(false);
      const title = '添加订餐信息';
      const tableElRef = ref();
      const { registerTable, createActions, configId } = useEditSchoolConfig(tableElRef);
      const schoolId = computed(() => configId.value);

      const handleEditSchoolConfig = (record: Record<string, string>) => {
        visible.value = true;
        console.log(record);
        configId.value = record.id;
        nextTick(() => {
          tableElRef.value.reload();
        });
      };

      const handleAddSchoolConfig = () => {
        const key = generateRandomString(8);
        tableElRef.value.insertTableDataRecord({
          grade: '',
          class_num: '',
          key,
        });
        const record = tableElRef.value.findTableDataRecord(key);
        setTimeout(() => {
          record?.onEdit?.(true);
        }, 100);
      };

      const handleSubmit = async () => {
        // 处理搜索按钮点击事件
        console.log('gg', tableElRef.value.getDataSource());
        const tableData = tableElRef.value.getDataSource();

        const settings = tableData.map((item) => {
          const { grade, class_num } = item;
          return {
            grade,
            class_num,
          };
        });
        console.log(schoolId, configId);
        const resp = await postGradeSettings({
          school_id: Number(unref(schoolId)),
          settings,
        });
        console.log(resp);
        message.success('更新配置成功');
        visible.value = false;
      };

      return {
        visible,
        title,
        handleSubmit,
        handleEditSchoolConfig,
        registerTable,
        createActions,
        tableElRef,
        handleAddSchoolConfig,
      };
    },
  };
</script>

<style scoped lang="less">
  .edit-school {
    .vben-basic-table-action {
      justify-content: center;
    }
  }
</style>
