'use server'

import PocketBase from 'pocketbase';
import Link from "next/link";

type Book = {
    id: string;
    name: string;
};

export default async function Books() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const books: Book[] = await pb.collection('books').getFullList<Book>({
        sort: '-created',
    });
    console.log(books);

    return (
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    <Link href={`book/${book.name}`}>
                        {book.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
