export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    return <>
        <h3>search page {q}</h3>
    </>
}