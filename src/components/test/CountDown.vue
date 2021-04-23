<template>
  <span>{{ timeData.hours }}:{{ timeData.minutes }}:{{ timeData.seconds }}</span>
</template>

<script>
import { h, reactive, onMounted, onBeforeUnmount, toRef } from "vue";
function formatTime(time) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;

  const format = time => padTwo(Math.floor(time));

  const hours = format(time / HOUR);
  const minutes = format((time % HOUR) / MINUTE);
  const seconds = format((time % MINUTE) / SECOND);
  const millisecond = format(time % SECOND);

  return {
    hours,
    minutes,
    seconds,
    millisecond
  };
}
function padTwo(t) {
  return Number(t) >= 10 ? t.toString().slice(0, 2) : "0" + t;
}
export default {
  name: "CountDown",
  props: {
    time: {
      type: Number,
      default: 0
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const interval = 1000;

    let leftTime = props.time;
    let autoStart = props.autoStart;

    let ticker = null;
    let timeData = reactive(formatTime(leftTime));

    const updateTime = (timeData, leftTime) => {
      const data = formatTime(leftTime);
      Object.keys(timeData).forEach(k => {
        timeData[k] = data[k];
      });
    };

    const start = () => {
      let notice = false;
      if (!ticker && leftTime > 0) {
        ticker = setInterval(() => {
          leftTime -= interval;
          if (!notice && leftTime <= 1000*60*3) {
            emit("nextToEnd");
            notice = true;
          }
          if (leftTime <= 0) {
            leftTime = 0;
            clearInterval(ticker);
            emit("finish");
          } else {
            emit("change", leftTime);
          }

          updateTime(timeData, leftTime);
        }, interval);
      }
    };

    const stop = () => {
      clearInterval(ticker);
      ticker = null;
    };

    const restart = () => {
      clearInterval(ticker);
      ticker = null;
      leftTime = props.time;

      emit("change", leftTime);
      updateTime(timeData, leftTime);

      start();
    };

    onMounted(() => {
      autoStart && start();
    });

    onBeforeUnmount(() => {
      stop();
    });

    return {
      timeData,
      start,
      stop,
      restart
    };
  },
}
</script>

<style scoped>

</style>