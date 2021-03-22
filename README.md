<h1>Query Builder for JS Object</h1>

Um query builder fluente para realizar filtros complexos em coleções de dados.

<h2>Aplicação</h2>

```js
import data from '../database/data.json'
import FluentSQLBuilder from './fluentSQL.js'

const result = FluentSQLBuilder.for(data)
	.where({ registered: /^20(19|20)/ })
	.where({ category: /^(security|developer)$/ })
	.where({ phone: /\((852|850|810)\)/ })
	.select(['name', 'phone', 'company', 'category', 'registered'])
	.orderBy('name')
	.build()

console.table(result)

```

<h2>Sugestões para continuidade do projeto</h2>
- O suporte atualmente é somente a **arrays**. Sugiro permitir o uso do query builder a partir de qualquer tipo de coleção de dados (Set, Map, etc)
- Permitir combinação de coleções, similarmente à cláusula INNER JOIN do SQL.

<h2>Projeto base</h2>

[lives-aquecimento02-javascript-expert](https://github.com/ErickWendel/lives-aquecimento02-javascript-expert)
