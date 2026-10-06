# サンプルドキュメント

md-viewer の表示を手動で確認するためのサンプルです。

## リスト

### 順序なしリスト

- りんご
- みかん
- ぶどう

### 順序ありリスト

1. 準備する
2. 実行する
3. 確認する

## 表

| 項目 | 説明 | 対応 |
| --- | --- | --- |
| 見出し | `#` で表現 | ✅ |
| 表 | GFM テーブル | ✅ |
| 画像 | 絶対 URL のみ | ⚠️ |

## チェックリスト

- [x] サンプルファイルを作る
- [x] 見出し・リスト・表を入れる
- [ ] レビューしてもらう

## コードブロック

```js
function greet(name) {
  return `こんにちは、${name}さん`
}
```

```ts
type User = { name: string; age?: number }
const users: User[] = [{ name: 'Alice' }] // コメント
```

```python
def fib(n: int) -> int:
    """フィボナッチ数"""
    return n if n < 2 else fib(n - 1) + fib(n - 2)
```

```sh
# 依存を入れて起動する
npm install && npm run dev
```

```json
{ "name": "md-viewer", "private": true, "version": 1 }
```

```html
<a href="https://example.com" class="link">リンク</a>
```

```css
.link:hover { color: #0550ae; margin: 0 4px; }
```

```md
# 見出し
- **強調** と `code`
```

```yaml
name: ci
on: [pull_request]
```

```diff
- 古い行
+ 新しい行
```

言語の指定がないコードブロック:

```
const plain = 'no highlight'
```

対応していない言語のコードブロック:

```go
func main() { println("hello") }
```

## 引用

> Markdown はプレーンテキストで書ける軽量マークアップ言語です。

## リンク

- [GitHub](https://github.com/)
- 自動リンク: https://example.com

## 画像

![Markdown のロゴ](https://markdown-here.com/img/icon256.png)

## 取り消し線

~~この行は取り消し線で表示されます。~~
