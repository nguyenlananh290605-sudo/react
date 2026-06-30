import { useState, useEffect, useCallback } from "react";
import BookTable from "../components/books/book.table"
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/books/book.form";
import BookFormUncontrolled from "../components/books/book.form.uncontrolled";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0);

    // const [loadingTable, setLoadingTable] = useState(false);
    // const loadBook = useCallback(async () => {
    //     setLoadingTable(true)
    //     const res = await fetchAllBookAPI(current, pageSize);
    //     if (res.data) {
    //         setDataBooks(res.data.result)
    //         setCurrent(res.data.meta.current)
    //         setPageSize(res.data.meta.pageSize)
    //         setTotal(res.data.meta.total)
    //     }
    //     setLoadingTable(false)
    // }, [current, pageSize])

    useEffect(() => {
        loadBook()
    }, [current, pageSize]);
    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }
    return (
        <>
            <BookForm
                loadBook={loadBook}
            />
            <BookFormUncontrolled />
            <BookTable
                dataBooks={dataBooks}
                loadBook={loadBook}
                current={current}
                pageSize={pageSize}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                total={total}
            />
        </>

    )
}
export default BookPage;