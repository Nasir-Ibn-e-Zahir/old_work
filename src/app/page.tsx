import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
   <>
    <h1 style={{ fontFamily: 'var(--font-barlow)' }}>Welcome to the course!</h1>
    <h1>Welcome to the course!</h1>
   <Button>Click Me!</Button>
   <div className="p-10" >
   <div className="w-100 flex float-right" >
    <UserButton/>
   <ThemeToggle/>
   </div>
   </div>
   </>
  );
}
