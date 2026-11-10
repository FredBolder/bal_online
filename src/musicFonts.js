import { globalVars } from "./glob";

export async function loadMusicFonts() {
    if (globalVars.bravuraLoaded) return;

    if (!globalVars.bravuraLoading) {
        globalVars.bravuraLoading = (async () => {
            const font = new FontFace(
                "Bravura",
                'url("/Fonts/bravura-latin-400-normal.ttf")'
            );

            await font.load();
            document.fonts.add(font);
            globalVars.bravuraLoaded = true;
        })();
    }

    await globalVars.bravuraLoading;
}
