export default function Footer() {
    return(
        <section className="flex flex-col items-center w-full bg-background-color transition-theme border-t-2 border-slate-500">
             <p className="text-[--contrast-color] py-5 text-pretty text-center">Copyright© {new Date().getFullYear()}. All Rights Reserved.</p>
        </section>
    )
}