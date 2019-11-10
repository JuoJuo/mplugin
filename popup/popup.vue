<template>
<div class="popup-container">
  <Row :gutter="16">
    <Col span="10"><Input v-model="headerKey" placeholder="input header key" /></Col>
    <Col span="10"><Input v-model="headerValue" placeholder="input header value" /></Col>
    <Col span="4" class="txt-ct"><Button type="primary" @click="add">添加</Button></Col>
  </Row>

  <Row :gutter="16" v-for="(header, index) in headers" :key="headerKey" class="pdt-20 scroll">
    <Col span="10">{{ header.headerKey }}</Col>
    <Col span="10">{{ header.headerValue }}</Col>
    <Col span="4" class="txt-ct"><Button type="error" @click="deleteHeader(index)">删除</Button></Col>
  </Row>

  <Row :gutter="16" class="pdt-20 scroll" v-if="headers.length === 0">
    <Col span="224" class="txt-ct">no data</Col>
  </Row>

</div>
</template>

<style>
  .popup-container {
    width: 400px;
    padding: 20px
  }
  .popup-container .pdt-20 {
    padding-top: 20px;
  }
  .popup-container .scroll {
    max-height: 200px;
    overflow: hidden;
  }
  .popup-container .txt-ct {
    text-align: center;
  }
</style>

<script>
  export default {
    data(){
      return {
        headerKey: '',
        headerValue: '',
        headers: [],
      }
    },
    methods: {
      checkValid() {
        if (this.headerKey === '' || this.headerValue === '') {
          this.$Message.error('all the input can\'t be empty!');
          return false;
        }

        const keyExist = this.headers.find(({headerKey }) => headerKey === this.headerKey);

        if (keyExist) {
          this.$Message.error('key already in the list!');
          return false;
        }

        return true;
      },
      add() {
        if (!this.checkValid()) return;

        this.headers.push({
          headerKey: this.headerKey,
          headerValue: this.headerValue,
        });

        this.clear();
      },
      clear() {
        this.headerKey = '';
        this.headerValue = '';
      },
      deleteHeader(index) {
        this.headers.splice(index, 1);
      },
    }
  }
</script>

<style scoped>

</style>
