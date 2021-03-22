import data from '../database/data.json'
import FluentSQLBuilder from './fluentSQL.js'

const result = FluentSQLBuilder.for(data)
	.where({ registered: /^20(19|20)/ })
	.where({ category: /^(security|developer|quality assurance)$/ })
	.where({ phone: /\((852|850|810)\)/ })
	.select(['name', 'phone', 'company', 'category', 'registered'])
	.orderBy('name')
	.build()

console.table(result)