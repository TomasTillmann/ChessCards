'use server'

import PocketBase from 'pocketbase';
import Link from "next/link";

type Params = {
    name: string;
};

type Puzzle = {
    id: string;
    fen: string;
};

// export default function Page({ params }: { params: { name: string } }) {
//     return <div>My Post: {params.name}</div>
// }

export default async function Book({ params }: { params: { name: string } }) {
    console.log("HI");
    const { name } = params;
    const pb = new PocketBase('http://127.0.0.1:8090');

    const puzzles: Puzzle[] = await pb.collection('puzzles').getFullList<Puzzle>({
        filter: `book="${name}"`,
        sort: '-created',
    });

    return (
        <ul>
            {puzzles.map((puzzle) => (
                <li key={puzzle.id}>
                    <Link href="">
                        {puzzle.fen}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
