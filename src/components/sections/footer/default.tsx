import ModeToggle from "@/components/ui/theme-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";
import LaunchUI from "@/components/logos/launch-ui";
import Aydakar from "@/components/logos/aydakar";
import Link from "next/link";

export default function FooterDefault() {
  return (
    <footer className="w-full bg-background px-4">
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent className="">
            {/* <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <a href="/" className="text-sm text-muted-foreground">
                Changelog
              </a>
              <a href="/" className="text-sm text-muted-foreground">
                Documentation
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <a href="/" className="text-sm text-muted-foreground">
                About
              </a>
              <a href="/" className="text-sm text-muted-foreground">
                Careers
              </a>
              <a href="/" className="text-sm text-muted-foreground">
                Blog
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <a href="/" className="text-sm text-muted-foreground">
                Discord
              </a>
              <a href="/" className="text-sm text-muted-foreground">
                Twitter
              </a>
              <a href="/" className="text-sm text-muted-foreground">
                Github
              </a>
            </FooterColumn> */}
          </FooterContent>
          <FooterBottom>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()}
              </span>
              <Aydakar
                as="span"
                icon={false}
                className="text-sm border-separate border-l-2 border-black/20 dark:border-white/20 pl-2"
              />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/terms-of-service">Kullanım Sözleşmesi</Link>
              <Link href="/privacy-policy">Gizlilik Politikası</Link>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
