import "./style.css";

const el = document.querySelector<HTMLParagraphElement>("#message");
if (el) {
  el.textContent = "Vite + TypeScript + vanilla CSS.";
}
