<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = "on";
  const CLS_HALF = "half";
  const CLS_OFF = "off";

  export default{
    created: function () {
    },
    props: ['size', 'score'],
    data: function () {
      return {};
    },
    methods: {},
    components: {},
    computed: {
      starType: function () {
        return 'star-' + this.size;
      },
      itemClasses: function () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        if (result.length < LENGTH) {
          result.push(CLS_OFF)
        }

        return result;
      }
    }
  };
</script>

<style>
  .star {
    font-size: 0;
  }

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    margin-right: 22px;
    width: 20px;
    height: 20px;
  }

  .star-item:last-child {
    margin-right: 0;
  }

  .on {
    background-image: url("./star48_on@3x.png");
  }

  .half {
    background-image: url("./star48_half@3x.png");
  }

  .off {
    background-image: url("./star48_off@3x.png");
  }
</style>
