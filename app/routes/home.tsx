import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Layout from '~/components/Layout';
import UserPanel from '~/components/user/UserPanel';
import { requireUserId } from '~/utils/auth.server';
import { getOtherUsers } from '~/utils/user.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);

  return json({ users });
};

const Home = () => {
  const { users } = useLoaderData();

  return (
    <Layout>
      <div className="flex h-full">
        <UserPanel users={users} />
      </div>
    </Layout>
  );
};

export default Home;
