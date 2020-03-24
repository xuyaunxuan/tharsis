import Vue from 'vue';
import {
    Button, Menu, MenuItem, Drawer, Form, FormItem, Input
    , Switch, Row, Tag, Col, Popconfirm,Dialog,Notification
} from 'element-ui';
Vue.use(Button)
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Col);
Vue.use(Popconfirm)
Vue.use(Dialog)
Vue.prototype.$notify = Notification;