export default class FluentSQLBuilder {
	#database = []
	#limit = 0
	#select = []
	#where = []
	#orderBy = ''
	
	constructor(database) {
		this.#database = database
	}

	static for(database) {
		return new FluentSQLBuilder(database)
	}

	limit(max) {
		this.#limit = max
		return this
	}
	
	select(props) {
		this.#select = props
		
		return this
	}

	where(query) {
		const [[prop, selectedValue]] = Object.entries(query)
		const filter = selectedValue instanceof RegExp ? 
			selectedValue :
			new RegExp(selectedValue)

		this.#where.push({
			prop,
			filter
		})

		return this
	}

	orderBy(field) {
		this.#orderBy = field
		return this
	}

	#performLimit(results) {
		return this.#limit && results.length === this.#limit
	}

	#performWhere(item) {
		for(const { prop, filter } of this.#where) {
			if(!filter.test(item[prop])) return false
		}

		return true
	}

	#performSelect(item) {
		const currentItem = {}

		const entries = Object.entries(item)

		for(const [key, value] of entries) {
			if(this.#select.length && !this.#select.includes(key)) continue

			currentItem[key] = value
		}

		return currentItem
	}

	#performOrderBy(results) {
		if(!this.#orderBy) return results

		return results.sort((prev, next) => String(prev[this.#orderBy]).localeCompare(String(next[this.#orderBy])))
	}

	build() {
		const results = []

		for(const item of this.#database) {
			if(!this.#performWhere(item)) continue

			const projection = this.#performSelect(item)
			
			results.push(projection)

			if(this.#performLimit(results)) break
		}

		const finalResult = this.#performOrderBy(results)

		return finalResult
	}
}