'use server'

import Link from "next/link";

type Book = {
    id: string;
    name: string;
};

export default async function Books() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/books/records');
    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }

    const books: Book[] = (await res.json()).items;

    return (
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    <Link href={`books/${book.name}`}>
                        {book.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
