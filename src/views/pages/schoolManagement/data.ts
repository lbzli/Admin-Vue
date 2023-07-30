import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'disclosure',
    component: 'Select',
    label: '学校名称',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请选择',
      options: [
        {
          label: '同事1',
          value: '1',
        },
        {
          label: '同事2',
          value: '2',
        },
        {
          label: '同事3',
          value: '3',
        },
      ],
    },
  },
];
