<script lang="ts">
	import { mockDomains, mockStats, mockTLDInfo } from '$lib/mock-data';
	import type { Domain, TLDInfo } from '$lib/types';

	let searchQuery = '';
	let filteredDomains = mockDomains;

	$: {
		if (searchQuery) {
			filteredDomains = mockDomains.filter(domain => 
				domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				domain.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
		} else {
			filteredDomains = mockDomains;
		}
	}
</script>

<div class="min-h-screen bg-gray-100">
<div class="container mx-auto p-6 space-y-8">
	<!-- ヘッダー -->
	<div class="text-center space-y-2">
		<h1 class="text-4xl font-bold">ドメイン一覧</h1>
		<p class="text-lg text-gray-600">登録済みドメインの詳細を確認できます</p>
	</div>

	<!-- 統計情報 -->
	<div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
			<div class="flex items-center justify-center space-x-2">
				<span class="text-2xl">🌐</span>
				<div>
					<div class="text-2xl font-bold">{mockStats.total}</div>
					<div class="text-sm text-gray-600">登録済み数</div>
				</div>
			</div>
		</div>
		<div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
			<div class="flex items-center justify-center space-x-2">
				<span class="text-2xl">✅</span>
				<div>
					<div class="text-2xl font-bold">{mockStats.verified}</div>
					<div class="text-sm text-gray-600">認証済み</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 検索機能 -->
	<div class="bg-white border border-gray-200 rounded-lg p-4">
		<div class="flex gap-4 items-center">
			<input 
				type="search" 
				placeholder="ドメインを検索" 
				bind:value={searchQuery}
				class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">すべてのテスター</button>
		</div>
	</div>

	<!-- ドメインリスト -->
	<div class="space-y-4">
		{#each filteredDomains as domain}
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<div class="flex justify-between items-start">
					<div class="flex-grow">
						<div class="flex items-center gap-3 mb-2">
							<h3 class="text-xl font-semibold">{domain.name}</h3>
							{#if domain.verified}
								<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✅ 認証済み</span>
							{:else}
								<span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">❌ 認証失敗</span>
							{/if}
						</div>
						<p class="text-sm text-gray-600 mb-2">{domain.description}</p>
					</div>
					<div class="text-right text-sm text-gray-500">
						<div>最終更新日:</div>
						<div>{domain.lastUpdated}</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- TLD情報セクション -->
	<div class="bg-white border border-gray-200 rounded-lg p-6">
		<h2 class="text-2xl font-bold mb-4">🌐 トップレベルドメイン（TLD）について</h2>
		<p class="mb-6 text-gray-600">
			トップルベルドメイン（TLD）は、ドメイン名の最後の部分（.com、.org等）を表します。各TLDには固有の意味や利用用途があります。ウェブサイトの運営者や開発者の象徴的な表現にもなっています。
		</p>
		
		<div class="grid gap-4">
			{#each mockTLDInfo as tld}
				<div class="bg-gray-50 p-4 rounded-lg">
					<div class="flex items-start gap-3">
						<div class="px-2 py-1 bg-blue-600 text-white font-mono text-sm rounded">{tld.extension}</div>
						<div class="flex-grow">
							<h3 class="font-semibold mb-1">{tld.type}</h3>
							<p class="text-sm text-gray-600 mb-2">{tld.description}</p>
							<p class="text-xs text-gray-500">{tld.example}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
</div>
