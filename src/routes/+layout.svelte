<script lang="ts">
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	
	<!-- OGP Meta Tags -->
	<meta property="og:title" content="Domain List - 所有ドメインの署名・検証システム" />
	<meta property="og:description" content="所有ドメインの署名・検証を行うシステムです。DNSレコードによる認証でドメインの所有権を確認できます。" />
	<meta property="og:image" content={data.ogpImageUrl} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Domain List - 所有ドメインの署名・検証システム" />
	<meta name="twitter:description" content="所有ドメインの署名・検証を行うシステムです。DNSレコードによる認証でドメインの所有権を確認できます。" />
	<meta name="twitter:image" content={data.ogpImageUrl} />
</svelte:head>

<slot />