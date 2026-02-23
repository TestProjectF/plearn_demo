export default async function ChaptersPage() {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/chapters`,
        { cache: "no-store" }
    );

    const chapters = await res.json();

    return (
        <div className="p-10">
            <h1 className="text-xl font-bold mb-6">
                Chapters
            </h1>

            <div className="space-y-4">
                {chapters.map((chapter: any) => (
                    <div
                        key={chapter.id}
                        className="border p-4 rounded"
                    >
                        <h2 className="font-semibold">
                            {chapter.title}
                        </h2>
                        <p className="text-sm mt-2">
                            {chapter.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}