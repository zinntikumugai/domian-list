<script lang="ts">
	import { mockDomains, mockStats, mockTLDInfo } from '$lib/mock-data';
	import type { Domain, TLDInfo } from '$lib/types';

	let searchQuery = '';
	let statusFilter = 'all'; // 'all', 'verified', 'failed'
	let filteredDomains = mockDomains;

	$: {
		let filtered = mockDomains;
		
		// 検索フィルター
		if (searchQuery) {
			filtered = filtered.filter(domain => 
				domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				domain.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		
		// ステータスフィルター
		if (statusFilter === 'verified') {
			filtered = filtered.filter(domain => domain.verified);
		} else if (statusFilter === 'failed') {
			filtered = filtered.filter(domain => !domain.verified);
		}
		
		filteredDomains = filtered;
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
			<select 
				bind:value={statusFilter}
				class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
			>
				<option value="all">すべてのステータス</option>
				<option value="verified">認証済み</option>
				<option value="failed">認証失敗</option>
			</select>
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
								<a href="https://{domain.name}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
									<span class="text-lg">🌐</span>
								</a>
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
						<div class="px-2 py-1 bg-blue-100 text-blue-800 font-mono text-sm rounded">{tld.extension}</div>
						<div class="flex-grow">
							<h3 class="font-semibold mb-1">{tld.type}</h3>
							<p class="text-sm text-gray-600">{tld.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- フッター -->
	<footer class="bg-white border-t border-gray-200 mt-12">
		<div class="container mx-auto px-6 py-8">
			<div class="flex flex-col sm:flex-row justify-between items-center">
				<div class="text-sm text-gray-600 mb-4 sm:mb-0">
					© 2025 Domain Manager. All rights reserved.
				</div>
				<div class="flex space-x-4">
					<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600 transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
</div>
