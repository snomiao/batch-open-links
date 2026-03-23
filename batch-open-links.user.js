// ==UserScript==
// @name               Batch Open Links
// @name:zh-CN         批量打开链接
// @name:zh-TW         批次開啟連結
// @name:es            Abrir enlaces en lote
// @name:hi            लिंक बैच में खोलें
// @name:ar            فتح الروابط دفعة واحدة
// @name:bn            লিঙ্ক ব্যাচে খুলুন
// @name:pt            Abrir links em lote
// @name:ru            Пакетное открытие ссылок
// @name:ja            リンク一括オープン
// @name:de            Links stapelweise öffnen
// @name:fr            Ouvrir les liens en lot
// @name:ko            링크 일괄 열기
// @name:tr            Bağlantıları toplu aç
// @name:vi            Mở hàng loạt liên kết
// @name:it            Apri link in blocco
// @name:th            เปิดลิงก์เป็นชุด
// @name:pl            Otwórz linki zbiorczo
// @name:nl            Links in bulk openen
// @name:uk            Пакетне відкриття посилань
// @name:id            Buka tautan secara massal
//
// @namespace          snomiao@gmail.com
// @version            2.3.0
// @author             snomiao@gmail.com
//
// @description        Press Shift+Alt+Q to batch open links in the main list on a page. Handy for exploring all search engine results or detail pages in a list page.
// @description:zh-CN  按 Shift+Alt+Q 批量打开页面主列表中的链接。适用于快速浏览搜索引擎结果或列表页中的详情页。
// @description:zh-TW  按 Shift+Alt+Q 批次開啟頁面主列表中的連結。適用於快速瀏覽搜尋引擎結果或列表頁中的詳情頁。
// @description:es     Presiona Shift+Alt+Q para abrir en lote los enlaces de la lista principal de una página. Útil para explorar resultados de búsqueda o páginas de detalle.
// @description:hi     पेज की मुख्य सूची के लिंक बैच में खोलने के लिए Shift+Alt+Q दबाएँ। खोज इंजन परिणामों या सूची पृष्ठों को तेज़ी से देखने के लिए उपयोगी।
// @description:ar     اضغط Shift+Alt+Q لفتح روابط القائمة الرئيسية دفعة واحدة. مفيد لاستعراض نتائج محركات البحث أو صفحات التفاصيل.
// @description:bn     পৃষ্ঠার প্রধান তালিকার লিঙ্কগুলো ব্যাচে খুলতে Shift+Alt+Q চাপুন। সার্চ ইঞ্জিনের ফলাফল বা তালিকা পৃষ্ঠা দ্রুত দেখার জন্য কার্যকর।
// @description:pt     Pressione Shift+Alt+Q para abrir em lote os links da lista principal de uma página. Útil para explorar resultados de busca ou páginas de detalhes.
// @description:ru     Нажмите Shift+Alt+Q, чтобы пакетно открыть ссылки из основного списка на странице. Удобно для просмотра результатов поиска или страниц с деталями.
// @description:ja     Shift+Alt+Qでページのメインリストのリンクを一括で開きます。検索結果や一覧ページの詳細を素早く閲覧するのに便利です。
// @description:de     Drücken Sie Shift+Alt+Q, um Links der Hauptliste einer Seite gebündelt zu öffnen. Praktisch zum Durchsuchen von Suchergebnissen oder Detailseiten.
// @description:fr     Appuyez sur Shift+Alt+Q pour ouvrir en lot les liens de la liste principale d'une page. Pratique pour explorer les résultats de recherche ou les pages de détail.
// @description:ko     Shift+Alt+Q를 눌러 페이지 메인 목록의 링크를 일괄 열기합니다. 검색 결과나 목록 페이지의 상세 페이지를 빠르게 탐색하는 데 유용합니다.
// @description:tr     Shift+Alt+Q ile sayfadaki ana listedeki bağlantıları toplu olarak açın. Arama motoru sonuçlarını veya liste sayfalarını hızlıca incelemek için kullanışlıdır.
// @description:vi     Nhấn Shift+Alt+Q để mở hàng loạt các liên kết trong danh sách chính trên trang. Tiện lợi để duyệt nhanh kết quả tìm kiếm hoặc trang chi tiết.
// @description:it     Premi Shift+Alt+Q per aprire in blocco i link della lista principale di una pagina. Utile per esplorare risultati di ricerca o pagine di dettaglio.
// @description:th     กด Shift+Alt+Q เพื่อเปิดลิงก์ในรายการหลักของหน้าเว็บพร้อมกัน สะดวกสำหรับการดูผลการค้นหาหรือหน้ารายละเอียดอย่างรวดเร็ว
// @description:pl     Naciśnij Shift+Alt+Q, aby zbiorczo otworzyć linki z głównej listy na stronie. Przydatne do przeglądania wyników wyszukiwania lub stron szczegółów.
// @description:nl     Druk op Shift+Alt+Q om links in de hoofdlijst van een pagina in bulk te openen. Handig om zoekresultaten of detailpagina's snel te verkennen.
// @description:uk     Натисніть Shift+Alt+Q, щоб пакетно відкрити посилання з основного списку на сторінці. Зручно для перегляду результатів пошуку або сторінок з деталями.
// @description:id     Tekan Shift+Alt+Q untuk membuka tautan daftar utama halaman secara massal. Berguna untuk menjelajahi hasil pencarian atau halaman detail dengan cepat.
//
// @match              http://*/*
// @match              https://*/*
// @grant              none
//
// @downloadURL        https://update.greasyfork.org/scripts/528027/Page%20Flood.user.js
// @updateURL          https://update.greasyfork.org/scripts/528027/Page%20Flood.meta.js
// @supportURL         https://github.com/snomiao/batch-open-links/issues
// ==/UserScript==

/**
 * Batch Open Links (previously known as Page Flood) - Batch open links from the dominant list on any page.
 *
 * Algorithm:
 * 1. Collect all anchor elements on the page
 * 2. Extract feature vectors (depth, area, class names, attributes) per link
 * 3. Group similar links by cosine similarity of their feature vectors
 * 4. Score groups by occupied screen area
 * 5. Present the highest-scoring group for batch opening
 *
 * Press Shift+Alt+Q to cycle through link groups and open them in new tabs.
 */

main();

/**
 * Initializes the userscript. Aborts any previous instance via a global
 * AbortController and registers the hotkey listener.
 */
function main() {
  const g = window;
  g.PageFloodController?.abort();
  const ac = (g.PageFloodController = new AbortController());
  const signal = ac.signal;
  document.addEventListener("DOMContentLoaded", () => {
    // console.debug(getArrayOfArrayOfAnchors());
  });

  hotkeys({
    "alt+shift+q": ((allLists = null) => {
      return async function openLinksInList() {
        allLists ??= getArrayOfArrayOfAnchors();
        const list = allLists.shift() || DIES(alert, "no more link lists");
        list.forEach((el, i, a) =>
          flashBorder(el, getOklch(i / a.length), 500 + (a.length - i) * 500),
        );
        await sleep(0) // next 
        return await openLinks(list);
      };
    })(),
    signal,
  });
}
/**
 * Calls a function with the given args, then throws an Error.
 * Used as a fallback expression that halts execution (e.g. `value || DIES(alert, "msg")`).
 * @param {Function} fn - Side-effect function to call before throwing (e.g. `alert`).
 * @param {...*} args - Arguments forwarded to `fn`. The first arg is used as the error message.
 * @returns {never}
 * @throws {Error}
 */
function DIES(fn, ...args) {
  fn(...args);
  throw new Error(args.at(0) ?? "Unknown Error");
}
/**
 * Registers global keydown (and optionally keyup) listeners for hotkey combos.
 * Modifier keys are normalized to alphabetical order: alt+ctrl+meta+shift.
 *
 * @param {Object<string, Function> & { signal?: AbortSignal }} m
 *   Map of hotkey strings (e.g. `"alt+shift+Q"`) to async handler functions.
 *   Append `" up"` to a key for keyup handlers. Include a `signal` property
 *   to allow aborting the listeners.
 */
function hotkeys(m) {
  window.addEventListener(
    "keydown",
    async (e) => {
      if (e.repeat) return;
      const mods = "alt+ctrl+meta+shift"
        .split("+")
        .filter((m) => e[m + "Key"]);
      const key = e.code.replace(/^Key/i, "").toLowerCase();
      const combo = [...mods, key].join("+");
      const fn = m[combo];
      fn && (e.stopPropagation(), e.preventDefault(), await fn());
    },
    { signal: m.signal },
  );
  Object.keys(m).join("\n").match(/ up$/m) &&
    window.addEventListener(
      "keyup",
      async (e) => {
        const mods = "alt+ctrl+meta+shift"
          .split("+")
          .filter((m) => e[m + "Key"]);
        const key = e.code.replace(/^Key/i, "").toLowerCase();
        const combo = [...mods, key].join("+") + " up";
        const fn = m[combo];
        fn && (e.stopPropagation(), e.preventDefault(), await fn());
      },
      { signal: m.signal },
    );
}

/**
 * Opens a list of URLs in batches of 8, with user confirmation for each batch.
 * Waits for the user to return to the current tab before opening the next batch.
 *
 * @param {string[]} links - Array of URLs to open.
 * @returns {Promise<void>}
 * @throws Alerts and throws if the user cancels a batch.
 */
async function openLinks(links) {
  const urlss = Object.values(Object.groupBy(links, (url, i) => String(Math.floor(i / 8))));
  for await (const urls of urlss) {
    const urlList = urls.join("\n");
    const confirmMsg = `confirm to open ${urls.length} pages?\n\n${urlList}`;
    if (!confirm(confirmMsg)) throw alert("cancelled by user");
    urls.toReversed().map(openDeduplicatedUrl);
    await sleep(1e3); // 1s cd
    await new Promise((r) => document.addEventListener("visibilitychange", r, { once: true })); // wait for page visible
  }
}
async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms))
}
/**
 * Opens a URL in a new tab, skipping duplicates already opened in this session.
 * Tracks opened URLs in `window.openDeduplicatedUrl_opened`.
 *
 * @param {string} url - The URL to open.
 * @returns {boolean|undefined} `false` if already opened, otherwise the result of `Set.add`.
 */
function openDeduplicatedUrl(url) {
  const opened = (window.openDeduplicatedUrl_opened ??= new Set());
  const urlWithHash = url.includes("#") ? url : url + "#";
  return opened.has(url) || (open(urlWithHash, url) && opened.add(url));
}
/**
 * Opens a URL by programmatically clicking a dynamically created anchor element.
 * This bypasses popup blockers that may block `window.open`.
 *
 * @param {string} href - The URL to navigate to.
 * @param {string} target - The link target (e.g. `"_blank"`).
 */
function open(href, target) {
  Object.assign(document.createElement("a"), { href, target }).click();
}

/**
 * Creates a simple bag-of-words model for converting text into binary feature vectors.
 * Call `fit` with training texts to build the vocabulary, then `transform` to vectorize.
 *
 * @returns {{ wordSet: Set<string>, fit: (texts: string[]) => void, transform: (text: string) => number[] }}
 */
function BagOfWordsModel() {
  const wordSet = new Set();
  return {
    wordSet,
    fit: (texts) => {
      texts.forEach((text) =>
        text
          .toLowerCase()
          .split(/\W+/)
          .forEach((word) => wordSet.add(word)),
      );
    },
    transform: (text) => {
      const words = text.toLowerCase().split(/\W+/);
      const vec = Array.from(wordSet).map((word) => (words.includes(word) ? 1 : 0));
      return vec;
    },
  };
}

/**
 * Analyzes all anchor elements on the page and groups them by visual/structural
 * similarity using a bag-of-words model on class names and attributes, combined
 * with layout features (element depth, parent bounding rect).
 *
 * Groups are ranked by a score derived from the bounding area they collectively
 * occupy, so the "main content list" typically ranks first.
 *
 * @returns {HTMLAnchorElement[][]} Array of link groups, sorted by descending score.
 */
function getArrayOfArrayOfAnchors() {
  // groupBy words and then return map
  return (
    [{ sel: "a" }]
      .map((e) => ({ ...e, list: [...document.querySelectorAll(e.sel)] }))
      .map((e) => ({
        ...e,
        bow: BagOfWordsModel(),
      }))
      .map((e) => ({
        ...e,
        _: e.bow.fit(e.list.map((el) => el.className + " " + getElementAttributeNames(el))),
      }))
      .map((e) => ({
        ...e,
        vec: e.list.map((el, i) => [
          elementDepth(el),
          area(el.parentElement?.getBoundingClientRect()),
          el.parentElement?.getBoundingClientRect().width,
          el.parentElement?.getBoundingClientRect().height,
          ...e.bow.transform(el.className + " " + getElementAttributeNames(el)),
        ]),
      }))
      .map((e) => ({ ...e, nor: normalize(e.vec) }))
      .map((e) => ({ ...e, vecGrp: groupByCosineSimilarity(e.nor, 0.99) }))
      .map((e) => ({ ...e, grp: e.vecGrp.map((g) => g.map((i) => e.list[i])) }))
      .map((e) => ({
        ...e,
        rank: e.grp
          .map((g) => ({
            links: g,
            area: area(maxRect(g.map((el) => el.getBoundingClientRect()))),
            areaSum: g.map((el) => area(el.getBoundingClientRect())).reduce((a, b) => a + b, 0),
          }))
          .map((g) => ({ ...g, score: Math.log(g.area * g.areaSum) }))
          .toSorted(compareBy((g) => -g.score)),
      }))
      // .map((e) => ({
      //   ...e,
      //   _: e.rank
      //     .slice(0, 1)
      //     .map((grp, i, a) =>
      //       grp.links.map((el) =>
      //         flashBorder(
      //           el,
      //           getOklch(i / a.length),
      //           500 + (a.length - i) * 500
      //         )
      //       )
      //     ),
      // }))
      // debug
      // .map((e) => (console.log(e), { ...e }))
      .map((e) => e.rank.map((e) => e.links)) // a
      .at(0)
  );
}

/**
 * Generates an OKLCH color string from a normalized parameter `t` in [0, 1].
 * Used to assign visually distinct colors when highlighting link groups.
 *
 * @param {number} t - Normalized value in [0, 1] controlling hue, chroma, and lightness.
 * @returns {string} CSS `oklch()` color value.
 */
function getOklch(t) {
  const l = 0.9 - 0.5 * t;
  const c = 0.2 + 0.3 * t;
  const h = 360 * t;
  return `oklch(${l} ${c} ${h})`;
}
/**
 * Temporarily highlights an element with a colored outline, then restores the original.
 *
 * @param {HTMLElement} el - The element to highlight.
 * @param {string} color - CSS color value for the outline.
 * @param {number} [duration=1000] - How long the highlight lasts in milliseconds.
 * @returns {number} The timeout ID (can be used with `clearTimeout`).
 */
function flashBorder(el, color, duration = 1000) {
  const orig = el.style.outline;
  el.style.outline = `3px solid ${color}`;
  return setTimeout(() => (el.style.outline = orig), duration);
}
/**
 * Returns a comparator function that sorts by the numeric value of `fn(item)`.
 * Use with `Array.prototype.toSorted`. Negate `fn` for descending order.
 *
 * @param {(item: *) => number} fn - Key extraction function.
 * @returns {(a: *, b: *) => number} Comparator function.
 */
function compareBy(fn) {
  return (a, b) => fn(a) - fn(b);
}
/**
 * Computes the bounding rectangle that encloses all given rectangles.
 *
 * @param {DOMRect[]} rects - Array of DOMRect-like objects.
 * @returns {{ left: number, top: number, right: number, bottom: number }}
 */
function maxRect(rects) {
  return {
    left: Math.min(...rects.map((e) => e.left)),
    top: Math.min(...rects.map((e) => e.top)),
    right: Math.max(...rects.map((e) => e.right)),
    bottom: Math.max(...rects.map((e) => e.bottom)),
  };
}
/**
 * Calculates the area of a rectangle from its edges.
 *
 * @param {{ left: number, right: number, top: number, bottom: number }} rect
 * @returns {number} The area in square pixels.
 */
function area({ left, right, top, bottom }) {
  return (right - left) * (bottom - top);
}
/**
 * Returns the nesting depth of an element in the DOM tree.
 *
 * @param {HTMLElement|null} e - The element to measure.
 * @returns {number} Depth (0 for null/document).
 */
function elementDepth(e) {
  return !e ? 0 : 1 + elementDepth(e.parentElement);
}
/**
 * Column-wise max-normalizes a 2D array of numbers so each feature is in [0, 1].
 *
 * @param {number[][]} arr - Matrix of feature vectors (rows = items, cols = features).
 * @returns {number[][]} Normalized matrix.
 */
function normalize(arr) {
  const maxs = arr.reduce(
    (a, b) => a.map((e, i) => Math.max(e, b[i])),
    Array(arr[0].length).fill(-Infinity),
  );
  return arr.map((e) => e.map((v, i) => v / maxs[i]));
}
/**
 * Computes the dot product of two numeric arrays.
 *
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
function dot(a, b) {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}
/**
 * Computes the Euclidean magnitude (L2 norm) of a vector.
 *
 * @param {number[]} a
 * @returns {number}
 */
function magnitude(a) {
  return Math.sqrt(dot(a, a));
}
/**
 * Computes the cosine similarity between two vectors.
 *
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number} Value in [-1, 1] where 1 means identical direction.
 */
function cosineSimilarity(a, b) {
  return dot(a, b) / (magnitude(a) * magnitude(b));
}
/**
 * Groups vectors by greedy single-linkage clustering using cosine similarity.
 * Each unvisited vector starts a new group and absorbs all remaining vectors
 * whose cosine similarity exceeds the threshold.
 *
 * @param {number[][]} arr - Array of feature vectors to cluster.
 * @param {number} [threshold=0.99] - Minimum cosine similarity to join a group.
 * @returns {number[][]} Array of groups, where each group is an array of original indices.
 */
function groupByCosineSimilarity(arr, threshold = 0.99) {
  const groups = [];
  const visited = new Set();
  arr.forEach((vec, i) => {
    if (visited.has(i)) return;
    const group = [i];
    visited.add(i);
    for (let j = i + 1; j < arr.length; j++) {
      if (cosineSimilarity(vec, arr[j]) > threshold) {
        group.push(j);
        visited.add(j);
      }
    }
    groups.push(group);
  });
  return groups;
}

/**
 * Returns a space-separated string of all attribute names on an element.
 * Used as a feature for the bag-of-words model to distinguish link types.
 *
 * @param {HTMLElement|null} el
 * @returns {string} Space-separated attribute names, or empty string if `el` is null.
 */
function getElementAttributeNames(el) {
  if (!el) return "";
  const attrs = Array.from(el.attributes || [])
    .map((attr) => attr.name)
    .join(" ");
  return attrs;
}
