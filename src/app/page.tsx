import { getUser } from "@/lib/getUser";

export default async function HomePage() {
  const user = await getUser();

  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
    </>
  );
}
