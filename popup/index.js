import Vue from 'vue';
import ViewUI, { Input, Row, Col } from 'view-design';
import 'view-design/dist/styles/iview.css';
import popup from './popup'

Vue.component('Input', Input);
Vue.component('Row', Row);
Vue.component('Col', Col);

Vue.use(ViewUI,{
  size: 'small'
});

new Vue({
  el: '#app',
  components: { popup },
  template: '<popup/>'
});
