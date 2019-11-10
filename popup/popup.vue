<template>
<div class="popup-container">
  <Row :gutter="16" class="pdb-10">
    <Col span="20" v-if="isEdit"><Input v-model="domain" placeholder="input domain. eg: http://www.xxx.com" /></Col>
    <Col span="20" v-else>{{ this.domain === ''? '默认为所有域名都附加下面的header': this.domain }}</Col>
    <Col span="4" v-if="isEdit"><Button type="primary" @click="modifyDomain">确定</Button></Col>
    <Col span="4" v-else>
      <Button @click="switchEdit">编辑</Button>
    </Col>
  </Row>

  <Row :gutter="16">
    <Col span="10"><Input v-model="headerKey" placeholder="input header key" /></Col>
    <Col span="10"><Input v-model="headerValue" placeholder="input header value" /></Col>
    <Col span="4" class="txt-ct"><Button type="primary" @click="add">添加</Button></Col>
  </Row>

  <Row :gutter="16" v-for="(header, index) in headers" :key="headerKey" class="pdt-10 scroll">
    <Col span="10">{{ header.headerKey }}</Col>
    <Col span="10">{{ header.headerValue }}</Col>
    <Col span="4" class="txt-ct"><Button type="error" @click="deleteHeader(index)">移除</Button></Col>
  </Row>

  <Row :gutter="16" class="pdt-10 scroll" v-if="headers.length === 0">
    <Col span="224" class="txt-ct">there is no header which you want to add to this site.</Col>
  </Row>

</div>
</template>

<script>
  export default {
    data(){
      return {
        headerKey: '',
        headerValue: '',
        domain: '',
        headers: [],
        isEdit: false,
      }
    },
    mounted() {
      this.getSyncHeaders();
      this.getSyncDomain();
    },
    methods: {
      modifyDomain(){
        this.syncDomainData();
        this.switchEdit();
      },
      switchEdit(){
        this.isEdit = !this.isEdit;
      },
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

        const current = {
          headerKey: this.headerKey,
          headerValue: this.headerValue,
        };

        this.headers.push(current);
        this.syncHeaderData();
        this.clear();
      },
      clear() {
        this.headerKey = '';
        this.headerValue = '';
      },
      deleteHeader(index) {
        this.headers.splice(index, 1);
        this.syncHeaderData();
      },
      syncHeaderData() {
        this.setHeadersToLocal();
        chrome.storage.sync.set({headers: this.headers});
      },
      setHeadersToLocal() {
        localStorage.setItem('headers', JSON.stringify(this.headers));
      },
      syncDomainData() {
        this.setDomainToLocal();
        chrome.storage.sync.set({domain: this.domain});
      },
      setDomainToLocal() {
        localStorage.setItem('domain', this.domain);
      },
      getSyncHeaders() {
        chrome.storage.sync.get('headers', (result) => {
          this.headers = result.headers || [];
          this.setHeadersToLocal();
        });
      },
      getSyncDomain(){
        chrome.storage.sync.get('domain', (result) => {
          this.domain = result.domain || '';
          this.setDomainToLocal();
        });
      },
    }
  }
</script>

<style>
  .popup-container {
    width: 400px;
    padding: 10px 20px 20px;
  }
  .popup-container .pdt-10 {
    padding-top: 10px;
  }
  .popup-container .pdb-10 {
    padding-bottom: 10px;
  }
  .popup-container .scroll {
    max-height: 200px;
    overflow: hidden;
  }
  .popup-container .txt-ct {
    text-align: center;
  }
</style>
