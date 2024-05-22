import SettingsCard from "@components/app/settings/card";
import { auth } from "@lib/auth";

async function Page() {
  const { user } = await auth();
  const { email, name } = user!;

  return (
    <>
      <SettingsCard
        type="input"
        title="Your Email"
        summary="This is your email address."
        hint="This value cannot be changed. It's your unique identifier."
        inputDisabled
        inputValue={email!}
      />

      <SettingsCard
        type="input"
        title="Your Name"
        summary="This is your first and last name."
        hint="You can change your name in your OAuth2 provider."
        inputDisabled
        inputValue={name}
      />

      <SettingsCard
        type="avatar"
        title="Your Avatar"
        summary="This is your avatar."
        avatarFallback={name}
        avatarSrc={undefined} // TODO: use gravatar
        hint="You can change your avatar in your OAuth2 provider."
      />
    </>
  );
}

export default Page;
