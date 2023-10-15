import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex mb-10 w-1/2 px-5 pt-5 justify-between">
      <Link href="/">Пользователь</Link>
      <Link href="/user-list">Список пользователей</Link>
      <Link href="/user-history">История пользователей</Link>
    </div>
  );
}
