import { expect, describe, test } from '@jest/globals'
import FluentSQLBuilder from '../src/fluentSQL'

const data = [
	{
		id: 1,
		name: 'Manuely',
		category: 'developer'
	},
	{
		id: 2,
		name: 'Felipe',
		category: 'developer'
	},
	{
		id: 3,
		name: 'Adozindo',
		category: 'manager'
	}
]

describe('Meu primeiro teste.', () => {
	test('#for should return a fluenteSQLBuilder instance', () => {
		const result = FluentSQLBuilder.for(data)
		const expected = new FluentSQLBuilder({ database: data })
		expect(result).toStrictEqual(expected)
	})

	test('#build should return the empty object instance', () => {
		const result = FluentSQLBuilder.for(data).build()
		const expected = data
		expect(result).toStrictEqual(expected)
	})

	test('#limit given a collection it should limit results', () => {
		const result = FluentSQLBuilder.for(data).limit(1).build()
		const expected = [data[0]]
		expect(result).toStrictEqual(expected)
	})

	test('#where given a collection it should filter data', () => {
		const result = FluentSQLBuilder.for(data).where({
			category: /^dev/
		}).build()
		const expected = data.filter(item => item.category.slice(0, 3) === 'dev')
		expect(result).toStrictEqual(expected)
	})

	test('#select given a collection it should return only specif fields', () => {
		const result = FluentSQLBuilder.for(data).select(['category']).build()
		const expected = data.map(({ category }) => ({ category }))
		expect(result).toStrictEqual(expected)
	})

	test('#orderBy given a collection is should order results by field', () => {
		const result = FluentSQLBuilder.for(data).orderBy('name').build()
		const expected = [
			{
				id: 3,
				name: 'Adozindo',
				category: 'manager'
			},
			{
				id: 2,
				name: 'Felipe',
				category: 'developer'
			},
			{
				id: 1,
				name: 'Manuely',
				category: 'developer'
			}
		]
		expect(result).toStrictEqual(expected)
	})

	test('pipeline', () => {
		const result = FluentSQLBuilder.for(data)
			.where({ category: 'developer' })
			.select(['id', 'name'])
			.orderBy('name')
			.limit(2)
			.build()

		const expected = [
			{
				id: 2,
				name: 'Felipe'
			},
			{
				id: 1,
				name: 'Manuely'
			}
		]
		
		expect(result).toStrictEqual(expected)
	})
})