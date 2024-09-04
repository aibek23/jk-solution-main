'use client'

import styles from '../styles/profile/Profile.module.scss'
import Layout from "@/components/layout/Layout";
import ApProfile from "@/components/apProfile/ApProfile";
import {useSession} from "next-auth/react";

const Profile = () => {
    const session = useSession();

  return (
      <Layout Header='home'>
      <div className={styles.wrapperProfile}>
          {session?.data?.user?.image &&
              <img className={styles.imgProfile} src={session?.data?.user?.image} alt="image"/>
          }
          <h1 className={styles.nameProfile}>{session?.data?.user?.name}</h1>
          <ApProfile/>
      </div>
      </Layout>
  )
}

export default Profile