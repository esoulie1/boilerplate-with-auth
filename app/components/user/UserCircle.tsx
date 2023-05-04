import type { Profile } from '@prisma/client';

interface Props {
  profile: Profile;
  className?: string;
  onClick?: (...args: any) => void;
}

const UserCircle = ({ profile, onClick, className }: Props) => (
  <div
    className={`${className} flex cursor-pointer items-center justify-center rounded-full bg-gray-400`}
    onClick={onClick}
  >
    <h2>
      {profile.firstName.charAt(0).toUpperCase()}
      {profile.lastName.charAt(0).toUpperCase()}
    </h2>
  </div>
);

export default UserCircle;
