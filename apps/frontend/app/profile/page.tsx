"use client";
import { Button } from "@nextui-org/react";
import { OAuthManagement } from "./components/oauth/OAuthManagement";
import { useProfileQuery } from "./hook/useProfileQuery";
import { AuthButton } from "../../common/components/button/AuthButton";

export default function ProfilePage() {
  const { profile, loading, error, refetch } = useProfileQuery();

  if (error) {
    return (
      <div>
        <p>프로필 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (loading || !profile) return <div>Loading...</div>;

  return (
    <div>
      <OAuthManagement
        oauthProfiles={profile.oauthProfiles}
        refetchOAuth={refetch}
      />
      <AuthButton fullWidth className="my-4" />
    </div>
  );
}
