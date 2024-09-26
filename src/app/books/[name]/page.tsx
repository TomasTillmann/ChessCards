'use server'

import PocketBase from 'pocketbase';
import Link from "next/link";
import {Puzzle} from "@/app/types/Puzzle";

export default async function Book({ params }: { params: { name: string } }) {
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
                    <Link href={`${name}/${puzzle.id}`}>
                        {puzzle.fen}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
