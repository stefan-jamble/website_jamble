import { redirect } from "next/navigation";

export function GET(
    _request: Request,
    { params }: { params: { username: string }}
) {
    const { username } = params;
    const dubLink = `https://br.jamble.com/${username}`
    return redirect(dubLink);
}