export const resolveImageSrc = (url?: string) => {
	if (url && url.startsWith("http")) return url;
	return "placeholder.png";
};
