import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function usePagination() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [currenPage, setCurrenPage] = useState(searchParams.get("page"))
	const page = searchParams.get("page")

	useEffect(() => {
		if (page === null) {
			setCurrenPage(1)
		} else {
			setSearchParams({ page: page })
			setCurrenPage(page)
		}
	}, [page])

	const setPage = (pageNum) => {
		setSearchParams({ page: pageNum })
		setCurrenPage(pageNum)
	}

	return [currenPage, setPage]
}