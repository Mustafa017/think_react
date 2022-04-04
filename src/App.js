import React, { Component } from "react";
import "./App.css";

class ProductRow extends Component {
  render() {
    const { product } = this.props;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductCategoryRow extends Component {
  render() {
    const { category } = this.props;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductTable extends Component {
  render() {
    const rows = [];
    let currentCategory = null;
    const { products } = this.props;

    products.forEach((product) => {
      if (product.category !== currentCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }

      rows.push(<ProductRow product={product} key={product.name} />);

      currentCategory = product.category;
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    const { filterText, inStock } = this.props;
    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} />
        <p>
          <input type="checkbox" checked={inStock} /> Only show products in
          stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends Component {
  state = {
    filterText: "",
    inStock: false,
  };
  render() {
    const { products } = this.props;
    const { filterText, inStock } = this.state;
    return (
      <div>
        <SearchBar filterText={filterText} inStock={inStock} />
        <ProductTable
          products={products}
          filterText={filterText}
          inStock={inStock}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <FilterableProductTable products={products} />
    </div>
  );
}

const products = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

export default App;
