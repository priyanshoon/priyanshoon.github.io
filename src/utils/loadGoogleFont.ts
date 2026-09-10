// async function loadGoogleFont(
//   font: string,
//   text: string,
//   weight: number
// ): Promise<ArrayBuffer> {
//   const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
//
//   const css = await (
//     await fetch(API, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
//       },
//     })
//   ).text();
//
//   const resource = css.match(
//     /src: url\((.+?)\) format\('(opentype|truetype)'\)/
//   );
//
//   if (!resource) throw new Error("Failed to download dynamic font");
//
//   const res = await fetch(resource[1]);
//
//   if (!res.ok) {
//     throw new Error("Failed to download dynamic font. Status: " + res.status);
//   }
//
//   return res.arrayBuffer();
// }
//
// async function loadGoogleFonts(
//   text: string
// ): Promise<
//   Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
// > {
//   const fontsConfig = [
//     {
//       name: "Geist Mono",
//       font: "Geist+Mono",
//       weight: 400,
//       style: "normal",
//     },
//     {
//       name: "Geist Mono",
//       font: "Geist+Mono",
//       weight: 700,
//       style: "bold",
//     },
//   ];
//
//   const fonts = await Promise.all(
//     fontsConfig.map(async ({ name, font, weight, style }) => {
//       const data = await loadGoogleFont(font, text, weight);
//       return { name, data, weight, style };
//     })
//   );
//
//   return fonts;
// }
//
// export default loadGoogleFonts;

import { readFile } from "node:fs/promises";
import path from "node:path";

async function loadLocalFont(filename: string): Promise<ArrayBuffer> {
    const file = await readFile(
        path.join(process.cwd(), "public", "fonts", filename)
    );

    return file.buffer.slice(
        file.byteOffset,
        file.byteOffset + file.byteLength
    ) as ArrayBuffer;
}

async function loadGoogleFonts() {
    const [regular, bold] = await Promise.all([
        loadLocalFont("GeistMono-Regular.ttf"),
        loadLocalFont("GeistMono-Bold.ttf"),
    ]);

    return [
        { name: "Geist Mono", data: regular, weight: 400, style: "normal" },
        { name: "Geist Mono", data: bold, weight: 700, style: "normal" },
    ];
}

export default loadGoogleFonts;

