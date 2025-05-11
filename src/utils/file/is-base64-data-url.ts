export function isBase64DataURL(dataURL?: string) {
    if (typeof dataURL !== "string") return false;
    const base64Match = dataURL.match(/^data:[^;]+;base64,([^,]+)$/);

    if (base64Match) {
        const base64Data = base64Match[1];
        try {
            atob(base64Data);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {}
    }

    return false;
}

