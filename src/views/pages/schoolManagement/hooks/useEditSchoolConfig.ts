import { cloneDeep } from 'lodash-es';
import { ref } from 'vue';
import { getGradeSettings } from '/@/api/sys/school';
import { ActionItem, BasicColumn, EditRecordRow, useTable } from '/@/components/Table';
import { useMessage } from '/@/hooks/web/useMessage';

const columns: BasicColumn[] = [
  {
    title: '年级',
    dataIndex: 'grade',
    editRow: true,
    editRule: true,
    editComponent: 'Select',
    editComponentProps: {
      options: [
        {
          label: '年级一',
          value: '一',
        },
        {
          label: '年级二',
          value: '二',
        },
        {
          label: '年级三',
          value: '三',
        },
        {
          label: '年级四',
          value: '四',
        },
        {
          label: '年级五',
          value: '五',
        },
        {
          label: '年级六',
          value: '六',
        },
      ],
    },
  },
  {
    title: '班级数量',
    dataIndex: 'class_num',
    editRow: true,
    editRule: true,
    editComponent: 'InputNumber',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    slots: { customRender: 'action' },
  },
];

export default function useEditSchoolConfig(tableElRef) {
  const currentEditKeyRef = ref('');
  const configId = ref('');

  const { createMessage: msg } = useMessage();
  const [registerTable] = useTable({
    title: '配置列表',
    columns,
    showIndexColumn: false,
    showTableSetting: false,
    api: getGradeSettings,
    fetchSetting: {
      pageField: 'page',
      sizeField: 'size',
      listField: 'settings',
      totalField: 'total',
    },
    immediate: false,
    beforeFetch: (defaultParams) => {
      return {
        ...defaultParams,
        school_id: configId.value,
      };
    },
  });

  function handleEdit(record: EditRecordRow) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }

  async function handleCancel(record: EditRecordRow) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }

  async function handleSave(record: EditRecordRow) {
    // 校验
    msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const data = cloneDeep(record.editValueRefs);
        console.log(data);
        //TODO 此处将数据提交给服务器保存
        // ...
        // 保存之后提交编辑状态
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
        msg.success({ content: '数据已保存', key: 'saving' });
      } catch (error) {
        msg.error({ content: '保存失败', key: 'saving' });
      }
    } else {
      msg.error({ content: '请填写正确的数据', key: 'saving' });
    }
  }

  function handleDelete(record: EditRecordRow) {
    tableElRef.value?.deleteTableDataRecord(record.key);
    console.log(record, tableElRef.value, tableElRef.value?.getDataSource());
  }

  function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleDelete.bind(null, record),
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record, column),
      },
      {
        label: '取消',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record, column),
        },
      },
    ];
  }

  return {
    registerTable,
    createActions,
    configId,
  };
}
