import type { LoaderFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { requireUserId } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  if (userId) {
    return redirect('/home');
  }

  return redirect('/login');
};
