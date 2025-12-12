import { redirect } from "next/navigation";

export async function GET(
    _request: Request,
    { params }: { params: { username: string }}
) {
    const { username } = await params;
    const dubLink = `https://br.jamble.com/${username}`
    return redirect(dubLink);
}