<template>
  <a-modal v-model:visible="visible" title="时间" @ok="handleSubmit" width="80%" destroyOnClose>
    <a-range-picker
      :placeholder="['Start month', 'End month']"
      format="YYYY-MM"
      :value="value"
      :mode="['month', 'month']"
      @panelChange="fhandlePanelChange"
    />

    <Calendar
      v-if="reloadComponet"
      backgroundText
      class-name="select-mode"
      :select-date="selectedDates"
      selectMode="multi"
      language="cn"
      mode="monthRange"
      :monthRange="monthRange"
      class="edit-date"
    />
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref } from 'vue';
  import { DatePicker, Modal, message } from 'ant-design-vue';
  import Calendar from 'mpvue-calendar';
  import moment, { Moment } from 'moment';
  import { getWeekdaysOfMonth } from '/@/utils/index';
  import { getCalendarSettings, postCalendarSettings } from '/@/api/sys/school';
  const RangePicker = DatePicker.RangePicker;
  export default defineComponent({
    components: {
      [RangePicker.name]: RangePicker,
      Calendar,
      [Modal.name]: Modal,
    },
    setup() {
      const visible = ref(false);
      const value = ref<Moment[]>([]);
      const selectedDates = ref([]);
      const reloadComponet = ref(true);
      const school_id = ref('');
      const isFetch = ref(false);

      const monthRange = ref([]);

      const handleEditDate = async (record) => {
        visible.value = true;
        school_id.value = record.id;
        isFetch.value = true;
        const resp = await getCalendarSettings({ school_id: record.id });
        const selectedMonth = [];
        const selectedDate = [];
        if (resp.date) {
          resp.date.forEach((item) => {
            selectedMonth.push(moment(item).format('YYYY-M'));
            selectedDate.push(moment(item).format('YYYY-M-D'));
          });
          selectedDates.value = selectedDate;
          selectedMonth.sort((a, b) => a - b);
          value.value = [moment(selectedMonth[0]), moment(selectedMonth[selectedMonth.length - 1])];
          monthRange.value = [...new Set(selectedMonth)];
        }
      };

      const fhandlePanelChange = (val: Moment[]) => {
        value.value = val;

        console.log(val[0].month(), val[1].month());

        const length = val[1].month() - val[0].month();
        const beginMoth = moment(val[0]).month() + 1;
        console.log(length, beginMoth);

        // 重置已选日期
        monthRange.value = Array.from({ length: length + 1 }, (_val, key) => {
          console.log(key);
          const month = moment(val[0]).add(key, 'month');
          return month.format('YYYY-M');
        });
      };

      watch(monthRange, (_newValue, oldValue) => {
        reloadComponet.value = false; // 先将组件卸载
        // 在下一个 tick 中重新渲染组件
        setTimeout(() => {
          console.log(monthRange);
          const defaultDate = [];
          unref(monthRange).forEach((item) => {
            if (oldValue.includes(item) || isFetch.value) {
              return;
            }
            const currentDate = moment(item);
            const year = currentDate.year();
            const month = currentDate.month() + 1;
            const result = getWeekdaysOfMonth(year, month);
            defaultDate.push(...result);
          });
          selectedDates.value = [...new Set([...unref(selectedDates), ...defaultDate])];
          isFetch.value = false;
          reloadComponet.value = true;
        }, 0);
      });

      const handleSubmit = async () => {
        console.log(unref(selectedDates));
        const formattedDates = unref(selectedDates).map((item) =>
          moment(item).format('YYYY-MM-DD'),
        );
        const resp = await postCalendarSettings({
          school_id: Number(school_id.value),
          date: formattedDates,
        });
        console.log(resp);
        message.success('提交成功');
        school_id.value = '';
        visible.value = false;
      };

      return {
        selectedDates,
        value,
        fhandlePanelChange,
        visible,
        handleSubmit,
        handleEditDate,
        monthRange,
        reloadComponet,
      };
    },
  });
</script>

<style lang="less">
  .edit-date {
    width: 100%;
    padding-top: 20px;
    .vc-calendar-timetable-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .vc-calendar-timetable-item {
      min-width: 300px;
      padding-right: 20px;
    }
  }
  .ant-modal .ant-modal-body {
    padding: 20px;
  }
</style>
