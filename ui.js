// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "左组 " + (spec.left || []).length + " 个，右组 " + (spec.right || []).length + " 个。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.symmetric.forEach(function (name) {
      const card = document.createElement("div");
      card.className = "card on";
      const head = document.createElement("h3");
      head.textContent = name;
      card.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = (spec.left || []).indexOf(name) !== -1 ? "只在左组" : "只在右组";
      card.appendChild(mark);
      parts.stage.appendChild(card);
    });
    parts.legend.textContent = "对称差 " + view.count + " 个，交集 " + view.both + " 个";
    parts.log.textContent = "并集 " + view.union + " 个";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算对称差";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "右组加一个";
  addButton.addEventListener("click", function () {
    spec.right = (spec.right || []).concat(["delta"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "右组去掉一个";
  dropButton.addEventListener("click", function () {
    spec.right = (spec.right || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个键";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "beta";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { left: (spec.left || []).concat([box.value]) }));
      parts.out.textContent = box.value + " 加进左组后对称差 " + view.count + " 个";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看交集";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "交集 " + view.both + " 个，并集 " + view.union + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
