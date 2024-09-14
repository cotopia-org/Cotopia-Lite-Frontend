import { UserMinimalType } from "@/types/user";

type Props = {
  user: UserMinimalType;
};

export default function Details({ user }: Props) {
  return (
    <div className='flex h-screen'>
      {/* Left Sidebar */}
      <aside className='w-64 bg-black/10 h-full overflow-y-auto'>
        Left Sidebar
      </aside>

      {/* Right Content Area */}
      <main className='flex-1 bg-gray-100 p-8 overflow-auto'>
        {/* Main content */}
        <h1 className='text-2xl font-semibold mb-4'>User, {user.username}</h1>
      </main>
    </div>
  );
}
