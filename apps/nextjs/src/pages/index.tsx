import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
      <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
        {post.title}
      </h2>
      <p>{post.content}</p>
    </div>
  );
};

const Home: NextPage = () => {
  const postQuery = trpc.post.all.useQuery();
  const lightgreen = "hsl(120,100%,70%)";

  return (
    <>
      <Head>
        <title>vanvee</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#3da7ee] to-[#1821d2] text-white">
        <div className="container mx-12 flex flex-col items-center justify-center gap-8 px-4 pt-8">
          <div className="flex gap-12">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              take a spin with{" "}
              <span className="bg-gradient-to-r from-[#c1233b] to-[#4831db] bg-clip-text text-transparent">
                vanvee
              </span>
              .
            </h1>
            <AuthShowcase />
          </div>

          <div className="flex justify-center overflow-y-scroll text-2xl">
            {postQuery.data ? (
              <div className="flex flex-col gap-4">
                {postQuery.data?.map((p) => {
                  return <PostCard key={p.id} post={p} />;
                })}
              </div>
            ) : (
              <p>Loading..</p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center sm:flex-row">
            <Image
              src="/images/vanvee.webp"
              width={500}
              height={500}
              alt="vanvee logo"
            />
            <p className="flex w-[75%] text-center italic tracking-tight text-white sm:w-[25%]">
              rev up your alerts and cruise to success with vanvee&apos;s
              high-octane alerting system straight onto the fast lane.
            </p>
          </div>

          <div className="rounded-xl bg-slate-400 px-4 py-8 text-center shadow-2xl">
            <h2 className="flex items-start justify-center text-4xl font-extrabold tracking-tight">
              <span className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={lightgreen}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                  />
                </svg>
              </span>
              what is vanvee?
              <span className="ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-md mt-4 tracking-tighter md:text-2xl md:tracking-tight">
              Vanvee is an exceptional SaaS notification service that
              revolutionizes the way businesses communicate and engage with
              their audience. By integrating Vanvee into your site, you empower
              your business with an innovative, streamlined solution that helps
              you stay connected with customers, partners, and team members
              alike. This powerful platform harnesses the agility of a van,
              driving your notifications to reach their destination swiftly and
              reliably. Vanvee's intuitive interface and smart features enable
              you to customize and manage alerts with ease, ensuring that
              important updates never go unnoticed. With Vanvee at the helm of
              your communication strategy, you'll not only enhance user
              experience but also foster stronger relationships, boost team
              productivity, and ultimately, steer your business towards the fast
              lane of success.
            </p>
          </div>
        </div>
        <footer className="static bottom-0 mb-1 mt-4 font-extrabold tracking-tight">
          vanvee | 2023
        </footer>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
      {isSignedIn && (
        <div className="flex items-center justify-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "3rem",
                  height: "3rem",
                },
              },
            }}
          />
        </div>
      )}
      {!isSignedIn && (
        <button className="w-32 rounded-full bg-white text-center text-lg text-black">
          <Link href="/sign-in">Sign In</Link>
        </button>
      )}
      {!isSignedIn && (
        <button className="w-32 rounded-full bg-white text-center text-lg text-black">
          <Link href="/sign-up">Sign Up</Link>
        </button>
      )}
    </div>
  );
};
