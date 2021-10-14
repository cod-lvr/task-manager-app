class Component {
  constructor(renderHookId) {
    this.renderHookId = renderHookId;
    this.hool;
  }

  createRootElement(tag, cssClass, Attribute = null) {
    const rootEl = document.createElement(tag);
    if (cssClass) {
      rootEl.className = cssClass;
    }
    if (Attribute && Attribute.length > 0) {
      for (const attr of Attribute) {
        rootEl.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.renderHookId).append(rootEl);
    return rootEl;
  }
}

class Head extends Component {
  constructor(renderHookId) {
    super(renderHookId);
  }
  render() {
    const header = this.createRootElement('div', "title");
    header.textContent = 'hello';

  }
}

const text = new Head("app");
text.render();
