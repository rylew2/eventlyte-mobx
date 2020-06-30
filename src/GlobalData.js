import { observable } from "mobx";
const pageData = observable({});
export default {
  page: {
    getValue: function(name) {
      return pageData[name];
    },
    setValue: function(name, value) {
      pageData[name] = value;
    }
  }
};
