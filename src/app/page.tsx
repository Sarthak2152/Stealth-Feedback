import { signIn } from "@/auth";

export default function Home() {
  return (
    <>
      {/* <h1>{process.env.AUTH_SECRET}</h1> */}
      <form
        action={async () => {
          "use server";
          await signIn("credentials");
        }}>
        <button>Credentials</button>
      </form>
    </>
  );
}
