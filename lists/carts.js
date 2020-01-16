const { Text, Relationship, Checkbox } = require("@keystonejs/fields");
module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: "Tên khách hàng"
    },
    phone: {
      type: Text,
      isRequired: true,
      label: "Điện thoại"
    },
    product: {
      type: Relationship,
      ref: "Product",
      many: true,
      label: "Sản phẩm"
    },
    done: { type: Checkbox, label: "Đã xong" }
  },

  label: "Giỏ hàng",
  labelField: "name"
};
