import { useMemo } from 'react';

import type { User } from '@prisma/client';

import UserCircle from '~/components/user/UserCircle';

const UserPanel = ({ users }: { users: User[] }) => {
  const userList = useMemo(() => {
    if (users.length === 0) return null;

    return users.map((user) => (
      <UserCircle key={user.id} profile={user.profile} className="mx-auto h-24 w-24 shrink-0" />
    ));
  }, [users]);

  return (
    <div className="flex w-1/6 flex-col bg-gray-200">
      <div className="flex h-20 items-center justify-center bg-gray-300 text-center">
        <h2 className="text-xl font-semibold text-blue-600">My Team</h2>
      </div>
      {userList}
      <div className="bg-gray-300 p-6 text-center">
        <form action="/logout" method="post">
          <button
            type="submit"
            className="rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPanel;
