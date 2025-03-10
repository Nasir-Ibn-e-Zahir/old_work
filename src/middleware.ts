import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


export default clerkMiddleware(async(auth,req)=>{
   const protectedRoutes = createRouteMatcher(["/dashboard","/dashboard/(.*)"]);
//    if (protectedRoutes(req)) (await auth()).redirectToSignIn();
if (protectedRoutes(req)) {
    const { userId, redirectToSignIn } = await auth(); // Await authentication
    if (!userId) redirectToSignIn();
}});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)','/','/(api|trpc)(.*)'],
};