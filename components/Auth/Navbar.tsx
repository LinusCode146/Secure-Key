
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import styles from "@/public/styles/Navbar.module.css";
import Link from "next/link";
import LoginBtn from "@/components/Auth/LoginBtn";
import LogoutBTN from "@/components/Auth/LogoutBtn";



export default async function Navbar () {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.container}>
            <div className={styles.logo}>
                <Link href={'/'}>SecureKey</Link>
            </div>
            <div className={styles.authLinks}>
                {!session?.user && <LoginBtn />}
                {session?.user && <LogoutBTN image={session.user?.image || ""}/>}
            </div>
        </main>
    )
}