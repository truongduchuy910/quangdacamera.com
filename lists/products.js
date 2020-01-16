const { Text, Relationship, Slug, File, Float } = require("@keystonejs/fields");
const { Markdown } = require("@keystonejs/fields-markdown");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: "./public/store",
  path: "/store"
});

module.exports = {
  fields: {
    title: {
      type: Text,
      isRequired: true,
      isUnique: true,
      label: "Tên sản phẩm"
    },
    url: {
      type: Slug,
      from: "title",
      isUnique: true,
      label: "Đường dẫn"
    },
    description: {
      type: Text,
      isRequired: true,
      label: "Mô tả"
    },
    image: {
      type: File,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: ({ existingItem = {} }) =>
          fileAdapter.delete(existingItem)
      },
      label: "Hình ảnh"
    },
    cost: {
      type: Float,
      isRequired: true,
      label: "Giá"
    },
    content: {
      type: Markdown,
      label: "Nội dung chi tiết"
    },
    category: {
      type: Relationship,
      ref: "Category",
      many: true,
      label: "Danh mục"
    }
  },
  hooks: {
    afterDelete: ({ existingItem = {} }) => fileAdapter.delete(existingItem)
  },
  label: "Sản phẩm",
  labelField: "title"
};
