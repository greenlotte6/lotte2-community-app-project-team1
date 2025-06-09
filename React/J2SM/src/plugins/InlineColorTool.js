export default class InlineColorTool {
  static get isInline() {
    return true;
  }

  static get sanitize() {
    return {
      span: {
        class: true,
        style: true,
      },
    };
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = "SPAN";
    this.className = "cdx-inline-color";
    this.colors = ["#FF1300", "#4CAF50", "#2196F3", "#FFC107"];
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML = "🎨";
    this.button.classList.add(this.api.styles.inlineToolButton);

    this.button.addEventListener("click", () => {
      const selectedColor = prompt(
        `색상 코드 입력 (예: #FF0000)\n아니면 아래 중 선택: ${this.colors.join(
          ", "
        )}`,
        this.colors[0]
      );
      if (selectedColor) {
        this.chosenColor = selectedColor;
        this.api.inlineToolbar.close(); // 자동 닫힘 방지용
      }
    });

    return this.button;
  }

  surround(range) {
    if (!range || range.collapsed) return;

    const selectedText = range.extractContents();
    const span = document.createElement(this.tag);
    span.classList.add(this.className);
    span.style.color = this.chosenColor || "#FF1300";
    span.appendChild(selectedText);
    range.insertNode(span);
  }

  checkState(selection) {
    const parent = this.api.selection.findParentTag(this.tag, this.className);
    this.button.classList.toggle(
      this.api.styles.inlineToolButtonActive,
      !!parent
    );
  }

  clear() {
    this.chosenColor = null;
  }
}
