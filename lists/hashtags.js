const { Text } = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true

    }
  },
  label: "Thẻ",
  labelField: "name"
};
