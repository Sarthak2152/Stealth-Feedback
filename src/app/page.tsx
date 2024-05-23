import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <h1>{JSON.stringify(session)}</h1>
      <h1>{JSON.stringify(user)}</h1>
    </>
  );
}
