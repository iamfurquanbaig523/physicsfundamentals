"use client";

import { useEffect, useRef } from "react";

type ArticleContentProps = {
  html: string;
};

function decodeBlockPayload(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function runWhenIdle(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (handler: () => void) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(callback);
    return;
  }

  window.setTimeout(callback, 1);
}

function skeletonMarkup() {
  return `
    <div class="html-block-skeleton" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
}

function iframeDocument(html: string) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    color-scheme: dark;
    --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "DM Mono", ui-monospace, SFMono-Regular, Consolas, monospace;
    --color-background-primary: rgba(11, 18, 39, 0.92);
    --color-background-secondary: rgba(13, 26, 51, 0.86);
    --color-background-info: rgba(6, 182, 212, 0.12);
    --color-text-primary: #F8FBFF;
    --color-text-secondary: #AEBAD0;
    --color-text-info: #67E8F9;
    --color-border-primary: #67E8F9;
    --color-border-secondary: rgba(103, 232, 249, 0.45);
    --color-border-tertiary: rgba(148, 163, 184, 0.22);
    --color-border-info: #67E8F9;
    --border-radius-md: 8px;
    --border-radius-lg: 8px;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    min-height: 0 !important;
    overflow-x: auto !important;
    overflow-y: auto !important;
    overscroll-behavior-x: contain;
    scrollbar-color: rgba(103, 232, 249, 0.45) transparent;
    scrollbar-width: thin;
  }
  body {
    background: transparent;
    color: var(--color-text-primary);
    margin: 0;
    min-height: 0 !important;
    overflow-x: visible !important;
    overflow-y: visible !important;
  }
  html::-webkit-scrollbar {
    height: 8px;
    width: 0;
  }
  html::-webkit-scrollbar-track {
    background: transparent;
  }
  html::-webkit-scrollbar-thumb {
    background: rgba(103, 232, 249, 0.45);
    border-radius: 999px;
  }
  body::-webkit-scrollbar {
    display: none;
  }
  .doc-slot[draggable="true"],
  [data-list-key][data-idx] {
    touch-action: none;
  }
  .touch-dragging {
    opacity: 0.65;
  }
  .touch-drop-target {
    outline: 2px solid rgba(103, 232, 249, 0.72) !important;
    outline-offset: 2px;
  }
  a {
    color: #67E8F9;
  }
  table,
  th,
  td,
  .card,
  .panel,
  .box,
  [class*="card"],
  [class*="panel"],
  [class*="box"] {
    border-color: rgba(148, 163, 184, 0.22) !important;
  }
  th,
  [class*="header"],
  [class*="Header"] {
    color: #F8FBFF !important;
  }
  td,
  p,
  li,
  label,
  small {
    color: #D8E3F4;
  }
  input,
  textarea,
  select {
    border: 1px solid rgba(103, 232, 249, 0.24) !important;
    border-radius: 6px;
    background: rgba(7, 17, 31, 0.68) !important;
    color: #F8FBFF !important;
  }
  [style*="background:#fff"],
  [style*="background: #fff"],
  [style*="background:#FFF"],
  [style*="background: #FFF"],
  [style*="background:#ffffff"],
  [style*="background: #ffffff"],
  [style*="background:#FFFFFF"],
  [style*="background: #FFFFFF"],
  [style*="background-color:#fff"],
  [style*="background-color: #fff"],
  [style*="background-color:#ffffff"],
  [style*="background-color: #ffffff"],
  [style*="background-color:#FFFFFF"],
  [style*="background-color: #FFFFFF"],
  [style*="background:#f8fafc"],
  [style*="background: #f8fafc"],
  [style*="background:#f9fafb"],
  [style*="background: #f9fafb"],
  [style*="background:#f3f4f6"],
  [style*="background: #f3f4f6"],
  [style*="background:#f1f5f9"],
  [style*="background: #f1f5f9"],
  [style*="background:#e5e7eb"],
  [style*="background: #e5e7eb"],
  [style*="background:#e2e8f0"],
  [style*="background: #e2e8f0"],
  [style*="background:#eee"],
  [style*="background: #eee"],
  [style*="background:#f5f5f5"],
  [style*="background: #f5f5f5"],
  [style*="background-color:#f8fafc"],
  [style*="background-color: #f8fafc"],
  [style*="background-color:#f9fafb"],
  [style*="background-color: #f9fafb"],
  [style*="background-color:#f3f4f6"],
  [style*="background-color: #f3f4f6"],
  [style*="background-color:#f1f5f9"],
  [style*="background-color: #f1f5f9"],
  [style*="background-color:#e5e7eb"],
  [style*="background-color: #e5e7eb"],
  [style*="background-color:#e2e8f0"],
  [style*="background-color: #e2e8f0"],
  [style*="background-color:#eee"],
  [style*="background-color: #eee"],
  [style*="background-color:#f5f5f5"],
  [style*="background-color: #f5f5f5"],
  [style*="background:rgb(255,255,255"],
  [style*="background: rgb(255, 255, 255"],
  [style*="background-color:rgb(255,255,255"],
  [style*="background-color: rgb(255, 255, 255"],
  [style*="background:white"],
  [style*="background: white"],
  [style*="background-color:white"],
  [style*="background-color: white"],
  .bg-white,
  [class*="bg-white"],
  [class*="bg-slate-50"],
  [class*="bg-gray-50"],
  [class*="bg-gray-100"],
  [class*="bg-slate-100"] {
    background: rgba(11, 18, 39, 0.92) !important;
  }
  [style*="color:#111"],
  [style*="color: #111"],
  [style*="color:#000"],
  [style*="color: #000"],
  [style*="color:#222"],
  [style*="color: #222"],
  [style*="color:#333"],
  [style*="color: #333"],
  [style*="color:#374151"],
  [style*="color: #374151"],
  [style*="color:#4b5563"],
  [style*="color: #4b5563"],
  [style*="color:rgb(0,0,0"],
  [style*="color: rgb(0, 0, 0"],
  [style*="color:rgb(17,24,39"],
  [style*="color: rgb(17, 24, 39"],
  [style*="color:black"],
  [style*="color: black"],
  .text-black,
  [class*="text-black"],
  [class*="text-gray-900"],
  [class*="text-slate-900"],
  [class*="text-neutral-900"] {
    color: #F8FBFF !important;
  }
  [class*="text-gray-700"],
  [class*="text-gray-600"],
  [class*="text-slate-700"],
  [class*="text-slate-600"],
  [class*="text-neutral-700"],
  [class*="text-neutral-600"] {
    color: #D8E3F4 !important;
  }
  [style*="border-color:#ddd"],
  [style*="border-color: #ddd"],
  [style*="border-color:#e5e7eb"],
  [style*="border-color: #e5e7eb"],
  [style*="border-color:#e2e8f0"],
  [style*="border-color: #e2e8f0"],
  [style*="border-color:#cbd5e1"],
  [style*="border-color: #cbd5e1"],
  [style*="border-color:#e"],
  [style*="border-color: #e"],
  [class*="border-gray-"],
  [class*="border-slate-"],
  [class*="border-neutral-"] {
    border-color: rgba(148, 163, 184, 0.24) !important;
  }
  @media (max-width: 640px) {
    [style*="grid-template-columns:1fr 1fr 1fr"],
    [style*="grid-template-columns: 1fr 1fr 1fr"] {
      min-width: 680px !important;
    }
  }
  button.tab,
  .tab {
    appearance: none !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 2.35rem;
    max-width: 100%;
    margin: 0.25rem 0.35rem 0.25rem 0 !important;
    border: 1px solid rgba(103, 232, 249, 0.24) !important;
    border-radius: 4px !important;
    background: rgba(7, 17, 31, 0.62) !important;
    color: #C8D5EA !important;
    cursor: pointer !important;
    font-family: var(--font-mono) !important;
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.04em !important;
    line-height: 1.2 !important;
    padding: 0.62rem 0.95rem !important;
    text-align: center !important;
    text-transform: uppercase !important;
    transition: border-color 160ms ease, background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease !important;
    white-space: normal !important;
  }
  button.tab:hover,
  button.tab:focus-visible,
  .tab:hover,
  .tab:focus-visible {
    border-color: rgba(103, 232, 249, 0.72) !important;
    background: rgba(6, 182, 212, 0.12) !important;
    color: #F8FBFF !important;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.12), 0 0 24px rgba(6, 182, 212, 0.12) !important;
    outline: none !important;
    transform: translateY(-1px);
  }
  button.tab.active,
  button.tab[aria-selected="true"],
  .tab.active,
  .tab[aria-selected="true"] {
    border-color: rgba(103, 232, 249, 0.82) !important;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.92), rgba(124, 156, 255, 0.86)) !important;
    color: #03101C !important;
    box-shadow: 0 12px 32px rgba(6, 182, 212, 0.24) !important;
  }
  svg .arr {
    stroke: rgba(103, 232, 249, 0.55);
    stroke-width: 1;
  }
  svg .node rect {
    fill: rgba(11, 18, 39, 0.94);
    stroke: rgba(103, 232, 249, 0.42);
  }
  svg .node .th {
    fill: #F8FBFF;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 800;
  }
  svg .node .ts {
    fill: #AEBAD0;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 600;
  }
  svg .node.c-teal rect,
  svg .node.c-green rect {
    fill: rgba(20, 83, 75, 0.42);
    stroke: #5EEAD4;
  }
  svg .node.c-purple rect,
  svg .node.c-violet rect {
    fill: rgba(88, 28, 135, 0.42);
    stroke: #C084FC;
  }
  svg .node.c-coral rect,
  svg .node.c-orange rect {
    fill: rgba(124, 45, 18, 0.42);
    stroke: #FDBA74;
  }
  svg .node.c-blue rect {
    fill: rgba(30, 58, 138, 0.42);
    stroke: #93C5FD;
  }
  svg .node.c-lime rect {
    fill: rgba(63, 98, 18, 0.42);
    stroke: #BEF264;
  }
  svg .node-circle.c-teal circle,
  svg g.c-teal > circle,
  svg .node-circle.c-green circle,
  svg g.c-green > circle {
    fill: rgba(20, 83, 75, 0.42);
    stroke: #5EEAD4;
  }
  svg .node-circle.c-purple circle,
  svg g.c-purple > circle,
  svg .node-circle.c-violet circle,
  svg g.c-violet > circle {
    fill: rgba(88, 28, 135, 0.42);
    stroke: #C084FC;
  }
  svg .node-circle.c-coral circle,
  svg g.c-coral > circle,
  svg .node-circle.c-orange circle,
  svg g.c-orange > circle {
    fill: rgba(124, 45, 18, 0.42);
    stroke: #FDBA74;
  }
  svg .node-circle.c-blue circle,
  svg g.c-blue > circle {
    fill: rgba(30, 58, 138, 0.42);
    stroke: #93C5FD;
  }
  svg .node-circle.c-lime circle,
  svg g.c-lime > circle {
    fill: rgba(63, 98, 18, 0.42);
    stroke: #BEF264;
  }
  svg .node.c-teal .th,
  svg .node.c-green .th,
  svg .node.c-purple .th,
  svg .node.c-violet .th,
  svg .node.c-coral .th,
  svg .node.c-orange .th,
  svg .node.c-blue .th,
  svg .node.c-lime .th {
    fill: #F8FBFF;
  }
  svg .node-circle.c-teal .th,
  svg .node-circle.c-green .th,
  svg .node-circle.c-purple .th,
  svg .node-circle.c-violet .th,
  svg .node-circle.c-coral .th,
  svg .node-circle.c-orange .th,
  svg .node-circle.c-blue .th,
  svg .node-circle.c-lime .th,
  svg g.c-teal > .th,
  svg g.c-green > .th,
  svg g.c-purple > .th,
  svg g.c-violet > .th,
  svg g.c-coral > .th,
  svg g.c-orange > .th,
  svg g.c-blue > .th,
  svg g.c-lime > .th {
    fill: #F8FBFF;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 800;
  }
  svg .node.c-teal .ts,
  svg .node.c-green .ts,
  svg .node.c-purple .ts,
  svg .node.c-violet .ts,
  svg .node.c-coral .ts,
  svg .node.c-orange .ts,
  svg .node.c-blue .ts,
  svg .node.c-lime .ts {
    fill: #C8D5EA;
  }
  svg .node-circle.c-teal .ts,
  svg .node-circle.c-green .ts,
  svg .node-circle.c-purple .ts,
  svg .node-circle.c-violet .ts,
  svg .node-circle.c-coral .ts,
  svg .node-circle.c-orange .ts,
  svg .node-circle.c-blue .ts,
  svg .node-circle.c-lime .ts,
  svg g.c-teal > .ts,
  svg g.c-green > .ts,
  svg g.c-purple > .ts,
  svg g.c-violet > .ts,
  svg g.c-coral > .ts,
  svg g.c-orange > .ts,
  svg g.c-blue > .ts,
  svg g.c-lime > .ts {
    fill: #C8D5EA;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
  }
</style>
</head>
<body>
${html}
<script>
(() => {
  const measureHeight = () => {
    const body = document.body;
    if (!body) return 220;

    const bodyRect = body.getBoundingClientRect();
    const bodyStyle = getComputedStyle(body);
    const bottomPadding = Number.parseFloat(bodyStyle.paddingBottom) || 0;
    let contentBottom = 0;

    Array.from(body.children).forEach((child) => {
      const rect = child.getBoundingClientRect();
      const style = getComputedStyle(child);
      const marginBottom = Number.parseFloat(style.marginBottom) || 0;
      if (rect.width > 0 || rect.height > 0) {
        contentBottom = Math.max(contentBottom, rect.bottom - bodyRect.top + marginBottom);
      }
    });

    return Math.ceil(Math.max(contentBottom + bottomPadding, 220)) + 2;
  };
  const sendHeight = () => {
    const height = measureHeight();
    parent.postMessage({ type: "seb-html-block-height", height }, "*");
  };
  const scheduleHeight = () => {
    requestAnimationFrame(sendHeight);
    setTimeout(sendHeight, 80);
    setTimeout(sendHeight, 240);
    setTimeout(sendHeight, 600);
  };
  window.addEventListener("load", scheduleHeight);
  window.addEventListener("resize", scheduleHeight);
  document.addEventListener("click", scheduleHeight, true);
  document.addEventListener("input", scheduleHeight, true);
  document.addEventListener("change", scheduleHeight, true);
  document.addEventListener("transitionend", scheduleHeight, true);
  document.addEventListener("animationend", scheduleHeight, true);
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(scheduleHeight);
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);
  }
  if ("MutationObserver" in window) {
    new MutationObserver(scheduleHeight).observe(document.documentElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  const installTouchSortable = () => {
    let dragState = null;
    let activeTarget = null;

    const rows = () => Array.from(document.querySelectorAll(".doc-slot[data-list-key][data-idx], [data-list-key][data-idx]"));
    const setTarget = (target) => {
      if (activeTarget === target) return;
      rows().forEach((row) => row.classList.remove("touch-drop-target"));
      activeTarget = target;
      if (activeTarget) activeTarget.classList.add("touch-drop-target");
    };
    const clearTarget = () => {
      rows().forEach((row) => row.classList.remove("touch-drop-target", "touch-dragging"));
      activeTarget = null;
    };
    const currentState = () => {
      try {
        return typeof state !== "undefined" ? state : null;
      } catch {
        return null;
      }
    };
    const refresh = () => {
      try {
        if (typeof refreshAll === "function") refreshAll();
      } catch {}
    };
    const rowAtPoint = (x, y, listKey) => {
      const element = document.elementFromPoint(x, y);
      const row = element && element.closest ? element.closest(".doc-slot[data-list-key][data-idx], [data-list-key][data-idx]") : null;
      return row && row.dataset.listKey === listKey ? row : null;
    };

    document.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;

      const row = event.target && event.target.closest ? event.target.closest(".doc-slot[data-list-key][data-idx], [data-list-key][data-idx]") : null;
      if (!row || row.getAttribute("draggable") === "false") return;

      const sourceState = currentState();
      const listKey = row.dataset.listKey;
      const index = Number(row.dataset.idx);
      if (!sourceState || !listKey || !Array.isArray(sourceState[listKey]) || !Number.isFinite(index)) return;

      dragState = { pointerId: event.pointerId, listKey, index, source: row };
      row.classList.add("touch-dragging");
      try {
        row.setPointerCapture(event.pointerId);
      } catch {}
      event.preventDefault();
    }, { passive: false });

    document.addEventListener("pointermove", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      setTarget(rowAtPoint(event.clientX, event.clientY, dragState.listKey));
      event.preventDefault();
    }, { passive: false });

    const finishDrag = (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;

      const sourceState = currentState();
      const target = activeTarget || rowAtPoint(event.clientX, event.clientY, dragState.listKey);
      const toIndex = target ? Number(target.dataset.idx) : NaN;
      let handledByNativeDrag = false;

      if (dragState.source && target) {
        try {
          const dataTransfer = new DataTransfer();
          dragState.source.dispatchEvent(new DragEvent("dragstart", {
            bubbles: true,
            cancelable: true,
            dataTransfer,
          }));
          target.dispatchEvent(new DragEvent("dragover", {
            bubbles: true,
            cancelable: true,
            dataTransfer,
            clientX: event.clientX,
            clientY: event.clientY,
          }));
          handledByNativeDrag = !target.dispatchEvent(new DragEvent("drop", {
            bubbles: true,
            cancelable: true,
            dataTransfer,
            clientX: event.clientX,
            clientY: event.clientY,
          }));
        } catch {}
      }

      if (
        !handledByNativeDrag &&
        sourceState &&
        Array.isArray(sourceState[dragState.listKey]) &&
        Number.isFinite(toIndex) &&
        toIndex !== dragState.index
      ) {
        const list = sourceState[dragState.listKey];
        const [moved] = list.splice(dragState.index, 1);
        list.splice(toIndex, 0, moved);
        refresh();
      }

      dragState = null;
      clearTarget();
      scheduleHeight();
      event.preventDefault();
    };

    document.addEventListener("pointerup", finishDrag, { passive: false });
    document.addEventListener("pointercancel", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      dragState = null;
      clearTarget();
    }, { passive: false });
  };

  installTouchSortable();
  scheduleHeight();
  setTimeout(scheduleHeight, 1200);
})();
</script>
</body>
</html>`;
}

function mountHtmlBlock(block: HTMLElement) {
  if (block.dataset.htmlBlockMounted === "true") return;
  block.dataset.htmlBlockMounted = "true";

  const encoded = block.dataset.htmlBlock || "";
  if (!encoded) return;

  block.innerHTML = skeletonMarkup();
  block.classList.add("is-loading");

  runWhenIdle(() => {
    let html = "";
    try {
      html = decodeBlockPayload(encoded);
    } catch {
      block.innerHTML = '<div class="html-block-error">HTML block could not be loaded.</div>';
      block.classList.remove("is-loading");
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "html-block-frame";
    iframe.title = block.getAttribute("aria-label") || block.getAttribute("title") || "Html Block";
    iframe.loading = "lazy";
    iframe.scrolling = "auto";
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.srcdoc = iframeDocument(html);

    block.replaceChildren(iframe);
    block.classList.remove("is-loading");
    block.classList.add("is-ready");
  });
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>(".custom-html-block[data-html-block]").forEach(mountHtmlBlock);

    root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      if (!anchor.getAttribute("href")?.startsWith("#")) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    });

    const handleHtmlBlockMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== "seb-html-block-height") return;

      const iframes = root.querySelectorAll<HTMLIFrameElement>(".html-block-frame");
      iframes.forEach((iframe) => {
        if (iframe.contentWindow === event.source) {
          const nextHeight = Math.min(Math.max(Number(event.data.height) || 220, 220), 1800);
          iframe.style.height = `${nextHeight}px`;
        }
      });
    };

    const handleCitationClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Popover external links take priority — open URL in new tab
      const popoverLink = target.closest<HTMLElement>(".citation-popover-link");
      if (popoverLink) {
        const href = popoverLink.dataset.href;
        if (href) {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.open(href, "_blank", "noopener,noreferrer");
        }
        return;
      }

      const link = target.closest<HTMLAnchorElement>('a.citation-ref[href^="#"]');
      if (!link) return;

      const sourceId = link.getAttribute("href")?.slice(1);
      if (!sourceId) return;

      const source = document.getElementById(decodeURIComponent(sourceId));
      if (!source) return;

      event.preventDefault();
      source.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${sourceId}`);
    };

    window.addEventListener("message", handleHtmlBlockMessage);
    root.addEventListener("click", handleCitationClick);

    return () => {
      window.removeEventListener("message", handleHtmlBlockMessage);
      root.removeEventListener("click", handleCitationClick);
    };
  }, [html]);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
