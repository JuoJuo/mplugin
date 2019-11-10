import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import popup from './popup'
import { Input, Row, Col } from 'view-design';


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
