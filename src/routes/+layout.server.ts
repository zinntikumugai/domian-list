import { building } from '$app/environment';

export const load = async ({ url }: { url: URL }) => {
	// ビルド時は空の文字列を返し、実行時に動的に生成
	const baseUrl = building ? '' : url.origin;
	const ogpImageUrl = `${baseUrl}/ogp.svg`;
	
	return {
		ogpImageUrl
	};
};