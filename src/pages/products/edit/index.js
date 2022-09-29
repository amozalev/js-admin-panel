import ProductForm from '../../../components/product-form';

export default class Page {
  element;
  subElements = {};
  components = [];

  async addProductForm() {
    const strippedPathArr = decodeURI(window.location.pathname)
      .replace(/^\/|\/$/, '')
      .split('/');
    const id = strippedPathArr.length ? strippedPathArr[strippedPathArr.length - 1] : '';

    const form = new ProductForm(id);
    await form.render();

    this.element.append(form.element);
    this.components.push(form);
  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div>
        <h1>Edit page</h1>
      </div>`;

    this.element = element.firstElementChild;

    await this.addProductForm();

    return this.element;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = null;

    for (const component of this.components) {
      component.destroy();
    }
  }
}
