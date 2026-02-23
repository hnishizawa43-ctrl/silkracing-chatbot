import { DemoHomepage } from "@/components/demo-homepage"
import Script from "next/script"

export default function Home() {
  return (
    <>
      <DemoHomepage />
      <Script src="/widget.js" strategy="lazyOnload" />
    </>
  )
}
