const GraphQL = require("./GraphQL");
module.exports = function(app) {
  app.post("/api", (req, res) => {
    GraphQL(req.body.query, data => {
      res.send(data);
    });
  });
  app.post("/createCart", (req, res) => {
    var query = `
    mutation {
      createCart (data: {
        name: "${req.body.name}",
        phone: "${req.body.phone}",
        product: {
          connect: {
            id:"${req.body.id}"
          }
        }
      }) {
        id
      }
    }
    `;
    GraphQL(query, data => {
      res.redirect(`/success/${data.data.createCart.id}`);
    });
  });
  app.get("/", (req, res) => {
    GraphQL(
      `query {
      allCategories {
        name
      }
      allProducts (first:9) {
        title
        url
        description
        image {
          publicUrl
        }
        cost
      }
      allPosts(first:9) {
        title
        url
        description
        image {
          publicUrl
        }
      }
    }`,
      data => {
        res.render("pages/index", data);
      }
    );
  });
  app.get("/news", (req, res) => {
    var query = `query {
      allCategories {
        name
      }
      allPosts {
        title
        url
        description
        image {
          publicUrl
        }
      }
      allHashtags {
        name
      }
    }`;
    if (req.query.name)
      query = `query {
      allCategories {
        name
      }
      allPosts(where: {hashtag_some: {name: "${req.query.name}"}}) {
        title
        url
        description
        image {
          publicUrl
        }
      }
      allHashtags {
        name
      }
    }`;
    query = GraphQL(query, data => {
      res.render("pages/news", data);
    });
  });
  app.get("/post/:url", (req, res) => {
    GraphQL(
      `query {
      allCategories {
        name
      }
      allPosts {
        title
        url
        description
        image {
          publicUrl
        }
      }
    }`,
      data => {
        res.render("pages/post", data);
      }
    );
  });
  app.get("/catalog", (req, res) => {
    GraphQL(
      `query {
      allCategories {
        name
      }
      allProducts(where: {category_some:{name: "${req.query.name}"}}) {
        title
        url
        description
        image {
          publicUrl
        }
        cost
      }

    }`,
      data => {
        res.render("pages/catalog", data);
      }
    );
  });
  app.get("/product/:url", (req, res) => {
    GraphQL(
      `query {
      allCategories {
        name
      }
      Product: allProducts(where: {url: "${req.params.url}"}) {
        title
        url
        description
        image {
          publicUrl
        }
        cost
       id      
      }
      allProducts (first:9) {
        title
        url
        description
        image {
          publicUrl
        }
        cost
      }
    }`,
      data => {
        if (data.data.Product.length) res.render("pages/product", data);
        else res.redirect("/");
      }
    );
  });
  app.get("/success/:id", (req, res) => {
    GraphQL(
      `query {
      allCategories {
        name
      }
      Cart(where:{id: "${req.params.id}"}) {
        name
        phone 
        product {
          title
          url
          description
          image {
            publicUrl
          }
          cost
        }
      }
      }
      `,
      data => {
        console.log(data);
        data.data.allProducts = data.data.Cart.product;
        res.render("pages/success", data);
      }
    );
  });
};
