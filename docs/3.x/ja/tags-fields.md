# タグフィールド

タグフィールドでは、[タグ](tags.md)を他のエレメントに関連付けることができます。

## 設定

タグフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのタググループからタグを関連付けられるか。
- **選択ラベル** – タグの検索と入力を行うフィールドのラベルに使用されます

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。（「高度」のトグルボタンで表示されます）

- **特定のサイトから タグ を関連付けますか?** – 特定のサイトのタグとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたタグは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたタグの独自のセットを取得するかどうか。

## フィールド

タグフィールドには、現在関連付けられているすべてのタグのリストと、新しいタグを追加するための入力欄があります。

テキスト入力欄に入力すると、タグフィールドはそのタググループに属する既存のタグを（ソースの設定ごとに）検索し、入力欄の下のメニューにタグのサジェストを表示します。完全に一致するものが見つからない場合、メニューの最初のオプションから入力した値を名前にもつ新しいタグを作成できます。

::: tip
デフォルトでは、名前があまりにも似ている複数のタグを作成できません。コンフィグ設定の <config3:allowSimilarTags> を有効にすると、その振る舞いを変更することができます。
:::

### インラインのタグ編集

関連付けられたタグをダブルクリックすると、タグのタイトルやカスタムフィールドを編集できる HUD を表示します。

## テンプレート記法

### タグフィールドによるエレメントの照会

タグフィールドを持つ[エレメントを照会](dev/element-queries/README.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、タグフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値              | 取得するエレメント             |
| -------------- | --------------------- |
| `':empty:'`    | 関連付けられたタグを持たない。       |
| `':notempty:'` | 少なくとも1つの関連付けられたタグを持つ。 |

```twig
{# Fetch entries with a related tag #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### タグフィールドデータの操作

テンプレート内でタグフィールドのエレメントを取得する場合、タグフィールドのハンドルを利用して、関連付けられたタグにアクセスできます。

```twig
{% set query = entry.myFieldHandle %}
```

これは、所定のフィールドで関連付けられたすべてのタグを出力するよう準備された[タグクエリ](dev/element-queries/tag-queries.md)を提供します。

関連付けられたすべてのタグをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

```twig
{% set relatedTags = entry.myFieldHandle.all() %}
{% if relatedTags|length %}
    <ul>
        {% for rel in relatedTags %}
            <li><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```

関連付けられた最初のタグだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></p>
{% endif %}
```

（取得する必要はなく）いずれかの関連付けられたタグがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related tags!</p>
{% endif %}
```

タグクエリで[パラメータ](dev/element-queries/tag-queries.md#parameters)をセットすることもできます。

```twig
{% set relatedTags = clone(entry.myFieldHandle)
    .group('blogEntryTags')
    .all() %}
```

## 関連項目

* [タグクエリ](dev/element-queries/tag-queries.md)
* <craft3:craft\elements\Tag>
* [リレーション](relations.md)
