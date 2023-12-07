"use client";
import Link from "next/link";
import { styles } from "../globals.css";
export default function RootLayout({ children }) {
  return (
    <div>
      <nav className="nav">
        <ul>
          {/* <li>
            <Link href="/dashboard">Dashboard</Link>
          </li> */}
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/profile">My Profile</Link>
          </li>
          <li>
            <button onClick={() => localStorage.clear()}>
              <Link href="/">logout</Link>
            </button>
          </li>
        </ul>
      </nav>
      <div
        style={{
          padding: "0 20px",
          minHeight: "calc(100vh - 133px)",
        }}
      >
        {children}
      </div>
      <footer>
        All rights reserved &copy; Mohamed Helmy {new Date().getFullYear()}
      </footer>
    </div>
  );
}
