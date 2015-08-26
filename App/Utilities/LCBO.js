class Product {
  constructor(attrs){
    this.thumbnail = attrs.image_thumb_url;
    this.title = attrs.name;
    this.producer = attrs.producer_name;
    this.origin = attrs.origin;
    this.package = attrs.package;
    this.price = `\$${attrs.price_in_cents/100.0}`;
  }
}

class LCBO {
  constructor() {
    this.url = "https://lcboapi.com"
    this.key = "MDpiZmVkZTdiOC00YjQ4LTExZTUtYjMxZC1jM2ZjNWM2NTc4Zjc6SjRLbllSbkd0UE5JVHFXdEM4M2F5dExZdWo3QjdmVjNabVZQ"
  }

  _urlFor(action, params) {
    return `${this.url}/${action}?access_key=${this.key}&${params}`;
  }

  _initializeProducts(entries, keys) {
    return entries.map((obj) => {
      return new Product(obj);
    });
  }

  products(query) {
    return fetch(this._urlFor('products', `q=${query}`))
    .then((response) => response.json())
    .then((data) => this._initializeProducts(data.result))
  }
}

module.exports = new LCBO;
