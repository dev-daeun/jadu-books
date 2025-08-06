export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    console.log(await searchParams);
    return <>
        <h3>search page</h3>
    </>
}