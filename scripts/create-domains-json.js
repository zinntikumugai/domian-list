#!/usr/bin/env node

/**
 * 開発用domains.json作成スクリプト
 * domains_example.jsonをベースにdomains.jsonを作成
 */

const fs = require('fs');
const path = require('path');

const examplePath = path.join(__dirname, '..', 'domains_example.json');
const targetPath = path.join(__dirname, '..', 'domains.json');

if (!fs.existsSync(targetPath)) {
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, targetPath);
    console.log('✅ domains.json created from domains_example.json');
    console.log('📝 Edit domains.json with your actual domain configuration');
  } else {
    console.error('❌ domains_example.json not found');
    process.exit(1);
  }
} else {
  console.log('ℹ️  domains.json already exists');
}