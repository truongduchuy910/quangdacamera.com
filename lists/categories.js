const { Text } = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true,
      label: "Tên danh mục"
    }
  },
  label: "Danh mục",
  labelField: "name"
};
