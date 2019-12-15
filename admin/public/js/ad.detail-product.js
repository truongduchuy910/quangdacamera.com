var SDK = {
  init: function() {
    SDK.categories = {
      box: $("#categories-box"),
      item: $("#categories-box").html(),
      data: ["Danh mục 1", "Danh mục 2", "Danh mục 3"],
      search: {
        data: ["Danh mục 1", "Danh mục 2", "Danh mục 3"],
        new: $("#categories-search-new")[0].outerHTML,
        item: $("#categories-search-item")[0].outerHTML,
        box: $("#categories-search-box"),
        input: $("#categories-search")[0]
      }
    };
    SDK.brands = {
      box: $("#brands-box"),
      item: $("#brands-box").html(),
      data: ["Thương hiệu 1", "Thương hiệu 2", "Thương hiệu 3"]
    };

    SDK.descHTML = {
      data: "<p>Mô tả chi tiết sản phẩm</p>"
    };

    SDK.description = {
      box: new Quill("#description", {
        theme: "snow",
        placeholder: "Nhập mô tả..."
      })
    };

    SDK.descDelta = {
      data: [
        { insert: "Hello " },
        { insert: "World!", attributes: { bold: true } },
        { insert: "\n" }
      ]
    };

    SDK.name = {
      box: $("#name-box")[0],
      data: "Tên sản phẩm"
    };

    SDK.price = {
      box: $("#price-box")[0],
      data: 12323
    };

    SDK.sale = {
      box: $("#sale-box")[0],
      data: 213123123
    };

    SDK.images = {
      item: $("#images-box").html(),
      box: $("#images-box"),
      data: [
        "http://localhost:4000/img/bg-header.png",
        "http://localhost:4000/img/bg-header.png"
      ]
    };
  },
  refresh: function() {
    var cgt = SDK.categories;
    cgt.box.empty();
    cgt.data.forEach(name => {
      cgt.box.append(cgt.item.replace(/NAME/g, name));
    });
    cgt.search.box.empty();
    var br = SDK.brands;
    br.box.empty();
    br.data.forEach(name => {
      br.box.append(br.item.replace(/NAME/g, name));
    });

    SDK.description.box.setContents(SDK.descDelta.data);

    SDK.name.box.value = SDK.name.data;

    SDK.price.box.value = SDK.price.data;

    // SDK.sale.box.value = SDK.sale.data;

    var img = SDK.images;
    img.box.empty();
    img.data.forEach(url => {
      img.box.append(
        img.item.replace(
          /<img class="w-100">/g,
          `<img class="w-100" src = ${url}>`
        )
      );
    });
    SDK.listen();
  },
  listen: function() {
    SDK.name.box.onkeyup = function() {
      console.log(SDK.value);
    };
    SDK.price.box.onkeyup = function() {
      console.log(SDK.value);
    };
    SDK.categories.search.input.onkeyup = function() {
      var temp = SDK.categories.search;
      temp.box.empty();
      temp.data.forEach(name => {
        temp.box.append(temp.item.replace(/NAME/g, name));
      });
      var keyword = this.value;
      if (keyword) {
        temp.box.append(temp.new.replace(/NAME/g, keyword));
        $("#categories-search-new")[0].click(function() {
          SDK.routers.categories_search_new(keyword);
        });
      }
    };
    SDK.categories.search.input;
    $(".brands-remove").click(function() {
      findAndRemove(SDK.brands.data, SDK.getAttribute("value"));

      SDK.refresh();
    });

    $(".categories-remove").click(function() {
      findAndRemove(SDK.categories.data, SDK.getAttribute("value"));
      SDK.refresh();
    });
  },
  findAndUpdate: function() {},
  routers: {
    categories_search_new: function(keyword) {},
    detail: function() {}
  }
};
SDK.init();
SDK.routers.detail();
SDK.refresh();
function findAndRemove(array, elem) {
  var index = array.indexOf(elem);
  while (index > -1) {
    array.splice(index, 1);
    index = array.indexOf(elem);
  }
}
function search(data, keyword) {
  var keyword = this.value;
  var condition = new RegExp(keyword, "i");
  var result = new Array();
  data.forEach(name => {
    if (name.search(condition) != -1) {
      result.push(label);
    }
  });

  if (result.length) {
    data.showLabels = result;
    updateContent();
  } else {
    box.innerText = "Không tìm thấy thẻ bạn yêu cầu...";
  }
}
function searchToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for (i in pairs) {
    if (pairs[i] === "") continue;

    pair = pairs[i].split("=");
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return obj;
}
$.post(
  "/products/detail",
  {
    q: searchToObject.p
  },
  data => {
    console.log(data);
  }
);
